import {useEffect} from "react"
import styles  from '@/styles/index/index.module.css';

export default function home(){
  return(
    <>
      <div className={styles.boxContent}>
        <div className={styles.logoContent}>
          <figure>
            {/* <h2>ロゴ</h2> */}
            <img src="" alt="" />
          </figure>
        </div>
        <div className={styles.buttonContent}>
          <h2>ここから先の会話は全部嘘です。</h2>
          <div>
            <a className={styles.btnEmergency}></a>
          </div>
        </div>
      </div>
    </>
  )
}