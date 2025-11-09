"use client"
import React from 'react'
import Navbar from '@/components/Navbar'
import styles from './Book.module.css'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'

const page = () => {
    const { bookid } = useParams();
    const router = useRouter();

    const book = {
        id: bookid,
        title: "Sample Book Title",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg",
        author: "Sample Author",
        description: `<p>
        <strong>To Kill a Mockingbird</strong> is a 1960 Southern Gothic novel by American author Harper Lee.
        It became instantly successful after its release; in the United States, it is widely read in high schools and
        middle schools. The novel won the Pulitzer Prize a year after its release, and it has become a classic of
        modern American literature. The plot and characters are loosely based on Lee's observations of her family,
        her neighbors and an event that occurred near her hometown of Monroeville, Alabama, in 1936, when she was ten.
      </p>

      <p>
        Despite dealing with the serious issues of rape and racial inequality, the novel is renowned for its warmth
        and humor. Atticus Finch, the narrator's father, has served as a moral hero for many readers and as a model
        of integrity for lawyers. Historian Joseph Crespino explains that in the twentieth century,
        <em>To Kill a Mockingbird</em> is probably the most widely read book dealing with race in America, and its
        main character, Atticus Finch, the most enduring fictional image of racial heroism.
      </p>

      <p>
        As a Southern Gothic novel and Bildungsroman, the primary themes of <em>To Kill a Mockingbird</em> involve
        racial injustice and the destruction of innocence. Scholars have noted that Lee also addresses issues of class,
        courage, compassion, and gender roles in the Deep South. Lessons from the book emphasize tolerance and decry
        prejudice. Despite its themes, the novel has been subject to campaigns for removal from public classrooms,
        often challenged for its use of racial epithets. In 2006, British librarians ranked the book ahead of the
        Bible as one "every adult should read before they die".
      </p>`,
        price: "$9.99",
        link: "https://www.amazon.com/dp/B08N5WRWNW",
    }

  return (
    <div className={styles.main}>
        <Navbar/>
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <img src={book.image} alt={book.title} className={styles.bookImage}/>
            </div>

            <div className={styles.details}>
                <h1 className={styles.bookTitle}>{book.title}</h1>
                <p className={styles.bookAuthor}>by {book.author}</p>
                <div
                    className={styles.bookDescription}
                    dangerouslySetInnerHTML={{ __html: book.description }}
                ></div>
                <p className={styles.bookPrice}>Price: {book.price}</p>

                <button className={styles.readButton}
                    onClick={() => window.open(book.link, '_blank')}
                >
                    Read Now
                </button>
                
            </div>
        </div>
    </div>
  )
}

export default page
