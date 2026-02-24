import { useEffect, useState } from "react";
import styles from "./gallery.module.css";
import Card from "./Card";
import API from "./api";

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDbData = async () => {
    try {
      const response = await API.get("/wishlist");
      setItems(response.data || []);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to fetch wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDbData();
  }, []);

  const handleUpdate = async (id, payload) => {
    try {
      const response = await API.put(`/wishlist/${id}`, payload);
      const updated = response.data;
      setItems((prev) =>
        prev.map((item) => ((item._id || item.id) === id ? updated : item))
      );
      return true;
    } catch (err) {
      alert(err?.response?.data?.message || "Update failed");
      return false;
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/wishlist/${id}`);
      setItems((prev) => prev.filter((item) => (item._id || item.id) !== id));
    } catch (err) {
      alert(err?.response?.data?.message || "Delete failed");
    }
  };

  if (loading) return <div>Loading...</div>;

  if (items.length === 0) return <div className={styles.Container}>No items found.</div>;

  return (
    <div className={styles.Container}>
      <div className={styles.eventsContainer}>
        {items.map((item) => (
          <Card
            key={item._id || item.id}
            item={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
