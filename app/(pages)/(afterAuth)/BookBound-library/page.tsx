"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import styles from './BookBoundLibrary.module.css'
import { FaBookOpen } from 'react-icons/fa'
import { FaChevronRight, FaChevronDown } from 'react-icons/fa6'
import { MdBook } from 'react-icons/md'
import { useRouter } from 'next/navigation'

const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002';

const categories = ["All", "Fiction", "Non-Fiction", "Educational", "Creative","Romance", "Mystery", "Fantasy", "Science", "Self-Help", "Biography"];

const Page = () => {
  const router = useRouter()
  const [show, setShow] = useState(false);
  const [allBooks, setAllBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 20;

  // Selected category state
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fetchAllBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${apiURL}/api/books/all`);
        const data = await response.json();
        if (response.ok) {
          setAllBooks(data);
        } else {
          setError(data.message || "Failed to fetch books");
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError("Network error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllBooks();
  }, [mounted]);

  // Filter books based on selected category
  const filteredBooks = selectedCategory === "All" 
    ? allBooks 
    : allBooks.filter(book => book.category.toLowerCase() === selectedCategory.toLowerCase());

  // Pagination calculations
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  if (!mounted) return null;

  return (
    <div className={styles.main}>
      <Navbar/>
      <div className={styles.row}>
        {/* Left Menu */}
        <div className={styles.left}>
          <div className={styles.menuMain}>
            <FaBookOpen className={styles.bookIcon}/>
            <p>Library</p>
            {show ? (
              <FaChevronDown
                onClick={() => setShow(!show)}
                className={styles.toRight} 
              />
            ) : (
              <FaChevronRight
                onClick={() => setShow(!show)}
                className={styles.toRight} 
              />
            )}
          </div>

          {show && (
            <div className={styles.menuItem}>
              {categories.map(category => (
                <span 
                  key={category} 
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1); // reset pagination
                  }}
                  style={{ fontWeight: selectedCategory === category ? "bold" : "normal", color: selectedCategory === category ? "#4A90E2" : "#333" }}
                >
                  {category}
                </span>
              ))}
            </div>
          )}

          {/* <div className={styles.menuMain}>
            <MdBook className={styles.bookIcon2}/>
            <p>Notes & Highlights</p>
          </div> */}
        </div>

        {/* Right Content */}
        <div className={styles.right}>
          <h1>{selectedCategory}</h1>

          <div className={styles.books}>
            {loading ? (
              <p>Loading books...</p>
            ) : currentBooks && currentBooks.length > 0 ? (
              currentBooks.map((book: any) => (
                <div 
                  onClick={() => router.push(`book/${book._id}`)} 
                  key={book._id} 
                  className={styles.bookItem}
                >
                  <div className={styles.bookImageContainer}>
                    <img src={book.image} alt={book.title} className={styles.bookImage} />
                  </div>

                  <div className={styles.bookDetails}>
                    <p className={styles.bookPrice}>{book.price}</p>
                    <h3 className={styles.bookTitle}>{book.title}</h3>
                    <p className={styles.bookAuthor}>{book.author}</p>
                    
                  </div>

                </div>
              ))
            ) : (
              <p>No books available.</p>
            )}
          </div>

          {/* Pagination Buttons */}
          <div className={styles.pagination}>
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
