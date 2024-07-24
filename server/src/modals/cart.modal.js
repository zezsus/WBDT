/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = new Schema(
  {
    quantity: { type: Number, required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("carts", CartSchema);
