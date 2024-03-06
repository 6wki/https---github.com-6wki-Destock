"use client";

import groq from "groq";
import { Suspense, useEffect, useState } from "react";
import styles from "./category.module.css";
import { client } from "@/../sanity/lib/client";
import Product from "@/components/product/Product";
import { notFound, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import warehouse from "@/../public/categoryBanner.jpg";
import Loading from "@/app/loading";
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
  const path = usePathname();

  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "10"; // Adjust the default per_page value

  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [category, setCategory] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    function getCategoryFromPath(path: string | null) {
      const parts = path!.split("/");
      const category = parts[parts.length - 1];
      return category || null;
    }

    setCategory(getCategoryFromPath(path));
    setError(null); // Reset error state before fetching data

    const fetchProducts = async () => {
      setLoading(true);

      try {
        const start = (Number(page) - 1) * Number(per_page);
        const end = start + Number(per_page);

        const query = groq`*[_type == "product" && category == $category] | order(publishedAt desc)[${start}..${
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

        const countQuery = groq`count(*[_type == "product" && category == $category])`;

        const data: Product[] = await client.fetch(
          query,
          { category },
          { cache: "no-store" }
        );

        const countResult: number = await client.fetch(countQuery, {
          category,
        });

        setProducts(data);
        setTotalPages(Math.ceil(countResult / Number(per_page)));
      } catch (error) {
        setError("Error fetching products. Please try again later."); // Set error message
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProducts();
    }
  }, [category, page, per_page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    router.push(`/products/${category}?page=${value}`);
  };

  return (
    <div className={styles.container}>
      {/* {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div> // Render error message if there's an error
      ) : ( */}
      {/* <Suspense fallback={<Loading />}> */}
      {products.length > 0 ? (
        <>
          <div className={styles.banner}>
            <img src={warehouse.src} alt="warehouse" />
            <div className={styles.title}>
              <h1 style={{ textTransform: "capitalize" }}>{category}</h1>
              <p>
                <b style={{ textTransform: "capitalize" }}>{`home >`} </b>{" "}
                <span style={{ textTransform: "capitalize" }}>{category}</span>
              </p>
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
      ) : (
        <EmptyState />
      )}
      {/* </Suspensse> */}
      {/* )} */}
    </div>
  );
}
