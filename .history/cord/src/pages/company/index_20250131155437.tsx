import { useState, useEffect } from "react";
import { db } from "@/api/firebase"; // Import your Firebase instance
import { collection, getDocs, query, where } from "firebase/firestore"; // Firebase Firestore imports
import { addThread } from "@/hooks/useFirebase";
import styles from "@/styles/company/index.module.css";

export default function Main() {
  const [threads, setThreads] = useState<any[]>([]); // Store threads here
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newThreadText, setNewThreadText] = useState("");
  const [category, setCategory] = useState<"private" | "company">("company"); // Default to "company"

  // Fetch threads from Firestore when the component mounts
  const fetchThreads = async () => {
    try {
      // Adjust query to target the 'posts' subcollection under the 'company' collection
      const threadsQuery = query(
        collection(db, "threads", "company", "posts"), // Corrected path
        where("category", "==", "company") // Filter by category "company"
      );

      // Fetch data from Firestore
      const querySnapshot = await getDocs(threadsQuery);

      // Check if any documents were fetched
      if (querySnapshot.empty) {
        console.log("No threads found for this category.");
      }

      const threadsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Fetched threads:", threadsData); // Log the fetched data
      setThreads(threadsData); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching threads:", error);
    }
  };

  useEffect(() => {
    fetchThreads(); // Fetch threads when the component mounts
  }, []); // This runs only once when the component mounts

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
      // Add the new thread to Firestore
      await addThread(newThreadText, category);
      setNewThreadText("");
      toggleModal(); // Close modal after submission
      fetchThreads(); // Fetch threads again to show the newly added thread
    } catch (error) {
      console.error("Failed to add thread:", error);
      alert("スレッドを投稿できませんでした。再度お試しください。");
    }
  };

  // Calculate relative time since the thread was posted
  const getRelativeTime = (postTime: any): string => {
    // Handle Firestore timestamp conversion if needed
    const postDate = postTime.toDate ? postTime.toDate() : new Date(postTime); // Convert Firestore timestamp to JS Date
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
          <a href="/mainScreen">
            <h3>←嘘スレッド</h3>
          </a>
        </div>
        <div className={styles.threadContent}>
          {/* Check if threads exist */}
          {threads.length > 0 ? (
            threads.map((thread) => (
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
            ))
          ) : (
            <p>企業スレッドがまだありません。</p> // Message when no threads exist
          )}
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
          <div className={styles.sortContent}>
            <div className={styles.sortBox}>
              <figure>
                <img src="/images/sortIcon.png" alt="" />
              </figure>
              <h4>最新順</h4>
            </div>
          </div>
          <button className={styles.createButton} onClick={toggleModal}>
            嘘スレッドをたてる
          </button>
          <div className={styles.accountContent}>
            <p>マイアカウント</p>
            <div className={styles.accountFace}>
              <figure>
                <img src="/images/accountIcon.png" alt="アカウントアイコン"/>
              </figure>
            </div>
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
