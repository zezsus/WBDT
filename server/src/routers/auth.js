/** @format */

const authController = require("../controller/auth.controller");
const express = require("express");
const authRouter = express.Router();
const {
  authMiddleware,
  authUserMiddleWare,
} = require("../middleware/auth.middleware");

authRouter.post("/sign-in", authController.SignIn);
authRouter.post("/sign-up", authController.SignUp);
authRouter.put(
  "/update-user/:id",
  authUserMiddleWare,
  authController.UpdateUser
);
authRouter.delete(
  "/delete-user/:id",
  authMiddleware,
  authController.DeleteUser
);
authRouter.get("/get-all-user", authMiddleware, authController.GetAllUser);
authRouter.get(
  "/get-detail-user/:id",
  authUserMiddleWare,
  authController.GetDetailUser
);

module.exports = authRouter;
