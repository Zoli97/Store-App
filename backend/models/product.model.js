import mongoose from "mongoose";

//create a schema, each product is going to have a name, a price
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//create product model
const Product = mongoose.model("Product", productSchema);
export default Product;
