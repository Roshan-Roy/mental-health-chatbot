"use client"

import { signOut } from "next-auth/react"
import styles from "./logout.module.css"
import { MdLogout } from "react-icons/md"
import { useState } from "react"

const LogoutBtn = () => {
    const [clicked, setClicked] = useState(false)
    const handleClick = () => {
        if (!clicked) {
            setClicked(true)
            signOut()
        }
    }
    return (
        <div className={clicked ? `${styles.logout_btn} ${styles.disabled}` : styles.logout_btn} onClick={handleClick}>
            <MdLogout className={styles.icon} />
            <p>Logout</p>
        </div>
    )
}

export default LogoutBtn