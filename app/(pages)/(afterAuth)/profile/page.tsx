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
  const [purchaseHistory, setPurchaseHistory] = useState<Purchase[]>([]);
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
        // Fetch purchased books
        const resBooks = await fetch(`${apiURL}/api/purchase/checkForAUser`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const dataBooks = await resBooks.json();
        if (!resBooks.ok) throw new Error(dataBooks.message || "Failed to fetch books");

        setUserData(dataBooks.user);
        setBooks(dataBooks.books || []);

        // Fetch purchase history
        const resHistory = await fetch(`${apiURL}/api/purchase/history`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const dataHistory = await resHistory.json();
        if (!resHistory.ok) throw new Error(dataHistory.message || "Failed to fetch purchase history");

        setPurchaseHistory(dataHistory.purchases || []);

      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail"); 
    router.push("/"); 
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

      {/* Purchased Books Section */}
      <div className={styles.booksSection}>
        <h3>My Purchased Books</h3>
        {books.length > 0 ? (
          <div className={styles.booksGrid}>
            {books.map((book) => (
              <div key={book._id} className={styles.bookCard} onClick={() => router.push(`book/${book._id}`)}>
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

      {/* Purchase History Section */}
      <div className={styles.purchaseHistorySection}>
        <h3>Purchase History</h3>
        {purchaseHistory.length > 0 ? (
          <table className={styles.historyTable}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Number of Books</th>
                <th>Books</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {purchaseHistory.map((purchase) => (
                <tr key={purchase._id}>
                  <td>{new Date(purchase.createdAt).toLocaleDateString()}</td>
                  <td>{purchase.books.length}</td>
                  <td>{purchase.books.map(book => book.title).join(", ")}</td>
                  <td>${purchase.priceAtPurchase.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.noBooks}>No purchase history available.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
