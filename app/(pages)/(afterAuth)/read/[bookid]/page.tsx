// app/read/[bookid]/page.tsx
"use client"
import React, { useEffect, useState } from 'react'
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";
import styles from './page.module.css';
import { useParams } from 'next/navigation';

const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002';

interface Book {
  _id: string;
  pdf: string;
  title: string;
  author: string;
}

const Page = () => {
  const { bookid } = useParams();
  
  console.log('=== PDF READER COMPONENT MOUNTED ===');
  console.log('Book ID from params:', bookid);
  console.log('API URL:', apiURL);

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('useEffect triggered, bookid:', bookid);
    
    const fetchBook = async () => {
      console.log('Starting fetch...');
      setLoading(true);
      setError(null);
      try {
        const url = `${apiURL}/api/books/${bookid}`;
        console.log('Fetching from:', url);
        
        const res = await fetch(url);
        console.log('Response status:', res.status);
        
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        
        const data: Book = await res.json();
        console.log('Book data received:', data);

        // Construct PDF URL
        let pdfPath = data.pdf;
        pdfPath = pdfPath.replace(/^[\\/]+/, '');
        pdfPath = pdfPath.replace(/\\/g, '/');
        const fullPdfUrl = `${apiURL}/${pdfPath}`;
        
        console.log('Final PDF URL:', fullPdfUrl);
        setPdfUrl(fullPdfUrl);
        
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch book: ' + (err as Error).message);
      } finally {
        setLoading(false);
        console.log('Loading set to false');
      }
    };

    if (bookid) {
      fetchBook();
    } else {
      console.log('No bookid found');
      setError('No book ID provided');
      setLoading(false);
    }
  }, [bookid]);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  console.log('Current state - loading:', loading, 'error:', error, 'pdfUrl:', pdfUrl);

  // if (loading) {
  //   console.log('Rendering loading state');
  //   return (
  //     <div className={styles.main}>
  //       <Navbar />
  //       <div className={styles.container}>
  //         <p>Loading PDF...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   console.log('Rendering error state:', error);
  //   return (
  //     <div className={styles.main}>
  //       <Navbar />
  //       <div className={styles.container}>
  //         <p>Error: {error}</p>
  //       </div>
  //     </div>
  //   );
  // }

  // console.log('Rendering PDF viewer');

  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.viewer}>
          {pdfUrl ? (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js">
              <Viewer
                fileUrl={pdfUrl}
                plugins={[defaultLayoutPluginInstance]}
                theme="dark"
              />
            </Worker>
          ) : (
            <p>No PDF URL available</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Page