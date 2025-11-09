"use client"
import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()
  return (
    <div className={styles.homepage_top}>

      <p className={styles.c2}>Welcome to BookBound</p>
      <p className={styles.c3}>Your Gateway to Literary Adventures</p> 
      <div className={styles.signup_login_buttons}>
        <button className={styles.signup}
          onClick = {() => {
            router.push('/signup');
          }}>
            Create an account</button>
        <button className={styles.login}
          onClick = {() => {
            router.push('/login');
          }}>
          Sign in with your account</button>
      </div>
    </div>
  )
}

export default page
