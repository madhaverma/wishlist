import { useState } from "react";
import styles from "./gallery.module.css";

const Card = ({ item, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(item.title || "");
  const [description, setDescription] = useState(item.description || "");
  const [url, setUrl] = useState(item.url || "");
  const [loading, setLoading] = useState(false);

  const saveChanges = async () => {
    setLoading(true);
    const updated = await onUpdate(item._id || item.id, { title, description, url });
    if (updated) {
      setIsEditing(false);
    }
    setLoading(false);
  };

  const deleteItem = async () => {
    setLoading(true);
    await onDelete(item._id || item.id);
    setLoading(false);
  };

  return (
    <div className={styles.eventCard}>
      {isEditing ? (
        <>
          <input
            className={styles.editInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <input
            className={styles.editInput}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <input
            className={styles.editInput}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL"
          />
        </>
      ) : (
        <>
          <h2>{item.title}</h2>
          <p className={styles.discription}>{item.description}</p>
          {item.url ? (
            <div className={styles.imageUrl}>
              <span>Image URL</span>
              <p>{item.url}</p>
            </div>
          ) : null}
        </>
      )}

      <div className={styles.actions}>
        {isEditing ? (
          <button className={styles.primaryBtn} disabled={loading} onClick={saveChanges}>
            Save
          </button>
        ) : (
          <button className={styles.primaryBtn} onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
        <button className={styles.dangerBtn} disabled={loading} onClick={deleteItem}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
