/** @format */

const authController = require("../controller/auth.controller");
const express = require("express");
const authRouter = express.Router();

authRouter.post("/sign-in", authController.SignIn);
authRouter.post("/sign-up", authController.SignUp);
authRouter.put("/update-user/:id", authController.UpdateUser);
authRouter.delete("/delete-user/:id", authController.DeleteUser);
authRouter.get("/get-all-user", authController.GetAllUser);
authRouter.get("/get-detail-user/:id", authController.GetDetailUser);

module.exports = authRouter;
