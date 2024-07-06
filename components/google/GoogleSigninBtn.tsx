"use client"

import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { signIn } from "next-auth/react"
import styles from "./googlesigninbtn.module.css"

const GoogleSigninBtn = () => {
    const handleClick = () => {
        signIn("google", {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        })
    }
    return (
        <button className={styles.btn} onClick={handleClick}>Sign In</button>
    )
}

export default GoogleSigninBtn