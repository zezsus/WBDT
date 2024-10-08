/** @format */

const Order = require("../modals/order.modal");
const Product = require("../modals/product.modal");

const createOrder = async (req, res) => {
  const {
    orderItems,
    itemsPrice,
    totalPrice,
    shippingAddress,
    user,
    isPaid,
    isDelivered,
    isReceived,
    paymentMethod,
  } = req.body;

  if (!orderItems) {
    return res.status(400).json({
      status: false,
      message: "Vui lòng chọn sản phẩm muốn mua.",
    });
  }

  if (!shippingAddress.address || !shippingAddress.phone) {
    return res.status(400).json({
      status: false,
      message: "Vui lòng nhập đầy đủ địa chỉ và số điện thoại",
    });
  }

  if (!paymentMethod) {
    return res.status(400).json({
      status: false,
      message: "Vui lòng chọn phương thức thanh toán",
    });
  }

  try {
    const newOrder = new Order({
      orderItems,
      shippingAddress,
      itemsPrice,
      totalPrice,
      user,
      isPaid,
      isDelivered,
      isReceived,
      paymentMethod,
    });
    await newOrder.save();

    try {
      await Product.findOneAndUpdate(
        { _id: orderItems.product },
        { $inc: { countInStock: -orderItems.quantity } },
        { new: true }
      );
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Lỗi khi cập nhật sản phẩm",
      });
    }

    return res.status(201).json({
      status: true,
      message: "Đặt hàng thành công",
      data: newOrder,
    });
  } catch (e) {
    return res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

const getAllOrderDetail = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({
      status: false,
      message: "Vui lòng chọn người dùng",
    });
  }

  try {
    const userOrder = await Order.find({ user: userId });
    if (!userOrder) {
      return res.status(400).json({
        status: false,
        message: "Không có đơn hàng nào",
      });
    }

    return res.status(200).json({
      status: true,
      data: userOrder,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

const getOrderDetail = async (req, res) => {
  const orderId = req.params.id;
  if (!orderId) {
    return res.status(400).json({
      status: false,
      message: "Vui lòng chọn đơn hàng.",
    });
  }

  try {
    const orderDeltail = await Order.findOne({ _id: orderId });
    if (!orderDeltail) {
      return res.status(400).json({
        status: false,
        mesage: "Đơn hàng bạn lựa chọn không tồn tại",
      });
    }
    return res.status(200).json({
      status: true,
      data: orderDeltail,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

const getAllOrder = async (req, res) => {
  const limit = 8;
  let page = req.query.page || 1;
  page = parseInt(page, 10);
  page = page < 1 ? 1 : page;
  const skip = (page - 1) * limit;

  try {
    const totalProducts = await Order.countDocuments();
    const allOrder = await Order.find()
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .exec();

    return res.status(200).json({
      status: true,
      data: allOrder,
      pageCurrent: page,
      totalPage: Math.ceil(totalProducts / limit),
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

const updateOrder = async (req, res) => {
  const data = req.body;

  if (!data._id) {
    return res.status(400).json({
      status: false,
      message: "Vui lòng chọn đơn hàng",
    });
  }

  try {
    const checkOrder = await Order.findOne({ _id: data._id });
    if (!checkOrder) {
      return res.status(400).json({
        status: false,
        message: "Đơn hàng không tồn tại",
      });
    }

    const updateItem = await Order.findByIdAndUpdate(data._id, data, {
      new: true,
    });

    return res.status(200).json({
      status: true,
      message: "Cập nhật thành công",
      data: updateItem,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

const cancelOrder = async (req, res) => {
  const { orderId } = req.body;

  if (!orderId) {
    return res.status(400).json({
      status: false,
      message: "Vui lòng chọn đơn hàng",
    });
  }

  try {
    const deleteItem = await Order.findByIdAndDelete(orderId);
    if (!deleteItem) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Xóa đơn hàng thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

module.exports = {
  createOrder,
  getAllOrderDetail,
  getAllOrder,
  getOrderDetail,
  cancelOrder,
  updateOrder,
};
