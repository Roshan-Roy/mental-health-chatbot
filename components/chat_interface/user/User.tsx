import styles from "./user.module.css"

const User = ({ text }: {
    text: string;
}) => {
    return (
        <div className={styles.container}>
            <p>{text}</p>
        </div>
    )
}

export default User