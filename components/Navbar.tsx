"use client"
import React, { useState, useEffect, useRef } from 'react'
import styles from './Navbar.module.css'
import { IoSearchOutline } from 'react-icons/io5'
import { LuShoppingCart } from 'react-icons/lu'
import { FaUserCircle } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

const apiURL = process.env.NEXT_PUBLIC_API_URL;

const Navbar = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    
    if (query.length > 1) { // fetch only if query is longer than 1 char
      try {
        const res = await fetch(`${apiURL}/api/books/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        console.log('Search results:', data)
        if (res.ok) setSearchResults(data)
      } catch (err) {
        console.error('Search error:', err)
      }
      setShowDropdown(true)
    } else {
      setShowDropdown(false)
    }
  }

  const handleBookClick = (bookId: string) => {
    router.push(`/book/${bookId}`)
    setSearchQuery('')
    setShowDropdown(false)
  }

  const handleUserIconClick = () => {
    const userEmail = localStorage.getItem('userEmail')
    router.push(userEmail ? '/profile' : '/login')
  }

  const handleCartIconClick = () => {
    const userEmail = localStorage.getItem('userEmail')
    router.push(userEmail ? '/cart' : '/login')
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <h1 className={styles.logo} onClick={() => router.push('/')}>BookBound</h1>

        <div className={styles.searchBar} ref={dropdownRef}>
          <IoSearchOutline className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search books, authors, genres..." 
            className={styles.searchInput}
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
          />

          {showDropdown && searchResults.length > 0 && (
            <div className={styles.searchDropdown}>
              {searchResults.map(book => (
                <div 
                  key={book._id} 
                  className={styles.searchItem} 
                  onClick={() => handleBookClick(book._id)}
                >
                  <img src={book.image} alt={book.title} className={styles.searchItemImg}/>
                  <div>
                    <p className={styles.searchItemTitle}>{book.title}</p>
                    <p className={styles.searchItemAuthor}>{book.author}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.rightSection}>
        <button className={styles.libraryButton} onClick={() => router.push('/BookBound-library')}>Go to Library</button>
        <LuShoppingCart className={styles.icon} onClick={handleCartIconClick} />
        <FaUserCircle className={`${styles.icon} ${styles.userIcon}`} onClick={handleUserIconClick} title="Your Profile" />
      </div>
    </nav>
  )
}

export default Navbar
