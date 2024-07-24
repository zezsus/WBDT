/** @format */

const authRouter = require("./auth");
const productRouter = require("./products");
const orderRouter = require("./order");
const cartRouter = require("./cart");

const routers = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/products", productRouter);
  app.use("/api/orders", orderRouter);
  app.use("/api/carts", cartRouter);
};

module.exports = routers;
