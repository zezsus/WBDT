/** @format */
const Cart = require("../modals/cart.modal");

const createCart = async (req, res) => {
  const { user, items } = req.body;

  try {
    const cart = await Cart.findOne({ user });
    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === items.product
      );
      if (itemIndex !== -1) {
        return res.status(400).json({
          status: false,
          message: "Sản phẩm đã có trong giỏ hàng",
        });
      } else {
        cart.items.push({ product: items.product, quantity: items.quantity });
        await cart.save();
        return res.status(200).json({
          status: true,
          data: cart,
          message: "Thêm vào giỏ hàng thành công",
        });
      }
      return;
    }

    newCart = new Cart({
      user,
      items,
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
  const { productId } = req.body;
  const userId = req.params.id;

  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { items: { product: productId } } },
      { new: true }
    ).populate("items.product");

    if (!updatedCart) {
      return res.status(404).json({
        status: false,
        message: "Giỏ hàng không tìm thấy",
      });
    }

    res.status(200).json({
      status: true,
      data: updatedCart,
      message: "Xóa sản phẩm khỏi giỏ hàng thành công",
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
    if (!userId) {
      return res.status(400).json({
        status: false,
        message: "Người dùng không tồn tại",
      });
    }

    const carts = await Cart.findOne({ user: userId })
      .populate("items.product")
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
