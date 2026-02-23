import React, { useState, useEffect } from 'react';
import styles from "./gallery.module.css";
import Card from './Card';
import DeleteIcon from '@mui/icons-material/Delete';


const Gallery = () => {
  const [items, setItems] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const getDbData = async () => {
      try {
        const response = await fetch('http:/127.0.0.1:27017/wishlist');
        const data = await response.json();
        setItems(data);
      } catch (err) {
        console.error("Failed to fetch:", err);
      } finally {
        setLoading(false);
      }
    };

    getDbData();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (items.length === 0) return null;



  return (
    <div className="card-container">
      {items.map((item) => (
        <Card key={item.id} title={item.title} description={item.description}  url={item.url}/>
      ))}
       <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
export default Gallery;

