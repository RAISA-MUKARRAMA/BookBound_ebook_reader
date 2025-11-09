import React from 'react'
import styles from './Signup.module.css'
import Image from 'next/image'

const page = () => {
  return (
    <div className={styles.signuppage_top}>
      <div className={styles.createAccountContainer}>
        <h1>Create Account</h1>
        <form className={styles.signup_form}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />

            <label htmlFor="email">Email:</label>
            <input type='email' id='email' />

            <label htmlFor='password'>Password:</label>
            <input type='password' id='password' placeholder='At least 6 characters' />
            <p className={styles.passwordInfo}>Passwords must be at least 6 characters.</p>
            
            <label htmlFor='password-again'>Password again:</label>
            <input type='password' id='password-again'/>
            

            <button type='submit' className={styles.createAccountButton}>Create your BookBound Account</button>
        
        </form>

        <p className={styles.agreement}>
            By clicking "Create your BookBound account", you agree to the BookBound <a href='https://www.amazon.co.uk/gp/help/customer/display.html?nodeId=GLSBYFE9MGKKQXXM'>Conditions of Use & Sale</a>, the <a href='https://www.amazon.com/gp/help/customer/display.html?nodeId=201014950'>BookBound Store Terms of Use</a>, BookBound's <a href='https://www.amazon.com/gp/help/customer/display.html?nodeId=GX7NJQ4ZB8MHFRNJ'>Privacy Notice</a>
        </p>

        <p className={styles.signin}>
            Already have an account? <a href='/login'>Sign In</a>
        </p>
      </div>
    </div>
  )
}

export default page
