import styles from "./skeleton.module.css"

const Skeleton = () => {
  return (
    <div className={styles.container}>
      <h5>Sophia</h5>
      <div></div>
      <div></div>
      <div className={styles.third}></div>
    </div>
  )
}

export default Skeleton