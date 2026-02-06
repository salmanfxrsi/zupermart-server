import { Request, Response } from "express";
import { Category } from "../models/category.model";

/**
 * Create Category
 */
export const createCategory = async (req: Request, res: Response) => {
  const category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    data: category,
  });
};

/**
 * Get All Categories
 */
export const getCategories = async (_req: Request, res: Response) => {
  const categories = await Category.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: categories,
  });
};

/**
 * Get Single Category
 */
export const getCategoryById = async (req: Request, res: Response) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  res.status(200).json({
    success: true,
    data: category,
  });
};

/**
 * Update Category
 */
export const updateCategory = async (req: Request, res: Response) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  res.status(200).json({
    success: true,
    data: category,
  });
};

/**
 * Delete Category
 */
export const deleteCategory = async (req: Request, res: Response) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
};
