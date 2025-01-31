// hooks/useFirebase.ts
import { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/api/firebase";

export type Thread = {
  id: string;
  text: string;
  niceCount: number;
  postTime: string;
};

// データ取得のカスタムフック
export const useThreads = () => {
  const [threads, setThreads] = useState<Thread[]>([]); // 型を指定

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

export const addThread = async (text: string) => {
  try {
    const newThread: Omit<Thread, "id"> = {
      text,
      niceCount: 0,
      postTime: new Date().toISOString(),
    };
    await addDoc(collection(db, "threads"), newThread);
    console.log("Thread successfully added!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
