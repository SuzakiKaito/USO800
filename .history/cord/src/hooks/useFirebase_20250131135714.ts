// hooks/useFirebase.ts
import { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "@/api/firebase";

export type Thread = {
  id?: string;
  text: string;
  niceCount: number;
  postTime: string;
};

// スレッド一覧を取得するカスタムフック
export const useThreads = () => {
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "threads"), (snapshot) => {
      const threadsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Thread[];
      console.log("Fetched threads:", threadsData);
      setThreads(threadsData);
    });

    return () => unsubscribe();
  }, []);

  return threads;
};

// 新しいスレッドを追加する関数
export const addThread = async (text: string) => {
  try {
    if (!text.trim()) {
      throw new Error("スレッドの内容を入力してください。");
    }

    const newThread: Omit<Thread, "id"> = {
      text,
      niceCount: 0,
      postTime: Timestamp.now().toDate().toISOString(),
    };

    const docRef = await addDoc(collection(db, "threads"), newThread);
    console.log("Thread successfully added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding thread:", error);
    throw error;
  }
};
