import { useRef } from "react"
import Image from "next/image"
import styles from "./user.module.css"
import { IoMdClose } from "react-icons/io"
import LogoutBtn from "@/components/logout/LogoutBtn"

type UserType = {
  name: string;
  email: string;
  image: string;
}

const User = ({ name, email, image }: UserType) => {
  const modal = useRef<HTMLDialogElement>(null)
  const showModal = () => {
    modal.current?.showModal()
  }
  const closeModal = () => {
    modal.current?.close()
  }
  return (
    <>
      <div className={styles.image_container} onClick={showModal}>
        <Image src={image} alt={"profile picture"} fill />
      </div>
      <dialog className={styles.modal} ref={modal}>
        <p className={styles.heading}>My Account</p>
        <button onClick={closeModal} className={styles.close_btn}><IoMdClose/></button>
        <div className={styles.user_datails}>
          <div className={styles.profile_pic}>
            <Image src={image} alt="profile picture" quality={100} fill />
          </div>
          <p>Hi, {name.split(" ")[0]}!</p>
          <p className={styles.email}>{email}</p>
        </div>
        <LogoutBtn/>
      </dialog>
    </>
  )
}

export default User