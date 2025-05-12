"use client";

import { useState, useEffect } from "react";
import styles from "./AddToCart.module.css";

function AddToCart({ product }) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    const index = stored.findIndex((item) => item.product.id === product.id);
    if (index > -1) {
      setAdded(true);
    }
  }, [product.id]);

  const handleAddCart = () => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    const index = stored.findIndex((item) => item.product.id === product.id);

    if (index > -1) {
      stored[index].count++;
    } else {
      stored.push({ product, count: 1 });
    }

    localStorage.setItem("products", JSON.stringify(stored));
    setAdded(true);
  };

  const handleRemoveCart = () => {
    let stored = JSON.parse(localStorage.getItem("products")) || [];
    stored = stored.filter((item) => item.product.id !== product.id);

    localStorage.setItem("products", JSON.stringify(stored));
    setAdded(false);
  };

  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.title} className={styles.image} />
      <h2 className={styles.title}>{product.title}</h2>
      <button
        className={`${styles.button} ${added ? styles.added : ""}`}
        onClick={added ? handleRemoveCart : handleAddCart}
      >
        {added ? "წაშლა კალათიდან" : "კალათაში დამატება"}
      </button>
    </div>
  );
}

export default AddToCart;
