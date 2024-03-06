"use client";
import groq from "groq";
import { useEffect, useState } from "react";
import styles from "../../app/products/[category]/category.module.css";
import { client } from "@/../sanity/lib/client";
import Product from "@/components/product/Product";
import warehouse from "@/../public/categoryBanner.jpg";
import Loading from "../../app/loading";

interface Product {
  title: string;
  pictures: string[];
  piecesPerCarton: number;
  cartonsPerPalette: number;
  pricePerCarton: number;
  pricePerPiece: number;
  category: string;
  DLUO: string;
  slug: {
    current: string;
  };
}

export default function GeneralProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    setError(null); // Reset error state before fetching data

    const fetchProducts = async () => {
      setLoading(true);

      try {
        const query = groq`*[_type == "product"] | order(publishedAt desc) [0...10] {
          title,
          pictures,
          piecesPerCarton,
          cartonsPerPalette,
          pricePerCarton,
          pricePerPiece,
          category,
          DLUO,
          "slug": slug.current
        }`;

        const data: Product[] = await client.fetch(
          query,
          {},
          { cache: "no-cache" }
        );

        setProducts(data);
      } catch (error) {
        setError("Error fetching products. Please try again later."); // Set error message
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <Loading />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className={styles.productsContainer}>
            <div className={styles.secondProductsContainer}>
              {products.length === 0 ? (
                <p>Il n'y a aucun produit disponible.</p>
              ) : (
                products.map((product: Product, index: number) => (
                  <Product product={product} key={index} />
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
