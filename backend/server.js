import express from "express";
import dotenv from "dotenv";
import path, { resolve } from "path";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";
dotenv.config();
const app = express();
const PORT = 5000;

//config for deploy
const __dirname = path.resolve();
app.use(express.json());
app.use("/api/products", productRoutes);

//check for env, make the dist folder static assets.

app.use(express.static(path.join(__dirname, "dist")));
app.get("/", (req, resp) => {
  resp.sendFile(path.join(__dirname, "dist/index.html"));
});
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
