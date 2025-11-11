# 📚 BookBound — eBook Reader Frontend (Next.js)

**BookBound** is a modern and elegant eBook reader platform built using **Next.js 14+**.  
It allows users to explore, search, and read books online with a clean interface and smooth animations.

---

## 🚀 Features

- 🔍 **Search Books** by title, author, or category  
- 🧾 **View Details** — see summaries, authors, and prices  
- 🛒 **Add to Cart** and view total prices  
- 📖 **Read Books Online** directly on the platform  
- 🎨 Beautiful design with smooth animations and responsive layout  

---

## ⚙️ Prerequisites

Before running this frontend, make sure you have the backend set up and running.

👉 **Backend Repository:**  
[BookBound Backend (Node.js + Express + MongoDB)](https://github.com/RAISA-MUKARRAMA/BookBound_ebook_reader_backend)

---

## 🧩 Backend Setup (Required)

1. Clone the backend repo:
   ```bash
   git clone https://github.com/RAISA-MUKARRAMA/BookBound_ebook_reader_backend.git
   cd BookBound_ebook_reader_backend
2. Install dependencies:
   ```bash
    npm install
3. Create a .env file in the backend root folder and include your environment variables (example):
   ```bash
   MONGO_URI=your_mongodb_connection_string
   PORT=5002
4. Start the backend server:
   ```bash
   npm start

---

## 💻 Frontend Setup (Next.js)

1. Clone the frontend repo:
   ```bash
   git clone https://github.com/RAISA-MUKARRAMA/BookBound_ebook_reader_frontend.git
   cd BookBound_ebook_reader_frontend
2. Install dependencies:
   ```bash
   npm install
3. Create a .env.local file (since it’s ignored by Git):
   ```bash
   touch .env.local
4. Open .env.local and add this line:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:5002
Make sure this matches your backend server URL.

5. Run the development server:
  ```bash
  npm run dev
   ```

6. Open your browser and visit: http://localhost:3002 or the port you set up

🎉 The BookBound website should now be live locally!
