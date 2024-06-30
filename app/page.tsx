import { auth } from "@/auth"
import GoogleSigninBtn from "@/components/google/GoogleSigninBtn"
import Link from "next/link"

const page = async () => {
  const session = await auth()
  return (
    <>
      <h2>Home page</h2>
      {session ? <Link href="/chat">Chat</Link> : <GoogleSigninBtn />}
    </>
  )
}

export default page
