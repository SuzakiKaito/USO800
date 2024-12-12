import {useEffect} from "react"
import styles  from '@/styles/mainScreen/index.module.css';
// *{margin:0,padding:0}

export default function main(){
  return(
    <>
      <div className={styles.boxContent}>
        <div className={styles.mainContent}>
          <h2>嘘スレッド</h2>
        </div>
      </div>
    </>
  )
}