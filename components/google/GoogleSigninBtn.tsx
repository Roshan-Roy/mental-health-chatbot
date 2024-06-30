"use client"

import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { signIn } from "next-auth/react"

const GoogleSigninBtn = () => {
    const handleClick = () => {
        signIn("google", {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        })
    }
    return (
        <button onClick={handleClick}>Sign in</button>
    )
}

export default GoogleSigninBtn