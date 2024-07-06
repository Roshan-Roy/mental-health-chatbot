import { auth } from "@/auth"
import GoogleSigninBtn from "@/components/google/GoogleSigninBtn"
import Link from "next/link"
import styles from "./page.module.css"
import { FaArrowRight } from "react-icons/fa"
import Image from "next/image"

const page = async () => {
  const session = await auth()
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.sec1}>
          <Image src="/home-img.jpg" alt="home image" fill />
        </div>
        <div className={styles.sec2}>
          <h1>Sophia</h1>
          <h3>Your dedicated companion for mental health</h3>
          <p className={styles.intro}>I'm here to support you on your journey towards a healthier mind</p>
          {session ? <Link href="/chat">
            <div className={styles.chat}>
              <p>Chat</p>
              <FaArrowRight />
            </div>
          </Link> : <GoogleSigninBtn />}
        </div>
      </div>
    </div>
  )
}

export default page
