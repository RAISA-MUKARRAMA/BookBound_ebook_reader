"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import styles from './BookBoundLibrary.module.css'
import { FaBookOpen } from 'react-icons/fa'
import { FaChevronRight, FaChevronDown } from 'react-icons/fa6'
import { MdBook } from 'react-icons/md'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()
  const [show, setShow] = useState(false);
  const [allBooks, setAllBooks] = useState([]);

  const getData = () => {
    let temp = [
      {
        id: 1,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKi5lknrw7SIwZ01RQRqyvtXz2bFxrUsGVpA&s",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
      },
      {
        id: 2,
        image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
      },
      {
        id: 3,
        image: "https://m.media-amazon.com/images/I/61HkdyBpKOL.jpg",
        title: "1984",
        author: "George Orwell",
      },
      {
        id: 4,
        image: "https://digitalausten.org/sites/default/files/media/image/2017-10/Evensen%20Creative%20Edition%20Front.jpg",
        title: "Pride and Prejudice",
        author: "Jane Austen",
      }
    ];
    setAllBooks(temp);
  }
    
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.main}>
      <Navbar/>
      <div className={styles.row}>
          <div className={styles.left}>
            <div className={styles.menuMain}>
              <FaBookOpen className={styles.bookIcon}/>
              <p>Library</p>
              {show ? (
                <FaChevronDown
                onClick={()=> setShow(!show)}
                className={styles.toRight} />
              ) : (
                <FaChevronRight
                onClick={()=> setShow(!show)}
                className={styles.toRight} />
              )}
            </div>
            {
              show &&
              <div className={styles.menuItem}>
                <span>All Titles</span>
                <span>Books</span>
                <span>Comics</span>
                <span>Samples</span>
              </div>
                
            }

            <div className={styles.menuMain}>
              <MdBook className={styles.bookIcon2}/>
              <p>Notes & Highlights</p>
            </div>
          </div>
          <div className={styles.right}>
            <h1>Trending</h1>
            <div className={styles.books}>
              {allBooks.map((book:any) => (
                <div onClick={()=>{
                  router.push(`book/${book.id}`);
                }} key={book.id} className={styles.bookItem}>
                  <img src={book.image} alt={book.title} className={styles.bookImage}/>

                  <div className={styles.bookDetails}>
                    <h3 className={styles.bookTitle}>{book.title}</h3>
                    <p className={styles.bookAuthor}>{book.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div> 
      </div>
    </div>
  )
}

export default page
