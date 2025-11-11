"use client";
import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002";

const Profile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      setError("No user logged in.");
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const res = await fetch(`${apiURL}/api/users/${email}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setUserData(data.user);
        setBooks(data.purchasedBooks || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail"); // clear user session
    router.push("/"); // redirect to login page
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <Navbar />

      <div className={styles.profileCard}>
        <h2 className={styles.heading}>User Profile</h2>
        <div className={styles.details}>
          <p><strong>Name:</strong> {userData?.name}</p>
          <p><strong>Email:</strong> {userData?.email}</p>
        </div>
        <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
      </div>

      <div className={styles.booksSection}>
        <h3>Your Purchased Books</h3>
        {books.length > 0 ? (
          <div className={styles.booksGrid}>
            {books.map((book) => (
              <div key={book._id} className={styles.bookCard}>
                <img src={book.image} alt={book.title} className={styles.bookImage} />
                <h4>{book.title}</h4>
                <p>{book.author}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.noBooks}>You haven't purchased any books yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
