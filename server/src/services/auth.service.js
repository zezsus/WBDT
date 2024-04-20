/** @format */

const User = require("../modals/user.modal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SignUp = async (newUser) => {
  const { username, email, password, address, phone } = newUser;
  try {
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return {
        status: false,
        message: "Email đã tồn tại",
      };
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

    return {
      status: true,
      message: "Đăng ký thành công",
      data: newUser,
    };
  } catch (error) {
    throw error;
  }
};

const SignIn = async (userSignIn) => {
  const { email, password } = userSignIn;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return {
        status: false,
        message: "Tài khoản hoặc mật khẩu không chính xác",
      };
    }

    const comparePassword = bcrypt.compare(password, checkUser.password);
    if (!comparePassword) {
      return {
        status: false,
        message: "Tài khoản hoặc mật khẩu không chính xác",
      };
    }

    const accessToken = jwt.sign(
      { userId: checkUser._id },
      process.env.ACCESSTOKEN
    );
    return {
      status: true,
      message: "Đăng nhập thành công",
      data: checkUser,
      accessToken,
    };
  } catch (error) {
    throw error;
  }
};

const UpdateUser = async (id, data) => {
  try {
    const checkUser = await User.findOne({
      _id: id,
    });
    if (!checkUser) {
      return {
        status: false,
        message: "Người dùng không tồn tại",
      };
    }

    const updateUser = await User.findByIdAndUpdate(id, data, { new: true });

    return {
      status: true,
      message: "Cập nhật thông tin thành công",
      data: updateUser,
    };
  } catch (error) {
    throw error;
  }
};

const DeleteUser = async (id) => {
  try {
    const checkUser = await User.findOne({
      _id: id,
    });
    if (!checkUser) {
      return {
        status: false,
        message: "Người dùng không tồn tại",
      };
    }

    const deleteUser = await User.findByIdAndDelete(id);

    return {
      status: true,
      message: "Xóa thành công",
      deleteUser,
    };
  } catch (error) {
    throw error;
  }
};

const GetAllUser = async () => {
  try {
    const allUser = await User.find();
    return {
      status: true,
      data: allUser,
    };
  } catch (error) {
    return {
      status: false,
      message: error,
    };
  }
};

const GetDetailUser = async (id) => {
  try {
    const detailUser = await User.findOne({ _id: id });
    if (!detailUser) {
      return {
        status: false,
        message: "Người dùng không tồn tại",
      };
    }

    return {
      status: true,
      data: detailUser,
    };
  } catch (error) {
    return {
      status: false,
      message: error,
    };
  }
};

module.exports = {
  SignIn,
  SignUp,
  UpdateUser,
  DeleteUser,
  GetAllUser,
  GetDetailUser,
};
