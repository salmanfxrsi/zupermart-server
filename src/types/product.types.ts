import { Types } from "mongoose";

export type SizeValue =
  | "XS"
  | "S"
  | "M"
  | "L"
  | "XL"
  | "XXL"
  | "3XL"
  | "4XL"
  | number;

export interface ISizeStock {
  size: SizeValue;
  stock: number;
}

export interface IProduct {
  name: string;
  description: string;
  price: number;
  category: Types.ObjectId;
  sizes: ISizeStock[];
  images: string[];
  isActive: boolean;
  isBestSelling: boolean;
}
