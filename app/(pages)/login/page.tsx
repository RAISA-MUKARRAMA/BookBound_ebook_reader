import React from 'react'
import styles from './Login.module.css'

const page = () => {
  return (
    <div className={styles.loginpage_top}>
      <div className={styles.signInContainer}>
        <h1 className={styles.title}>Sign In</h1>
        <form className={styles.signInForm}>
          <label className={styles.label} htmlFor="email">Email:</label>
          <input className={styles.input} type="email" id="email" name="email" required />
          <label className={styles.label} htmlFor="password">Password:</label>
          <input className={styles.input} type="password" id="password" name="password" required />
          <a className={styles.forgotPassword} href="/forgot-password">Forgot Password?</a>
          <button className={styles.submitButton} type="submit">Sign In</button>
        </form>

        <p className={styles.signup}>
            Don't have an account yet? <a href='/signup'>Sign Up</a>
        </p>
      </div>
    </div>
  )
}

export default page
