import { useState, useEffect } from "react";
import { db } from "@/firebase"; // Firebase instance
import { collection, addDoc, onSnapshot, serverTimestamp, orderBy, query } from "firebase/firestore";
import styles from "@/styles/company/index.module.css";

export default function Main() {
  const [threads, setThreads] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newThreadText, setNewThreadText] = useState("");

  useEffect(() => {
    // Firestore リアルタイム取得
    const q = query(collection(db, "threads"), orderBy("postTime", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedThreads = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setThreads(fetchedThreads);
    });

    return () => unsubscribe(); // コンポーネントのアンマウント時に購読を解除
  }, []);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setNewThreadText("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newThreadText.trim() === "") {
      alert("スレッドの内容を入力してください！");
      return;
    }

    try {
      await addDoc(collection(db, "threads"), {
        text: newThreadText,
        niceCount: 0,
        postTime: serverTimestamp(),
      });
      setNewThreadText("");
      toggleModal();
    } catch (error) {
      console.error("Failed to add thread:", error);
      alert("スレッドを投稿できませんでした。再度お試しください。");
    }
  };

  // 相対時間を計算する関数
  const getRelativeTime = (postTime: any): string => {
    if (!postTime) return "不明";

    const postDate = postTime.toDate ? postTime.toDate() : new Date(postTime);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds}秒前`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}分前`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)}時間前`;
    } else {
      return `${Math.floor(diffInSeconds / 86400)}日前`;
    }
  };

  return (
    <div className={styles.boxContent}>
      <div className={styles.mainContent}>
        <h2>企業スレッド</h2>
        <div className={styles.threadsSwitch}>
          <a href="/mainScreen"><h3>←嘘スレッド</h3></a>
        </div>
        <div className={styles.threadContent}>
          {threads.map((thread) => (
            <div className={styles.threads} key={thread.id}>
              <div className={styles.threadsText}>
                <p>{thread.text}</p>
              </div>
              <div className={styles.niceContent}>
                <figure>
                  <img src="/images/niceIcon.svg" alt="いいねアイコン" />
                </figure>
                <p>{thread.niceCount}</p>
              </div>
              <p className={styles.postTime}>{getRelativeTime(thread.postTime)}</p>
            </div>
          ))}
        </div>
        <button onClick={toggleModal}>新規スレッドを作成</button>
      </div>

      {isModalVisible && (
        <div className={styles.modal}>
          <form onSubmit={handleSubmit}>
            <textarea
              value={newThreadText}
              onChange={(e) => setNewThreadText(e.target.value)}
              placeholder="スレッド内容を入力..."
            />
            <button type="submit">投稿</button>
            <button type="button" onClick={toggleModal}>キャンセル</button>
          </form>
        </div>
      )}
    </div>
  );
}
