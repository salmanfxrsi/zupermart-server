import { Request, Response } from "express";
import { Product } from "../models/product.model";
import { Category } from "../models/category.model";

// CREATE
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// GET ALL 
export const getProducts = async (req: Request, res: Response) => {
  try {
    const {
      search,
      minPrice,
      maxPrice,
      category,
      gender,
      season,
      size,
      inStock,
    } = req.query;

    const filter: any = { isActive: true };

    // Price filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Size filter
    if (size) {
      filter.sizes = { $elemMatch: { size } };
    }

    // In stock filter
    if (inStock === "true") {
      filter.sizes = { $elemMatch: { stock: { $gt: 0 } } };
    }

    // Category / Gender / Season filter
    if (category || gender || season) {
      const catFilter: any = {};
      if (category) catFilter.name = category;
      if (gender) catFilter.gender = gender;
      if (season) catFilter.season = season;

      const categories = await Category.find(catFilter).select("_id");
      filter.category = { $in: categories.map((c) => c._id) };
    }

    // Search filter
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const products = await Product.find(filter)
      .populate("category")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET ONE
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE ONE
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("category");

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE ONE
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product permanently deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
