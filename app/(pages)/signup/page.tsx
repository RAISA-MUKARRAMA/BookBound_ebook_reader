"use client"
import React, { useState } from 'react'
import styles from './Signup.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation';

const apiURL=process.env.NEXT_PUBLIC_API_URL;

const CreateAccount = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: ''
  });

  const router = useRouter()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    console.log("Submitting form data:", formData); // Debugging log
    e.preventDefault();
    
    if (formData.password !== formData.confirmpassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await fetch(`${apiURL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });
      if (response.ok) {
        console.log("Account created successfully");
        router.push('/login');
      } else {
        const errorData = await response.json();
        console.error("Error creating account:", errorData);
        alert(`Error: ${errorData.message || 'Failed to create account'}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error. Please try again later.");
    }
  }
  return (
    <div className={styles.signuppage_top}>
      <div className={styles.createAccountContainer}>
        <h1>Create Account</h1>
        <form className={styles.signup_form} onSubmit={handleSubmit}>
            <label htmlFor="name">Username:</label>
            <input type="text" id="name" name="name" placeholder='First and last name' value={formData.name} onChange={handleChange} required />

            <label htmlFor="email">Email:</label>
            <input type='email' id='email' value={formData.email} onChange={handleChange} />

            <label htmlFor='password'>Password:</label>
            <input type='password' id='password' placeholder='At least 6 characters' value={formData.password} onChange={handleChange} />
            <p className={styles.passwordInfo}>Passwords must be at least 6 characters.</p>
            
            <label htmlFor='confirmpassword'>Password again:</label>
            <input type='password' id='confirmpassword' value={formData.confirmpassword} onChange={handleChange}/>
            

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

export default CreateAccount
