import { useRouter } from "next/router";
import styles from "@/styles/thread/index.module.css";

export default function Thread() {
  const router = useRouter();

  // メイン画面に戻る関数
  const handleClose = () => {
    router.push("/mainScreen");
  };

  return (
    <>
      <div className={styles.boxContent}>
        <div className={styles.mainContent}>
          <h2>嘘スレッド</h2>
          <div className={styles.threadContent}>
            <div className={styles.thread}>
              <h2>100m走で世界新記録出しました。何か質問ある人いる？</h2>
              <div className={styles.niceContent}>
                <figure>
                  <img src="/images/niceIcon.svg" alt="いいねアイコン" />
                </figure>
                <p>40</p>
              </div>
              <p>2分前</p>
            </div>
            <div className={styles.threadPost}>
              <div className={styles.threadText}>
                <p>嘘コメント欄</p>
                <p>コメント数16</p>
              </div>
              <p>嘘コメントを投稿する</p>
            </div>
            <div className={styles.commentContent}>
              {/* コメントリスト */}
              {Array.from({ length: 9 }, (_, index) => (
                <div className={styles.threads} key={index}>
                  <p>{`${index + 1}-`}</p>
                  <h3>シンプルに尊敬です！</h3>
                </div>
              ))}
            </div>
            <div className={styles.closeButton}>
              {/* 閉じるボタン */}
              <button onClick={handleClose} className={styles.closeButtonStyle}>
                閉じる
              </button>
            </div>
          </div>
        </div>
        <div className={styles.modalContent}>
          <input
            type="text"
            name="text"
            className={styles.inputText}
            placeholder="嘘コメントを投稿する"
          />
          <div className={styles.modalButton}>
            <button className={styles.deleteButton}>消去する</button>
            <button className={styles.postButton}>投稿する</button>
          </div>
        </div>
      </div>
    </>
  );
}
