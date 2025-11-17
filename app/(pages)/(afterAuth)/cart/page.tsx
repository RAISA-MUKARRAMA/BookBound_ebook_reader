"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import styles from "./Cart.module.css";
import { useRouter } from "next/navigation";
import { MdDeleteOutline } from "react-icons/md";

const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002";

interface CartItem {
  bookId: string;
  title: string;
  author: string;
  price: number;
  image: string;
}

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("test@example.com"); // replace with real logged-in user email
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user's cart
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }

    const checkIfPurchased = async (email: string, bookId: string) => {
      const res = await fetch(`${apiURL}/api/purchase/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, bookId }),
      });
      const data = await res.json();
      return data.purchased;
    };



    const fetchCart = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${apiURL}/api/cart/${email}`);
        const data = await res.json();

        if (!data.success) {
          setError(data.message || "Failed to fetch cart.");
          return;
        }

        const filtered = [];
        for (let item of data.items) {
          const purchased = await checkIfPurchased(email, item.bookId);
          if (!purchased) filtered.push(item);
        }

        setItems(filtered);

      } catch (err) {
        console.error("Fetch cart error:", err);
        setError("Network error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
        fetchCart();
      }, [email]);

  // Remove an item from cart
  const removeFromCart = async (bookId: string) => {
    try {
      const res = await fetch(`${apiURL}/api/cart/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, bookId }),
      });
      const data = await res.json();
      if (data.success) {
        setItems(items.filter((item) => item.bookId !== bookId));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Remove from cart error:", error);
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const response = await fetch(`${apiURL}/api/purchase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          items: items.map(item => ({
            bookId: item.bookId,
            price: item.price
          }))
        }),
      });

      const data = await response.json();

      if (response.ok && data.redirectURL) {
        router.push(data.redirectURL);
      } else {
        alert(data.message || "Checkout failed.");
      }

    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong. Try again.");
    }
  };



  // Calculate total price
  const totalPrice = items.reduce((sum, item) => sum + (item.price || 0), 0);

  if (loading) return <p className={styles.loading}>Loading cart...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.container}>
        <h1>Your Cart</h1>

        {items.length === 0 ? (
          <p className={styles.empty}>Your cart is empty 🛒</p>
        ) : (
          <>
            <div className={styles.cartItems}>
              {items.map((item) => (
                <div key={item.bookId} className={styles.cartItem}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.bookImage}
                    onClick={() => router.push(`/book/${item.bookId}`)}
                  />
                  <div className={styles.details}>
                    <h3>{item.title}</h3>
                    <p>{item.author}</p>
                    <p className={styles.price}>${item.price.toFixed(2)}</p>
                  </div>
                  <MdDeleteOutline
                    className={styles.deleteIcon}
                    onClick={() => removeFromCart(item.bookId)}
                  />
                </div>
              ))}
            </div>

            <div className={styles.summary}>
              <h2>Order Summary</h2>
              <p>Total items: {items.length}</p>
              <p className={styles.total}>Total Price: ${totalPrice.toFixed(2)}</p>
              <button className={styles.checkoutBtn} onClick={handleCheckout}>Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
