const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const Product = require("./Models/ProductModel");

const uri = "mongodb://127.0.0.1:27017/mydb";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
mongoose
  .connect(uri)
  .then(() => console.log("DB connected successfully!"))
  .catch((err) => console.log("ERROR😒", err));

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      status: "success",
      data: products,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});
app.post("/api/products", async (req, res) => {
  try {
    const products = await Product.create(req.body);
    // console.log(req.body)
    res.status(201).json({
      status: "success",
      data: products,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

app.patch("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      message: "updated successfully!",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Deleted successfully!",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});
const port = 8000;
app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
// console.log(process.env.NODE_ENV)
