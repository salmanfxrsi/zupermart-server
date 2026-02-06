import { Schema, model } from "mongoose";
import { ICategory } from "../types/category.types";

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: ["MEN", "WOMEN", "UNISEX"],
      required: true,
    },
    season: {
      type: String,
      enum: ["SUMMER", "WINTER", "ALL"],
      required: true,
    },
  },
  { timestamps: true },
);

// Prevent duplicate same category combos
categorySchema.index({ name: 1, gender: 1, season: 1 }, { unique: true });

export const Category = model<ICategory>("Category", categorySchema);
