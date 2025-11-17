"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import styles from "./Book.module.css";
import { useParams, useRouter } from "next/navigation";

const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002";

interface Book {
  _id: string;
  title: string;
  author: string;
  image: string;
  description: string;
  price: number;
  bookBoundLink?: string;
}

const BookPage = () => {
  const { bookid } = useParams();
  const router = useRouter();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchased, setPurchased] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const storedUserEmail = localStorage.getItem("userEmail");
    console.log("Retrieved userEmail from localStorage:", storedUserEmail);
    if (storedUserEmail) setUserEmail(storedUserEmail);
  }, []);

  // Fetch book details
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`${apiURL}/api/books/${bookid}`);
        const data = await response.json();
        if (response.ok) setBook(data);
        else setError(data.message || "Failed to fetch book details");
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Network error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [bookid]);

  // Check if user already purchased this book
  useEffect(() => {
    if (!userEmail || !bookid) return;

    const checkPurchase = async () => {
      try {
        const response = await fetch(`${apiURL}/api/purchase/check`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userEmail, bookId: bookid }),
        });
        const data = await response.json();
        if (data.purchased) setPurchased(true);
      } catch (error) {
        console.error("Error checking purchase:", error);
      }
    };

    checkPurchase();
  }, [userEmail, bookid]);

  // Handle Buy Now → Redirect to Bank
  const handleBuyBook = async () => {
    if (!userEmail) {
      alert("Please log in first.");
      return;
    }

    if (!book) {
      alert("Book information not available.");
      return;
    }

    try {
      const res = await fetch(`${apiURL}/api/purchase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          items: [
            {
              bookId: book._id,
              price: book.price
            }
          ]
        }),
      });

      const data = await res.json();

      if (res.ok && data.redirectURL) {
        window.location.href = data.redirectURL; // redirect to bank
      } else {
        alert(data.message || "Failed to initiate purchase.");
      }
    } catch (error) {
      console.error("Buy Now Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };


  // Add to cart (unchanged)
  const handleAddToCart = async () => {
    if (!userEmail) {
      alert("Please log in first.");
      return;
    }

    try {
      const response = await fetch(`${apiURL}/api/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          bookId: bookid,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Book added to cart!");
      } else {
        alert(data.message || "Failed to add book to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  // UI Rendering
  if (loading)
    return (
      <div className={styles.main}>
        <Navbar />
        <div className={styles.loading}>Loading book details...</div>
      </div>
    );

  if (!book)
    return (
      <div className={styles.main}>
        <Navbar />
        <div className={styles.error}>Book not found.</div>
      </div>
    );

  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src={book.image} alt={book.title} className={styles.bookImage} />
        </div>

        <div className={styles.details}>
          <h1 className={styles.bookTitle}>{book.title}</h1>
          <p className={styles.bookAuthor}>by {book.author}</p>

          <div
            className={styles.bookDescription}
            dangerouslySetInnerHTML={{ __html: book.description }}
          ></div>

          <p className={styles.bookPrice}>Price: {book.price} Tk</p>

          {purchased ? (
            <button
              className={styles.readButton}
              onClick={() =>
                book.bookBoundLink
                  ? window.open(book.bookBoundLink, "_blank")
                  : alert("No book link available.")
              }
            >
              Read Now
            </button>
          ) : (
            <button className={styles.buyButton} onClick={handleBuyBook}>
              Buy This Book
            </button>
          )}

          {!purchased && (
            <button className={styles.cartButton} onClick={handleAddToCart}>
              🛒 Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookPage;
