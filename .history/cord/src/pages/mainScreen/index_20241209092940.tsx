import {useEffect} from "react"
import styles  from '@/styles/mainScreen/index.module.css';

export default function main(){
  // *{margin:0,padding:0}
  return(
    <>
      <div className={styles.boxContent}>
        <div className={styles.mainContent}>
          <h2>嘘スレッド</h2>
          <div className={styles.threadContent}></div>
        </div>
      </div>
    </>
  )
}