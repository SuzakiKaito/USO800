import {useEffect} from "react"
import styles  from '@/styles/mainScreen/index.module.css';

export default function main(){
  // *{margin:0,padding:0}
  return(
    <>
      <div className={styles.boxContent}>
        <div className={styles.mainContent}>
          <h2>嘘スレッド</h2>
          <div className={styles.threadContent}>
            <div className={styles.threads}>
              <div className={styles.threadsText}>
                <p>100m走で世界新記録出しました</p>
              </div>
              <div className={styles.niceContent}>
                <figure>
                  <img src="/images/niceIcon.svg" alt="いいねアイコン" />
                </figure>
                <p>0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}