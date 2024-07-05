"use client"

import { useState, useRef } from "react"
import User from "./user/User"
import Model from "./model/Model"
import styles from "./chatinterface.module.css"
import { HiOutlinePencilAlt, HiArrowUp } from "react-icons/hi"
import Skeleton from "./model/skeleton/Skeleton"
import toast from "react-hot-toast"
import Error from "./error/Error"
import { useSession } from "next-auth/react"

type ChatType = {
    role: string;
    text: string;
}

const ChatInterface = () => {
    const { data: session } = useSession()
    const [prompt, setPrompt] = useState("")
    const [history, setHistory] = useState<ChatType[]>([])
    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(false)

    const textArea = useRef<HTMLTextAreaElement>(null)
    let scrollHeight = useRef<number>(0)
    const chatArea = useRef<HTMLDivElement>(null)

    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value)
        if (e.target.value.trim() === "") setDisabled(true)
        else setDisabled(false)
        if (textArea.current) textArea.current.style.height = `${15 * 1.5}px`
        scrollHeight.current = textArea.current?.scrollHeight as number
        if (textArea.current) textArea.current.style.height = `${scrollHeight.current}px`
    }
    const handleClear = () => {
        setHistory([])
        setPrompt("")
        setDisabled(true)
        if (textArea.current) textArea.current.style.height = `${15 * 1.5}px`
    }
    const scrollToBottom = () => {
        if (chatArea.current) {
            chatArea.current.scrollTo({
                top: chatArea.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setPrompt("")
        setDisabled(true)
        setLoading(true)
        setTimeout(() => scrollToBottom(), 50)
        if (textArea.current) textArea.current.style.height = `${15 * 1.5}px`
        setHistory(e => [...e, { role: "user", text: prompt.trim() }])
        const response = await fetch("/api/gemini", {
            method: "POST",
            body: JSON.stringify({ prompt: prompt.trim() })
        })
        const result = await response.json()
        if (response.ok) {
            setHistory(e => [...e, { role: "model", text: result.message }])
        } else {
            setPrompt(prompt)
            setDisabled(false)
            if (textArea.current) textArea.current.style.height = `${scrollHeight.current}px`
            setHistory(e => e.slice(0, e.length - 1))
            toast.remove()
            toast.custom(<Error />, { duration: 5000 })
        }
        setLoading(false)
    }
    return (
        <div>
            <div className={styles.input}>
                <div className={styles.container}>
                    <button className={loading ? `${styles.clear} ${styles.disabled}` : styles.clear} onClick={handleClear} disabled={loading}><HiOutlinePencilAlt /></button>
                    <textarea ref={textArea} value={prompt} onChange={handlePromptChange} placeholder="Tell Sophia"></textarea>
                    <button className={disabled || loading ? `${styles.submit} ${styles.disabled}` : styles.submit} onClick={handleSubmit} disabled={disabled || loading}><HiArrowUp /></button>
                </div>
            </div>
            <div className={styles.chat_bg} ref={chatArea}>
                <div className={styles.container}>
                    {history.length === 0 && <h1>Hello, {session?.user?.name?.split(" ")[0]} <br />What&apos;s on your mind today?</h1>}
                    {history.map((e, i) => {
                        if (e.role === "user") return <User key={Math.random().toString(36).slice(2, 9)} text={e.text} />
                        return <Model key={Math.random().toString(36).slice(2, 9)} text={e.text} />
                    })}
                    {loading && <Skeleton />}
                </div>
            </div>
        </div>
    )
}

export default ChatInterface