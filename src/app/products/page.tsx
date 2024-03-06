"use client";

import groq from "groq";
import { useEffect, useState } from "react";
import styles from "./[category]/category.module.css";
import { client } from "@/../sanity/lib/client";
import Product from "@/components/product/Product";
import { useRouter } from "next/navigation";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import warehouse from "@/../public/categoryBanner.jpg";
import Loading from "../loading";
import EmptyState from "@/components/emptyState/EmptyState";

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

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();

  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "10"; // Adjust the default per_page value

  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    setError(null); // Reset error state before fetching data

    const fetchProducts = async () => {
      setLoading(true);

      try {
        const start = (Number(page) - 1) * Number(per_page);
        const end = start + Number(per_page);

        const query = groq`*[_type == "product"] | order(publishedAt desc)[${start}..${
          end - 1
        }] {
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

        const countQuery = groq`count(*[_type == "product"])`;

        const data: Product[] = await client.fetch(
          query,
          {},
          { cache: "no-cache" }
        );

        const countResult: number = await client.fetch(countQuery);

        setProducts(data);
        setTotalPages(Math.ceil(countResult / Number(per_page)));
      } catch (error) {
        setError("Error fetching products. Please try again later."); // Set error message
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, per_page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    router.push(`/products?page=${value}`);
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <Loading />
      ) : products.length === 0 ? (
        <EmptyState />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className={styles.banner}>
            <img src={warehouse.src} alt="warehouse" />
            <div className={styles.title}>
              <h1>Tous les produits</h1>
            </div>
          </div>
          <div className={styles.productsContainer}>
            <div className={styles.secondProductsContainer}>
              {products.map((product: Product, index: number) => (
                <Product product={product} key={index} />
              ))}
            </div>
          </div>
          <div className={styles.pagination}>
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={Number(page)}
                onChange={handlePageChange}
              />
            </Stack>
          </div>
        </>
      )}
    </div>
  );
}
