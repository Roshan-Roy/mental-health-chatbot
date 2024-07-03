import styles from "./model.module.css"

const Model = ({ text }: {
    text: string;
}) => {
    return (
        <div className={styles.container}>
            <h5>Sophia</h5>
            <p className={styles.content}>{text.replace(/\*/g, "")}</p>
        </div>
    )
}

export default Model