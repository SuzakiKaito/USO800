import { useState, useEffect } from "react";
import { useThreads, addThread } from "@/hooks/useFirebase"; // Firebase hooks
import styles from "@/styles/company/index.module.css";

export default function Main() {
  const threads = useThreads(); // Firebase hook to get threads
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newThreadText, setNewThreadText] = useState("");
  const [sortedThreads, setSortedThreads] = useState([]);

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
      await addThread(newThreadText); // Add thread to Firebase
      setNewThreadText("");
      toggleModal();
    } catch (error) {
      console.error("Failed to add thread:", error);
      alert("スレッドを投稿できませんでした。再度お試しください。");
    }
  };

  const getRelativeTime = (postTime: string): string => {
    const postDate = new Date(postTime);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}秒前`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}分前`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}時間前`;
    return `${Math.floor(diffInSeconds / 86400)}日前`;
  };

  useEffect(() => {
    // Sort threads by postTime whenever threads are updated
    const sorted = [...threads].sort((a, b) => new Date(b.postTime) - new Date(a.postTime));
    setSortedThreads(sorted);
  }, [threads]);

  return (
    <div className={styles.boxContent}>
      <div className={styles.mainContent}>
        <h2>企業スレッド</h2>
        <div className={styles.threadsSwitch}>
          <a href="/mainScreen"><h3>←嘘スレッド</h3></a>
        </div>
        <div className={styles.threadContent}>
          {sortedThreads.map((thread) => (
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
      </div>
      <div className={styles.footerContent}>
        <div className={styles.features}>
          <div className={styles.usoMuseum}>
            <figure>
              <a href="/museum"><img src="/images/museumIcon.svg" alt="嘘博物館アイコン" /></a>
            </figure>
          </div>
          <div className={styles.limitedFeatures}>
            <p className={styles.featuresText}>土日限定機能</p>
            <div className={styles.usoRank}>
              <figure>
                <img src="/images/rankIcon.png" alt="嘘ランキングアイコン" />
              </figure>
            </div>
            <div className={styles.usoStory}>
              <figure>
                <img src="/images/storyIcon.png" alt="嘘ストーリーアイコン" />
              </figure>
            </div>
          </div>
        </div>
        <div className={styles.createContent}>
          <div
            className={`${styles.sortContent} ${isExpanded ? styles.expanded : ""}`}
            onClick={toggleSortContent}
          >
            <div className={styles.sortBox}>
              <figure>
                <img src="/images/sortIcon.png" alt="並び替えアイコン" />
              </figure>
              <h4>最新順</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
