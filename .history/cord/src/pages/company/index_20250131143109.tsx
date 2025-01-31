import { useState } from "react";
import { useThreads, addThread } from "@/hooks/useFirebase"; // Firebase hooks
import styles from "@/styles/company/index.module.css";


export default function Main() {
  const threads = useThreads();
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

  // 相対時間を計算する関数
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

  const [threadsE, setThreads] = useState([
    { id: 1, text: "うまい棒に新たな味が！？！？", niceCount: 0, postTime: "40秒前" },
    { id: 2, text: "まるよし精肉店に新メニューがで...", niceCount: 0, postTime: "1分前" },
    { id: 3, text: "口の中で消えるチョコがあるらし...", niceCount: 0, postTime: "2分前" },
    { id: 4, text: "白いバーモンドカレーを見たこと...", niceCount: 100, postTime: "5分前" },
    { id: 5, text: "謎肉が10倍だと!?", niceCount: 5, postTime: "8分前" },
    { id: 6, text: "高い古着を買ってるやつはバカ！", niceCount: 0, postTime: "10分前" },
    { id: 7, text: "ふるさと納税なんてもうやめたい...", niceCount: 0, postTime: "12分前" },
    { id: 8, text: "ガリガリ君これからブヨブヨ君に...", niceCount: 0, postTime: "15分前" },
    { id: 9, text: "新台導入! Pフィーバー瀧本竜嗣...", niceCount: 0, postTime: "20分前" },
    { id: 10, text: "株って簡単なんだぜ", niceCount: 0, postTime: "22分前" },
  ]);

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSortContent = () => {
    setIsExpanded(!isExpanded);
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
              {/* 相対時間を表示 */}
              <p className={styles.postTime}>{getRelativeTime(thread.postTime)}</p>
            </div>
          ))}

          {threadsE.map((thread) => (
              <div className={styles.threads} key={thread.id}>
                <div className={styles.threadsText}>
                  <p>{thread.text}</p>
                </div>
                <div className={styles.niceContent}>
                  <figure>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.00305 9.59847C6.22155 5.16247 11.0001 3.49997 14.2531 2.09847C15.7321 1.46147 16.0981 3.86147 15.5031 5.34847C15.0031 6.59847 14.0031 7.99997 14.0031 7.99997H18.2531C18.7172 7.99997 19.1623 8.18434 19.4905 8.51253C19.8187 8.84072 20.0031 9.28584 20.0031 9.74997C20.0031 10.2141 19.8187 10.6592 19.4905 10.9874C19.1623 11.3156 18.7172 11.5 18.2531 11.5H19.2531C19.7172 11.5 20.1623 11.6843 20.4905 12.0125C20.8187 12.3407 21.0031 12.7858 21.0031 13.25C21.0031 13.7141 20.8187 14.1592 20.4905 14.4874C20.1623 14.8156 19.7172 15 19.2531 15H17.2531C17.7172 15 18.1623 15.1843 18.4905 15.5125C18.8187 15.8407 19.0031 16.2858 19.0031 16.75C19.0031 17.2141 18.8187 17.6592 18.4905 17.9874C18.1623 18.3156 17.7172 18.5 17.2531 18.5H15.7531C16.2172 18.4998 16.6624 18.6841 16.9906 19.0122C17.3189 19.3403 17.5034 19.7853 17.5036 20.2495C17.5037 20.7136 17.3194 21.1588 16.9913 21.4871C16.6633 21.8153 16.2182 21.9998 15.7541 22H9.50305C7.75305 22 5.50305 21.0985 4.00305 18.5985C2.56555 16.202 2.50305 12.5985 4.00305 9.59847Z" stroke="#EF9090" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M2.89502 9.59  847C5.11352 5.16247 9.89202 3.49997 13.145 2.09847C14.624 1.46147 14.99 3.86147 14.395 5.34847C13.895 6.59847 12.895 7.99997 12.895 7.99997H17.145C17.6092 7.99997 18.0543 8.18434 18.3825 8.51253C18.7106 8.84072 18.895 9.28584 18.895 9.74997C18.895 10.2141 18.7106 10.6592 18.3825 10.9874C18.0543 11.3156 17.6092 11.5 17.145 11.5H18.145C18.6092 11.5 19.0543 11.6843 19.3825 12.0125C19.7106 12.3407 19.895 12.7858 19.895 13.25C19.895 13.7141 19.7106 14.1592 19.3825 14.4874C19.0543 14.8156 18.6092 15 18.145 15H16.145C16.6092 15 17.0543 15.1843 17.3825 15.5125C17.7106 15.8407 17.895 16.2858 17.895 16.75C17.895 17.2141 17.7106 17.6592 17.3825 17.9874C17.0543 18.3156 16.6092 18.5 16.145 18.5H14.645C15.1092 18.4998 15.5543 18.6841 15.8826 19.0122C16.2109 19.3403 16.3954 19.7853 16.3955 20.2495C16.3957 20.7136 16.2114 21.1588 15.8833 21.4871C15.5552 21.8153 15.1102 21.9998 14.646 22H8.39502C6.64502 22 4.39502 21.0985 2.89502 18.5985C1.45752 16.202 1.39502 12.5985 2.89502 9.59847Z" stroke="#E76363" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
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
          {isExpanded && (
          <div className={`${styles.sortBox} ${styles.sortHidden}`}>
            <figure>
              <img src="/images/sortIcon.png" alt="並び替えアイコン" />
            </figure>
            <h4>いいね順</h4>
          </div>
          )}
        </div>
          <button
            className={styles.createButton}
            onClick={toggleModal}
          >
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
      {/* Modal */}
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
