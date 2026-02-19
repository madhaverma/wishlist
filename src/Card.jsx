import styles from "./gallery.module.css";
function Card (){

    return <div  className ={styles.events-containers}>
        <div className={styles.event-card}>
            <h2>joshua Tree Desert Retreat</h2>
            <p className={styles.distance}> 82 Miles away </p>
            <p className={styles.data}> oct 22 - 27</p>

            <div className={styles.image-url}>
                <span> Image Url </span>
                <p>https://images.unsplash.com/photo-joshua-tree-modern-cabin</p>
            </div>
        </div> 

    </div>
}

export default Card;