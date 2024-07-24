/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    type: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true }, //số lượng sản phẩm trong kho
    rating: { type: Number, required: true },
    description: { type: String },
    selled: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("products", ProductSchema);
