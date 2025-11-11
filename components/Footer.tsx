"use client";
import React from "react";
import styles from "./Footer.module.css";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>

        {/* Left: Logo and tagline */}
        <div className={styles.logoSection}>
          <h2 className={styles.logo}>BookBound</h2>
          <p className={styles.tagline}>
            Escape into stories. Explore ideas. Enrich your mind.
          </p>
        </div>

        {/* Center: Links */}
        <div className={styles.linksSection}>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/books">Books</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Right: Socials */}
        <div className={styles.socialSection}>
          <h3>Follow Us</h3>
          <div className={styles.socialIcons}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin /></a>
          </div>
        </div>

      </div>

      <div className={styles.bottomBar}>
        <p>© {new Date().getFullYear()} <span>BookBound</span>. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
