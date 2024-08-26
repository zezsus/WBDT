/** @format */

const express = require("express");
const paymentOnline = express.Router();
const Payment = require("../controller/paymentOnline.controller");

paymentOnline.post("/momo-payment", Payment.momoPayment);
paymentOnline.get("/paypal-payment", Payment.paypalPayment);

module.exports = paymentOnline;
