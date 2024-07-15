/** @format */

const express = require("express");
const productRouter = express.Router();
const productController = require("../controller/product.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

productRouter.post("/create", authMiddleware, productController.createProduct);
productRouter.put(
  "/update-product/:id",
  authMiddleware,
  productController.updateProduct
);
productRouter.delete(
  "/delete-product/:id",
  authMiddleware,
  productController.deleteProduct
);
productRouter.get("/get-product", productController.getAllProduct);
productRouter.get(
  "/get-detail-product/:id",
  productController.getDettailProduct
);
productRouter.get("/get-type-product", productController.getTypeProduct);
productRouter.get("/get-brand-product", productController.getBrandProduct);

module.exports = productRouter;
