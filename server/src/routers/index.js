/** @format */

const authRouter = require("./auth");
const productRouter = require("./products");
const orderRouter = require("./order");

const routers = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/products", productRouter);
  app.use("/api/order", orderRouter);
};

module.exports = routers;
