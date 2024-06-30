"use client"

import { signOut } from "next-auth/react"
import styles from "./logout.module.css"
import { MdLogout } from "react-icons/md"

const LogoutBtn = () => {
    const handleClick = () => {
        signOut()
    }
    return (
        <div className={styles.logout_btn} onClick={handleClick}>
            <MdLogout className={styles.icon}/>
            <p>Logout</p>
        </div>
    )
}

export default LogoutBtn