import styles from "./chat.module.css"
import Link from "next/link"
import { BsChatText } from "react-icons/bs"

const Chat = () => {
  return (
    <Link href="/chat" className={styles.container}><BsChatText/></Link>
  )
}

export default Chat