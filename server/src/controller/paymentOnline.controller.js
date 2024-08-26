/** @format */

const axios = require("axios");

const momoPayment = async (req, res) => {
  var accessKey = "F8BBA842ECF85";
  var secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  var orderInfo = "Pay With MoMo";
  var partnerCode = "MOMO";
  var redirectUrl = "http://localhost:3000/order-detail";
  var ipnUrl = "http://localhost:3000/order-detail";
  var requestType = "payWithMethod";
  var amount = "5000";
  var orderId = partnerCode + new Date().getTime();
  var requestId = orderId;
  var extraData = "";

  var orderGroupId = "";
  var autoCapture = true;
  var lang = "vi";

  var rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;

  const crypto = require("crypto");
  var signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    lang: lang,
    requestType: requestType,
    autoCapture: autoCapture,
    extraData: extraData,
    orderGroupId: orderGroupId,
    signature: signature,
  });

  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/create",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
    data: requestBody,
  };

  let result;
  try {
    result = await axios(options);
    return res.status(200).json({
      status: true,
      message: "Thanh toán thành công",
      data: result.data,
    });
  } catch (error) {
    return res.status(500).json({
      status: true,
      message: "Lỗi server",
    });
  }
};

const paypalPayment = (req, res) => {
  return res.status(200).json({
    status: true,
    data: process.env.CLIENT_ID,
  });
};

module.exports = { momoPayment, paypalPayment };
