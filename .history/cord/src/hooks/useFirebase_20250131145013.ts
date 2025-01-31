import { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, Timestamp, updateDoc, doc } from "firebase/firestore";
import { db } from "@/api/firebase";
import { Thread } from "@/types/data";

// スレッド一覧を取得するカスタムフック
export const useThreads = () => {
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "threads"), (snapshot) => {
      const threadsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Thread, "id">),
      }));
      console.log("Fetched threads:", threadsData);
      setThreads(threadsData);
    });

    return () => unsubscribe();
  }, []);

  return threads;
};

// 新しいスレッドを追加する関数
export const addThread = async (text: string, category: "company" | "private") => {
  try {
    if (!text.trim()) {
      throw new Error("スレッドの内容を入力してください。");
    }

    const newThread: Omit<Thread, "id"> = {
      category: category,  // Use dynamic category from the argument
      text,
      niceCount: 0,
      isLiked: false,
      postTime: Timestamp.now().toDate().toISOString(),
    };

    // Create a new document in the 'threads' collection with category as a subcollection
    const docRef = await addDoc(collection(db, "threads", category, "posts"), newThread);
    console.log(`Thread successfully added to ${category}/posts with ID:`, docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding thread:", error);
    throw error;
  }
};


// スレッドの「いいね」状態を更新する関数
export const toggleLikeThread = async (thread: Thread) => {
  try {
    const threadRef = doc(db, "threads", thread.id);
    const updatedThread = {
      isLiked: !thread.isLiked,
      niceCount: thread.isLiked ? thread.niceCount - 1 : thread.niceCount + 1,
    };
    await updateDoc(threadRef, updatedThread);
  } catch (error) {
    console.error("Error updating thread like status:", error);
    throw error;
  }
};
