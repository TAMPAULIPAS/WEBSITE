import AddToCart from "@/components/AddToCart/AddToCart";
import styles from "./page.module.css";
const page = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();

  return (
    <div className={styles.container}>
      <p>{id}</p>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <AddToCart product={product}/>
    </div>
  );
};

export default page;
