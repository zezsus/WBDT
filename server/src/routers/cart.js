/** @format */

const express = require("express");
const cartRouter = express.Router();
const cartController = require("../controller/cart.controller");
const { authUserMiddleWare } = require("../middleware/auth.middleware");

cartRouter.post("/create/:id", authUserMiddleWare, cartController.createCart);
cartRouter.put("/delete/:id", authUserMiddleWare, cartController.deleteCart);
cartRouter.get("/get-cart/:id", cartController.getAllCart);

module.exports = cartRouter;
