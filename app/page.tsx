"use client"
import React, { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Navbar from '@/components/Navbar'
import Footer from "@/components/Footer";
import { motion } from "framer-motion"

const apiURL = process.env.NEXT_PUBLIC_API_URL

interface Book {
  _id: string;
  title: string;
  image: string;
  author: string;
  total_read: number;
  category: string;
}

const categories = {
  'Fiction': 'https://images.unsplash.com/photo-1626618012641-bfbca5a31239?auto=format&fit=crop&w=764',
  'Non-Fiction': 'https://images.unsplash.com/photo-1658842042779-dc9ab3125690?auto=format&fit=crop&w=749',
  'Educational': 'https://plus.unsplash.com/premium_photo-1681681082335-f87e62a789fe?auto=format&fit=crop&w=1170',
  'Creative': 'https://images.unsplash.com/photo-1704918605018-6449befbc85b?auto=format&fit=crop&w=735',
  'Romance': 'https://plus.unsplash.com/premium_photo-1661685242413-64a1706b69da?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687',
  'Mystery': 'https://images.unsplash.com/photo-1574671992738-e1a462d1ec7c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
  'Fantasy': 'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687',
  'Science': 'https://plus.unsplash.com/premium_photo-1681843068732-0564f2b1d0b4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1172',
  'Self-Help': 'https://plus.unsplash.com/premium_photo-1731951687922-1bb9d7722a49?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687',
  'Biography': 'https://images.unsplash.com/photo-1732304719906-df17c28691aa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687'
}

const Page = () => {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [books, setBooks] = useState<Book[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const email = localStorage.getItem('userEmail')
    setUserEmail(email)

    const fetchBooks = async () => {
      try {
        const res = await fetch(`${apiURL}/api/books/all`)
        const data = await res.json()
        if (res.ok) setBooks(data)
      } catch (err) {
        console.error("Failed to fetch books", err)
      }
    }
    fetchBooks()
  }, [])

  const handleGoToLibrary = () => router.push('/BookBound-library')
  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' })
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' })

  const topReadBooks = books.filter(book => book.total_read >= 50)

  return (
    <div className={styles.homepage}>
      <Navbar />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1><span>BookBound</span> — Your Reading Companion</h1>
          <p>Discover stories that enlighten, inspire, and transport you.</p>
          <div className={styles.buttons}>
            <button className={styles.primaryBtn} onClick={handleGoToLibrary}>
              Explore Library <FaArrowRight className={styles.arrowIcon}/>
            </button>
            {!userEmail && (
              <>
                <button className={styles.secondaryBtn} onClick={() => router.push('/signup')}>Create Account</button>
                <button className={styles.secondaryBtn} onClick={() => router.push('/login')}>Sign In</button>
              </>
            )}
          </div>
        </div>
        <div className={styles.heroGif}>
          <img src="https://media4.giphy.com/media/xT77Y1T0zY1gR5qe5O/giphy.gif" alt="Books animation"/>
        </div>
      </section>

      {/* Categories */}
      <section className={styles.categories}>
        <h2>Browse by Categories</h2>
        <button className={`${styles.scrollBtn} ${styles.leftBtn}`} onClick={scrollLeft}>
          <FaChevronLeft />
        </button>
        <div className={styles.categoryScroll} ref={scrollRef}>
          {Object.entries(categories).map(([cat, img]) => (
            <div 
              key={cat}
              className={styles.categoryCard}
              onClick={() => router.push(`/BookBound-library?category=${encodeURIComponent(cat)}`)}
            >
              <img src={img} alt={cat} className={styles.categoryImage} />
              <div className={styles.overlay}>
                <h3>{cat}</h3>
              </div>
            </div>
          ))}
        </div>
        <button className={`${styles.scrollBtn} ${styles.rightBtn}`} onClick={scrollRight}>
          <FaChevronRight />
        </button>
      </section>

      {/* Most Read */}
      <section className={styles.featured}>
        <h2>🔥 Most Read Books</h2>
        <div className={styles.booksGrid}>
          {topReadBooks.length > 0
            ? topReadBooks.map(book => (
              <div key={book._id} className={styles.bookCard} onClick={() => router.push(`/book/${book._id}`)}>
                <img src={book.image} alt={book.title} className={styles.bookImage}/>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
              </div>
            ))
            : <p>No popular books available yet.</p>}
        </div>
      </section>

      {/* About Section */}
      <section className={styles.about}>
        <motion.div 
          className={styles.aboutContainer}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {/* Left side: Image with entry motion (no floating) */}
          <motion.div
            className={styles.aboutGraphic}
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1535905557558-afc4877a26fc?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687" 
              alt="BookBound illustration" 
              className={styles.aboutImage}
            />
          </motion.div>

          {/* Right side: Text */}
          <motion.div
            className={styles.aboutContent}
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className={styles.aboutTitle}>
              ✨ About <span className={styles.highlight}>BookBound</span>
            </h2>

            <p className={styles.aboutText}>
              Welcome to <strong>BookBound</strong> — where imagination meets technology.  
              Whether you’re diving into a thrilling mystery, exploring cosmic science, or escaping into fantasy realms,
              BookBound helps you explore, purchase, and track your favorite reads — all in one seamless space.  
              <br /><br />
              Our mission is to make reading an adventure: <em>interactive, personalized, and beautifully bound.</em>
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works / Features Section */}
      <section className={styles.features}>
        <h2> How BookBound Works</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📂</div>
            <h3>Browse by Category</h3>
            <p>Explore books organized by genres and categories that suit your taste.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📝</div>
            <h3>View Summary & Price</h3>
            <p>Check the book’s summary, author details, and pricing before purchasing.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💳</div>
            <h3>Buy Your Favorite Books</h3>
            <p>Add books to your cart and complete your purchase seamlessly.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📖</div>
            <h3>Read Online</h3>
            <p>Read purchased books directly online without downloading anything.</p>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  )
}

export default Page
