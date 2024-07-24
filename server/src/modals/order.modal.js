/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    orderItems: {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
    },
    shippingAddress: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: Number, required: true },
    },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: false },
    totalPrice: { type: Number, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    isPaid: { type: Boolean, default: false }, //Đã thanh toán chưa
    paidAt: { type: Date }, //ngày thanh toán
    isDelivered: { type: Boolean, default: false }, //Đã giao hàng
    deliveredAt: { type: Date }, //Ngày giao hàng
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("orders", OrderSchema);
