/** @format */
const User = require("../modals/user.modal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SignUp = async (req, res) => {
  try {
    const { username, email, password, comfirmPassword } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    const isCheckEmail = reg.test(email);

    if (!username || !email || !password || !comfirmPassword) {
      return res.status(400).json({
        status: false,
        message: "Vui lòng điền đầy đủ thông tin",
      });
    }

    if (!isCheckEmail) {
      return res.status(400).json({
        status: false,
        message: "Vui lòng nhập địa chỉ email hợp lệ",
      });
    }

    if (password !== comfirmPassword) {
      return res.status(400).json({
        status: false,
        message: "Mật khẩu và nhập lại mật khẩu phải giống nhau",
      });
    }

    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({
        status: false,
        message: "Email đã tồn tại",
      });
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = User({
      username,
      email,
      password: hashPassword,
      address: null,
      phone: null,
    });

    await newUser.save();

    return res.status(200).json({
      status: true,
      message: "Đăng ký thành công",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error,
    });
  }
};

const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    const isCheckEmail = reg.test(email);

    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Vui lòng điền đầy đủ thông tin",
      });
    }

    if (!isCheckEmail) {
      return res.status(400).json({
        status: false,
        message: "Vui lòng nhập địa chỉ email hợp lệ",
      });
    }

    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(400).json({
        status: false,
        message: "Tài khoản hoặc mật khẩu không chính xác",
      });
    }

    const comparePassword = await bcrypt.compare(password, checkUser.password);
    if (!comparePassword) {
      return res.status(400).json({
        status: false,
        message: "Tài khoản hoặc mật khẩu không chính xác",
      });
    }

    const accessToken = jwt.sign(
      { userId: checkUser._id, isAdmin: checkUser.isAdmin },
      process.env.ACCESSTOKEN
    );

    return res.status(200).json({
      status: true,
      message: "Đăng nhập thành công",
      data: checkUser,
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error,
    });
  }
};

const UpdateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;

    if (!userId) {
      return res.status(400).json({
        status: false,
        message: "Vui lòng chọn người dùng",
      });
    }

    const checkUser = await User.findOne({
      _id: userId,
    });

    if (!checkUser) {
      return res.status(400).json({
        status: false,
        message: "Người dùng không tồn tại",
      });
    }

    const updateUser = await User.findByIdAndUpdate(userId, data, {
      new: true,
    });

    return res.status(200).json({
      status: true,
      message: "Cập nhật thông tin thành công",
      data: updateUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error,
    });
  }
};

const DeleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        status: false,
        message: "Vui lòng chọn người dùng",
      });
    }

    const checkUser = await User.findOne({
      _id: userId,
    });

    if (!checkUser) {
      return res.status(400).json({
        status: false,
        message: "Người dùng không tồn tại",
      });
    }

    const deleteUser = await User.findByIdAndDelete(userId);

    return res.status(200).json({
      status: true,
      message: "Xóa thành công",
      deleteUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error,
    });
  }
};

const GetAllUser = async (req, res) => {
  try {
    const allUser = await User.find();
    return res.status(200).json({
      status: true,
      data: allUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error,
    });
  }
};

const GetDetailUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        status: false,
        message: "Vui lòng chọn người dùng",
      });
    }

    const detailUser = await User.findOne({ _id: userId });
    if (!detailUser) {
      return {
        status: false,
        message: "Người dùng không tồn tại",
      };
    }

    return res.status(200).json({ status: true, data: detailUser });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error,
    });
  }
};

const LogOut = async (req, res) => {
  try {
    return res.status(200).json({
      status: true,
      message: "Đăng xuất thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: true,
      message: error,
    });
  }
};

module.exports = {
  SignUp,
  SignIn,
  UpdateUser,
  DeleteUser,
  GetAllUser,
  GetDetailUser,
  LogOut,
};
