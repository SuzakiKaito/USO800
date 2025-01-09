import { useState } from "react";
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

  // モーダルの表示状態を管理
  const [isModalVisible, setIsModalVisible] = useState(false);

  // モーダル表示を切り替える関数
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

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
              <figure><img src="/images/museumIcon.png" alt="嘘博物館アイコン" /></figure>
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
          <div className={styles.createContent}>
            <button
              className={styles.createButton}
              onClick={toggleModal} // ボタンをクリックするとモーダルの表示が切り替わる
            >
              嘘スレッドをたてる
            </button>
            <div className={styles.accountContent}>
              <figure className={styles.accountFace}>
                <img src="" alt="" />
              </figure>
              <p>マイアカウント</p>
              <div className={styles.accountName}>
                <h4>細田カイト</h4>
              </div>
            </div>
          </div>
        </div>
        {/* モーダルと背景の表示状態を切り替え */}
        {isModalVisible && (
          <>
            <div className={styles.bgContent}></div>
            <div className={styles.modalContent}>
              <h3 className={styles.modalText}>嘘スレッドを書き込もう</h3>
              <form action="" className={styles.modalForm}>
                <input
                  type="text"
                  name="name"
                  maxLength={20}
                  className={styles.modalInput}
                />
                <div className={styles.modalButtons}>
                  <button
                    className={styles.deleteButton}
                    type="button"
                    onClick={toggleModal} // モーダルを閉じる
                  >
                    削除する
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
    </>
  );
}
