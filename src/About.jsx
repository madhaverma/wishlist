 import styles from './about.module.css';
import { Link } from "react-router-dom";

 
  function About() {
  return (
    <section className={styles.hero}>
      <h1>
        Your Digital Sanctuary <br />
        <span>for Ideas</span>
      </h1>

      <p className={styles.subtitle}>
        BrainBox is the simplest place to save and organize the movies you want
        to watch, books you want to read, and articles that inspire you.
      </p>

        <Link to="/Create" className={styles.ctabtn}>Create Your First Board</Link>

      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={`${styles.icon} ${styles.orange}`}>🎬</div>
          <h3>Movies</h3>
          <p>
            Curate your dream watchlist and keep track of cinematic gems you've
            discovered.
          </p>
        </div>

        <div className={styles.card}>
          <div className={`${styles.icon} ${styles.blue}`}>📘</div>
          <h3>Books</h3>
          <p>
            Organize your reading list and store quotes that moved you from
            every chapter.
          </p>
        </div>

        <div className={styles.card}>
          
           <div className={`${styles.icon} ${styles.green}`}>📰</div>
          <h3>Articles</h3>
          <p>
            Save web clips, long-reads, and daily inspiration to read later on
            any device.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
