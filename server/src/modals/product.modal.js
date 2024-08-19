/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    type: { type: String, required: true },
    brand: { type: String, required: true }, //Hãng điện thoại
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true }, //số lượng sản phẩm trong kho
    description: { type: String },
    configuration: {
      screen: { type: String, required: true },
      system: { type: String, required: true },
      frontCamera: { type: String },
      rearCamera: { type: String, required: true },
      chip: { type: String, required: true },
      ram: { type: String, required: true },
      rom: { type: String, required: true },
      sim: { type: String, required: true },
      battery: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("products", ProductSchema);
