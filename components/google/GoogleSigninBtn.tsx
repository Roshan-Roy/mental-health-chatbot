"use client"

import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { signIn } from "next-auth/react"
import styles from "./googlesigninbtn.module.css"
import { Poppins } from "next/font/google"

const poppins = Poppins(
    {
      weight: "600",
      subsets: ['latin'],
    }
  );
  

const GoogleSigninBtn = () => {
    const handleClick = () => {
        signIn("google", {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        })
    }
    return (
        <button className={`${poppins.className} ${styles.btn}`} onClick={handleClick}>Sign In</button>
    )
}

export default GoogleSigninBtn