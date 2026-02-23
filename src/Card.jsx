import { useState } from "react";
import styles from "./gallery.module.css";



const Card = ({ title, description ,url }) => {
  
  if (!title && !description && !url) return null;
    if (!data) return null;
  return(
  <div className={styles.Container}>
    <div className={styles.eventsContainer}>
      <div className={styles.eventCard}>
        <h2>{title}</h2>

        <p className={styles.discription }>{discription}</p>

        <div className={styles.imageUrl}>
          <span>Image URL</span>
          <p>{url}</p>
        </div>
      </div>
    </div>
  </div>)
}

export default Card;
