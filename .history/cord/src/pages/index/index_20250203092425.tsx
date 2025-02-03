
import styles  from '@/styles/index/index.module.css';

export default function home(){
  return(
    <>
      <div className={styles.boxContent}>
        <div className={styles.logoContent}>
          <figure>
            {/* <h2>ロゴ</h2> */}
            <img src="/images/logo.png" alt="USO800のロゴ"/>
          </figure>
        </div>
        <div className={styles.buttonContent}>
          <h2>ここから先の会話は全部<span>嘘</span>です。</h2>
          <div className={styles.button}>
            <a href="/mainScreen" className={styles.btnEmergency}>
              <span className={styles.btnEmergencyBottom}></span>
              <span className={styles.btnEmergencyTop}><span>Lets go</span></span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}