"use client"
import React, { useState } from 'react'
import styles from './Login.module.css'
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const apiURL = process.env.NEXT_PUBLIC_API_URL;

const SignIn = () => {

  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiURL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData.email);
        router.push('/');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Failed to log in'}`);
      }
    } catch (error) {
      alert("Network error. Please try again later.");
    }
  }

  return (
    <div className={styles.loginpage_top}>
      <div className={styles.signInContainer}>
        <h1 className={styles.title}>Sign In</h1>
        <form className={styles.signInForm} onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <a className={styles.forgotPassword} href="/forgot-password">
            Forgot Password?
          </a>

          <button className={styles.submitButton} type="submit">
            Sign In
          </button>
        </form>

        <p className={styles.signup}>
          Don't have an account yet? <a href='/signup'>Sign Up</a>
        </p>
      </div>
    </div>
  )
}

export default SignIn
