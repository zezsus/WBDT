/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      }, //số lượng sản phẩm
      image: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
});
