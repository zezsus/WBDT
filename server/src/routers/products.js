/** @format */

const express = require("express");
const productRouter = express.Router();
const productController = require("../controller/product.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

productRouter.post("/create", authMiddleware, productController.CreateProduct);
productRouter.put(
  "/update-product/:id",
  authMiddleware,
  productController.UpdateProduct
);
productRouter.delete(
  "/delete-product/:id",
  authMiddleware,
  productController.DeleteProduct
);
productRouter.get("/get-product", productController.GetAllProduct);
productRouter.get(
  "/get-detail-product/:id",
  productController.GetDettailProduct
);

module.exports = productRouter;
