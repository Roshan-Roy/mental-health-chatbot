"use client"

import Link from "next/link"
import styles from "./navbar.module.css"
import { useSession } from "next-auth/react"
import { LuInfo, LuSettings } from "react-icons/lu"
import User from "./user/User"
import { usePathname } from "next/navigation"
import Chat from "./chat/Chat"

const Navbar = () => {
  const { data: session } = useSession()
  const pathName = usePathname()
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h3><Link href="/">Sophia</Link></h3>
          <div className={styles.icons_container}>
            {session && <Link className={styles.icons} href="/settings"><LuSettings /></Link>}
            <Link className={styles.icons} href="/about"><LuInfo /></Link>
            {session && <User
              name={session?.user?.name as string}
              email={session?.user?.email as string}
              image={session?.user?.image as string}
            />}
          </div>
        </div>
      </div>
      <div className={styles.adjust_top}></div>
      {(session && pathName !== "/" && pathName !== "/chat") && <Chat />}
    </>
  )
}

export default Navbar