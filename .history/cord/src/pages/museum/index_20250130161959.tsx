import { useState } from "react";
import styles from "@/styles/museum/index.module.css";


export default function museum(){

  // const threads = useThreads();

  const [threadsE, setThreads] = useState([
    { id: 1, text: "100m走で世界新記録出しました", niceCount: 0,  isLiked: false, postTime: "40秒前" },
    { id: 2, text: "今日外に恐竜おったんやけど", niceCount: 0,  isLiked: false, postTime: "1分前" },
    { id: 3, text: "鼻からビー玉が出てきました", niceCount: 0,  isLiked: false, postTime: "2分前" },
    { id: 4, text: "僕、織田信長何ですけど何か質問...", niceCount: 67,  isLiked: false, postTime: "5分前" },
    { id: 5, text: "明日、東大模試受けてきます。", niceCount: 5,  isLiked: false, postTime: "8分前" },
    { id: 6, text: "ランボルギーニ乗り回してます。", niceCount: 8,  isLiked: false, postTime: "10分前" },
    { id: 7, text: "今、コロンビアにいます。お土産...", niceCount: 122,  isLiked: false, postTime: "12分前" },
    { id: 8, text: "魚になりました。", niceCount: 11,  isLiked: false, postTime: "15分前" },
    { id: 9, text: "腕がマシンガンになっちゃった", niceCount: 40,  isLiked: false, postTime: "20分前" },
    { id: 10, text: "公園で財布拾ったけど、誰の？", niceCount: 22,  isLiked: false, postTime: "22分前" },
  ]);

  return<>
    <div>
      <div className={styles.boxContent}>
        <div className={styles.mainContent}>
          <h2>嘘ミュージアム</h2>
          <div className={styles.museumDate}>
            <p>2025/01/05</p>
            <figure>
              <img src="/images/calendarIcon.png" alt="カレンダー" />
            </figure>
            <figure className={styles.prevContent}>
              <img src="/images/prevArrow.png" alt="先週矢印"/>
            </figure>
            <figure className={styles.nextContent}>
              <img src="/images/nextArrow.png" alt="次週矢印" />
            </figure>
          </div>
          <div className={styles.threadsRank}>
              <div className={styles.threads}>
                <figure><img src="/images/goldTrophy.png" alt="金トロフィー" /></figure>
                <div className={styles.thread}>
                  <p className={styles.threadText}>100m走で世界新記録出しました</p>
                  <div className={styles.threadIcon}>
                    <figure>
                      <img src="/images/niceIcon.svg" alt="いいねアイコン" />
                    </figure>
                    <p>80</p>
                  </div>
                </div>
              </div>
              <div className={styles.threads}>
                <figure><img src="/images/silverTrophy.png" alt="銀トロフィー" /></figure>
                <div className={styles.thread}>
                  <p className={styles.threadText}>ランボルギーニ乗り回してます。</p>
                  <div className={styles.threadIcon}>
                    <figure>
                      <img src="/images/niceIcon.svg" alt="いいねアイコン" />
                    </figure>
                    <p>40</p>
                  </div>
                </div>
              </div>
              <div className={styles.threads}>
                <figure><img src="/images/bronzeTrophy.png" alt="銅トロフィー" /></figure>
                <div className={styles.thread}>
                  <p className={styles.threadText}>僕、織田信長何ですけど何か質問</p>
                  <div className={styles.threadIcon}>
                    <figure>
                      <img src="/images/niceIcon.svg" alt="いいねアイコン" />
                    </figure>
                    <p>34</p>
                  </div>
                </div>
              </div>
          </div>
          <div className={styles.comment}>
            <div className={styles.bubble}>
              <p>私は100m走<br />
              16秒ですわよ。</p>
            </div>
            <figure>
              <img src="/images/paint1.png" alt="モナリザの絵画" />
            </figure>
          </div>
          <div className={styles.dataModal}>
            <h4>2025年 1月</h4>
            <div className={styles.weekContent}>
              <div className={styles.weekBox}>1週目</div>
              <div className={styles.week}>2週目</div>
              <div className={styles.week}>3週目</div>
              <div className={styles.week}>4週目</div>
            </div>
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
            <a href="/mainScreen" className={styles.createButton}>嘘スレッドに戻る</a>
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
      </div>
    </div>
  </>

} 
