import { useState } from "react";
import styles from '@/styles/mainScreen/index.module.css';

export default function Main() {
  // スレッドデータを配列として定義
  const [threads, setThreads] = useState([
    { id: 1, text: "100m走で世界新記録出しました", niceCount: 0, postTime: "0分前" },
    { id: 2, text: "今日外に恐竜おったんやけど", niceCount: 0, postTime: "1分前" },
    { id: 3, text: "花からビー玉が出てきました", niceCount: 0, postTime: "2分前" },
    { id: 4, text: "僕、織田信長何ですけど何か質問ありますか？", niceCount: 0, postTime: "5分前" },

  ]);

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
      </div>
    </>
  );
}
