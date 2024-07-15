/** @format */

const authController = require("../controller/auth.controller");
const express = require("express");
const authRouter = express.Router();
const {
  authMiddleware,
  authUserMiddleWare,
} = require("../middleware/auth.middleware");

authRouter.post("/sign-in", authController.signIn);
authRouter.post("/sign-up", authController.signUp);
authRouter.put(
  "/update-user/:id",
  authUserMiddleWare,
  authController.updateUser
);
authRouter.delete(
  "/delete-user/:id",
  authMiddleware,
  authController.deleteUser
);
authRouter.get("/get-all-user", authMiddleware, authController.getAllUser);
authRouter.get(
  "/get-detail-user/:id",
  authUserMiddleWare,
  authController.getDetailUser
);


module.exports = authRouter;
