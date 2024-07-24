/** @format */
const Product = require("../modals/product.modal");
const Cart = require("../modals/cart.modal");

const createCart = async (req, res) => {
  const { product, user } = req.body;
  try {
    const checkCart = await Cart.findOne({ product, user });
    if (checkCart) {
      return res.status(400).json({
        status: false,
        message: "Sản phẩm đã có trong giỏ hàng",
      });
    }

    const newCart = new Cart({
      product,
      user,
      quantity: 1,
    });
    await newCart.save();
    res.status(200).json({
      status: true,
      data: newCart,
      message: "Thêm vào giỏ hàng thành công",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

const deleteCart = async (req, res) => {
  const cartId = req.params.id;
  if (!cartId) {
    return res.status(400).json({
      status: false,
      message: "Vui lòng chọn sản phẩm muốn xóa khỏi giỏ hàng",
    });
  }

  try {
    const updateCart = await Cart.findByIdAndDelete(cartId);
    return res.status(200).json({
      status: true,
      data: updateCart,
      message: "Xóa thành công",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

const getAllCart = async (req, res) => {
  const userId = req.params.id;
  try {
    const carts = await Cart.find({ user: userId })
      .populate("product")
      .sort({ createdAt: -1 })
      .exec();
    res.status(200).json({
      status: true,
      data: carts,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

module.exports = {
  createCart,
  deleteCart,
  getAllCart,
};
