import { useState } from "react";
import { useThreads, addThread, toggleLikeThread } from "@/hooks/useFirebase"; // Firestore hooks
import styles from "@/styles/company/index.module.css";

export default function Main() {
  const threads = useThreads(); // Firestoreのデータをリアルタイム取得
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
      await addThread(newThreadText); // Firestoreに新規スレッドを追加
      setNewThreadText("");
      toggleModal();
    } catch (error) {
      console.error("スレッドの投稿に失敗しました:", error);
      alert("スレッドを投稿できませんでした。再度お試しください。");
    }
  };

  // 相対時間を計算する関数
  const getRelativeTime = (postTime: any): string => {
    const postDate = new Date(postTime.toDate()); // FirestoreのTimestampをDate型に変換
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}秒前`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}分前`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}時間前`;
    return `${Math.floor(diffInSeconds / 86400)}日前`;
  };

  return (
    <div className={styles.boxContent}>
      <div className={styles.mainContent}>
        <h2>企業スレッド</h2>
        <div className={styles.threadsSwitch}>
          <a href="/mainScreen"><h3>←嘘スレッド</h3></a>
        </div>

        {/* スレッド一覧 */}
        <div className={styles.threadContent}>
          {threads.map((thread) => (
            <div className={styles.threads} key={thread.id}>
              <div className={styles.threadsText}>
                <p>{thread.text}</p>
              </div>
              <div className={styles.niceContent}>
                <figure>
                  <img
                    src="/images/niceIcon.svg"
                    alt="いいねアイコン"
                    onClick={() => toggleLikeThread(thread)}
                    className={thread.isLiked ? styles.liked : ""}
                  />
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

        {/* モーダルと投稿フォーム */}
        <div className={styles.createContent}>
          <button onClick={toggleModal}>スレッドを作成</button>

          {/* モーダル表示 */}
          {isModalVisible && (
            <div className={styles.modal}>
              <form onSubmit={handleSubmit}>
                <textarea
                  value={newThreadText}
                  onChange={(e) => setNewThreadText(e.target.value)}
                  placeholder="新しいスレッドを入力..."
                />
                <button type="submit">投稿</button>
                <button type="button" onClick={toggleModal}>キャンセル</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
