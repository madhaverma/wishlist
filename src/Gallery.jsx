import styles from "./gallery.module.css";

function Gallery() {
  return (
    <div className={styles.Container}> 
    <div className={styles.eventsContainer}>
      <div className={styles.eventCard}>
        <h2>Joshua Tree Desert Retreat</h2>

        <p className={styles.distance}>82 Miles away</p>
        <p className={styles.date}>Oct 22 - 27</p>

        <div className={styles.imageUrl}>
          <span>Image URL</span>
          <p>https://images.unsplash.com/photo-joshua-tree-modern-cabin</p>
        </div>
      </div>
</div>
</div>

  );
}

export default Gallery;

