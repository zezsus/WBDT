/** @format */
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESSTOKEN, (error, user) => {
      if (error) {
        return res.status(403).json({
          status: false,
          message: "Xác thực thất bại",
        });
      }
      if (user?.isAdmin) {
        req.user = user;
        next();
      } else {
        return res.status(403).json({
          status: false,
          message: "Không có quyền truy cập",
        });
      }
    });
  } else {
    return res.status(401).json({
      status: false,
      message: "Không có token",
    });
  }
};

const authUserMiddleWare = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const userId = req.params.id;

    jwt.verify(token, process.env.ACCESSTOKEN, (error, user) => {
      if (error) {
        return res.status(403).json({
          status: false,
          message: "Xác thực thất bại",
        });
      }
      if (user?.isAdmin || user?.userId === userId) {
        req.user = user;
        next();
      } else {
        return res.status(403).json({
          status: false,
          message: "Không có quyền truy cập",
        });
      }
    });
  } else {
    return res.status(401).json({
      status: false,
      message: "Không có token",
    });
  }
};

module.exports = { authMiddleware, authUserMiddleWare };
