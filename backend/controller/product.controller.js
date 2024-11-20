import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getAllProducts = async (req, resp) => {
  //find all the products that i have in db
  //{} empty obj in find it means fetch all the products

  try {
    const products = await Product.find({});
    resp.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error in fetching products", error.message);
    resp.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createProduct = async (req, resp) => {
  //get the product from body (the user will send the data)
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return resp
      .status(404)
      .json({ success: false, message: "Please provide all fields" });
  }

  const new_product = new Product(product);

  try {
    await new_product.save();
    resp.status(201).json({ success: true, data: new_product });
  } catch (error) {
    console.error(`Error in Create product: ${error.message}`);
    resp.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update the product !" });
  }
};

export const deleteProduct = async (req, resp) => {
  //get the id from url
  const { id } = req.params;

  //if its not a valid id that user is sending
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return resp
      .status(404)
      .json({ success: false, message: "Invalid Product id" });
  }
  try {
    await Product.findByIdAndDelete(id);
    resp.status(200).json({ success: true, message: "Product deleted !" });
  } catch (error) {
    resp.status(404).json({ success: false, message: "Product not found !" });
  }
  console.log(id);
};
