import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Produit",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      description: "Le titre du produit.",
    }),
    defineField({
      name: "pictures",
      title: "Photos",
      type: "array",
      of: [{ type: "image" }],
      description: "1 à 3 photos du produit.",
    }),
    defineField({
      name: "piecesPerCarton",
      title: "Pièces par carton",
      type: "number",
      description: "La quantité de pièces par carton.",
    }),
    defineField({
      name: "cartonsPerPalette",
      title: "Cartons par palette",
      type: "number",
      description: "La quantité de cartons par palette.",
    }),
    defineField({
      name: "pricePerCarton",
      title: "Prix par carton",
      type: "number",
      description: "Le prix du produit par carton.",
    }),
    defineField({
      name: "pricePerPiece",
      title: "Prix ​​par pièce",
      type: "number",
      description: "Le prix du produit par pièce.",
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Alimentation", value: "alimentation" },
          { title: "Boissons", value: "boissons" },
          { title: "Emballage", value: "emballage" },
        ],
      },
      description: "La catégorie du produit.",
    }),
    defineField({
      name: "DLUO",
      title: "DLUO",
      type: "date",
      description: "Date limite d'utilisation optimale (Expiry Date).",
    }),
  ],
});
