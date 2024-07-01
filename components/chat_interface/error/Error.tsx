import styles from "./error.module.css"
import { IoIosCloseCircle } from "react-icons/io"

const Error = () => {
    return (
        <div className={styles.container}>
            <IoIosCloseCircle />
            <p>An error occurred</p>
        </div>
    )
}

export default Error