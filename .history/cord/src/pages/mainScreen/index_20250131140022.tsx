import { useState } from "react";
import { useThreads, addThread } from "@/hooks/useFirebase"; // Firebase hooks
import styles from "@/styles/mainScreen/index.module.css";

export default function Main() {
  const firebaseThreads = useThreads();
  const [threads, setThreads] = useState(firebaseThreads);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newThreadText, setNewThreadText] = useState("");

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
      await addThread(newThreadText);
      setNewThreadText("");
      toggleModal();
    } catch (error) {
      console.error("Failed to add thread:", error);
      alert("スレッドを投稿できませんでした。再度お試しください。");
    }
  };

  const sortThreadsByNiceCount = () => {
    setThreads([...threads].sort((a, b) => b.niceCount - a.niceCount));
  };

  // 相対時間を計算する関数
  const getRelativeTime = (postTime: string): string => {
    const postDate = new Date(postTime);
    if (isNaN(postDate.getTime())) return "不明";
    
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}秒前`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}分前`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}時間前`;
    return `${Math.floor(diffInSeconds / 86400)}日前`;
  };

  // いいねボタンの処理
  const handleLikeClick = (id: number) => {
    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === id
          ? { ...thread, isLiked: !thread.isLiked, niceCount: thread.isLiked ? thread.niceCount - 1 : thread.niceCount + 1 }
          : thread
      )
    );
  };

  return (
    <div className={styles.boxContent}>
      <div className={styles.mainContent}>
        <h2>嘘スレッド</h2>
        <div className={styles.threadsSwitch}>
          <a href="/company"><h3>企業スレッド→</h3></a>
        </div>
        <button onClick={sortThreadsByNiceCount}>いいね数で並び替え</button>
        <div className={styles.threadContent}>
          {threads.map((thread) => (
            <div className={styles.threads} key={thread.id}>
              <div className={styles.threadsText}>
                <p>{thread.text}</p>
              </div>
              <div className={styles.niceContent}>
                <figure onClick={() => handleLikeClick(thread.id)} className={`${styles.niceIcon} ${thread.isLiked ? styles.liked : ""}`}>
                  <img src="/images/niceIcon.svg" alt="いいねアイコン" />
                </figure>
                <p>{thread.niceCount}</p>
              </div>
              <p className={styles.postTime}>{getRelativeTime(thread.postTime)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
