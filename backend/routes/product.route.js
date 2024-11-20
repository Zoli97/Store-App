import express from "express";

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controller/product.controller.js";
const router = express.Router();

//GET all products -> give me all the products from the db
router.get("/", getAllProducts);

//POST product -> when ever i create product (send some data along with the request)
router.post("/", createProduct);

//PUT -> UPDATE a product
router.put("/:id", updateProduct);

//DELETE product
router.delete("/:id", deleteProduct);
export default router;
