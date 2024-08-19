/** @format */

const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controller/order.controller");
const { authUserMiddleWare } = require("../middleware/auth.middleware");

orderRouter.post(
  "/create/:id",
  authUserMiddleWare,
  orderController.createOrder
);
orderRouter.get(
  "/get-all-order-detail/:id",
  authUserMiddleWare,
  orderController.getAllOrderDetail
);
orderRouter.get("/get-order-detail/:id", orderController.getOrderDetail);
orderRouter.get("/get-order", orderController.getAllOrder);
orderRouter.put(
  "/update-order/:id",
  authUserMiddleWare,
  orderController.updateOrder
);

orderRouter.delete(
  "/cancel-order/:id",
  authUserMiddleWare,
  orderController.cancelOrder
);

module.exports = orderRouter;
