import { useState,useEffect } from "react";
import styles from '@/styles/mainScreen/index.module.css';

export default function Main() {
  // スレッドデータを配列として定義
  const [threads, setThreads] = useState([
    { id: 1, text: "100m走で世界新記録出しました", niceCount: 0, postTime: "0分前" },
    { id: 2, text: "今日外に恐竜おったんやけど", niceCount: 0, postTime: "1分前" },
    { id: 3, text: "花からビー玉が出てきました", niceCount: 0, postTime: "2分前" },
    { id: 4, text: "僕、織田信長何ですけど何か質問ある？", niceCount: 0, postTime: "5分前" },
    { id: 5, text: "明日、東大模試受けてきます。", niceCount: 0, postTime: "8分前" },
    { id: 6, text: "ランボルギーニ乗り回してます。", niceCount: 0, postTime: "10分前" },
    { id: 7, text: "今、コロンビアにいます。お土産何がいい？", niceCount: 0, postTime: "12分前" },
    { id: 8, text: "魚になりました。", niceCount: 0, postTime: "15分前" },
    { id: 9, text: "腕がマシンガンになっちゃった", niceCount: 0, postTime: "20分前" },
    { id: 10, text: "今、コロンビアにいます。お土産何がいい？", niceCount: 0, postTime: "22分前" },
  ]);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      body {
        scrollbar-width: none; /* Firefox 用 */
        -ms-overflow-style: none; /* IE/Edge 用 */
      }
      body::-webkit-scrollbar {
        display: none; /* Chrome/Safari 用 */
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style); // クリーンアップ
    };
  }, []);

  return (
    <>
      <div className={styles.boxContent}>
        <div className={styles.mainContent}>
          <h2>嘘スレッド</h2>
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
                <p className={styles.postTime}>{thread.postTime}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.footerContent}>
          <div className={styles.features}>
            <div className={styles.usoMuseum}>
              <figure><img src="/images/museumIcon.png" alt="嘘博物館アイコン"/></figure>
            </div>
            <div className={styles.limitedFeatures}>
              <p className={styles.featuresText}>土日限定機能</p>
              <div className={styles.usoRank}>
                <figure><img src="/images/rankIcon.png" alt="嘘ランキングアイコン" /></figure>
              </div>
              <div className={styles.usoStory}>
                <figure><img src="/images/storyIcon.png" alt="嘘ストーリーアイコン" /></figure>
              </div>
            </div>
          </div>
          <button>嘘スレッドをたてる</button>
        </div>
      </div>
    </>
  );
}
