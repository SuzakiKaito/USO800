import { useState } from "react";
import { useThreads, addThread } from "@/hooks/useFirebase"; // Firebase hooks
import styles from "@/styles/company/index.module.css";

export default function Main() {
  const threads = useThreads(); // Fetch threads from Firebase
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newThreadText, setNewThreadText] = useState("");

  // Toggle modal visibility and reset input
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setNewThreadText("");
  };

  // Handle form submission to add a new thread
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newThreadText.trim() === "") {
      alert("スレッドの内容を入力してください！");
      return;
    }

    try {
      await addThread(newThreadText); // Add new thread to Firebase
      setNewThreadText("");
      toggleModal(); // Close modal after submission
    } catch (error) {
      console.error("Failed to add thread:", error);
      alert("スレッドを投稿できませんでした。再度お試しください。");
    }
  };

  // Calculate relative time since the thread was posted
  const getRelativeTime = (postTime: string): string => {
    const postDate = new Date(postTime);
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

  // Toggle expanded state for sorting options
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleSortContent = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.boxContent}>
      <div className={styles.mainContent}>
        <h2>企業スレッド</h2>
        <div className={styles.threadsSwitch}>
          <a href="/mainScreen">
            <h3>←嘘スレッド</h3>
          </a>
        </div>
        <div className={styles.threadContent}>
          {/* Map through threads fetched from Firebase */}
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
              {/* Display relative time */}
              <p className={styles.postTime}>{getRelativeTime(thread.postTime)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer section */}
      <div className={styles.footerContent}>
        <div className={styles.features}>
          <div className={styles.usoMuseum}>
            <figure>
              <a href="/museum">
                <img src="/images/museumIcon.svg" alt="嘘博物館アイコン" />
              </a>
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

        {/* Create thread section */}
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
            {isExpanded && (
              <div className={`${styles.sortBox} ${styles.sortHidden}`}>
                <figure>
                  <img src="/images/sortIcon.png" alt="並び替えアイコン" />
                </figure>
                <h4>いいね順</h4>
              </div>
            )}
          </div>
          <button className={styles.createButton} onClick={toggleModal}>
            嘘スレッドをたてる
          </button>
          <div className={styles.accountContent}>
            <div className={styles.accountFace}>
              <figure>
                <img src="/images/accountIcon.png" alt="アカウントアイコン" />
              </figure>
            </div>
            <p>マイアカウント</p>
            <div className={styles.accountName}>
              <h4>細田カイト</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for creating a new thread */}
      {isModalVisible && (
        <>
          <div className={styles.bgContent} onClick={toggleModal}></div>
          <div className={styles.modalContent}>
            <h3 className={styles.modalText}>嘘スレッドを書き込もう</h3>
            <form className={styles.modalForm} onSubmit={handleSubmit}>
              <input
                type="text"
                name="thread"
                maxLength={20}
                value={newThreadText}
                onChange={(e) => setNewThreadText(e.target.value)}
                className={styles.modalInput}
                placeholder="スレッドの内容を入力"
              />
              <div className={styles.modalButtons}>
                <button
                  className={styles.deleteButton}
                  type="button"
                  onClick={toggleModal}
                >
                  キャンセル
                </button>
                <button className={styles.postButton} type="submit">
                  投稿する
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}