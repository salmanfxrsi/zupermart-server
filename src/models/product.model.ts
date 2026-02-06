import { Schema, model } from "mongoose";
import { IProduct } from "../types/product.types";

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },

    price: { type: Number, required: true },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    sizes: [
      {
        size: { type: Schema.Types.Mixed, required: true },
        stock: { type: Number, required: true, min: 0 },
      },
    ],

    images: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Product = model<IProduct>("Product", productSchema);
