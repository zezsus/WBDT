/** @format */
const AuthService = require("../services/auth.service");

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
        message: "Nhập lại mật khẩu không chính xác",
      });
    }

    const respone = await AuthService.SignUp(req.body);
    return res.status(200).json(respone);
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

    const respone = await AuthService.SignIn(req.body);
    return res.status(200).json(respone);
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
    const respone = await AuthService.UpdateUser(userId, data);
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(500).json({
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
    const respone = await AuthService.DeleteUser(userId);
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

const GetAllUser = async (req, res) => {
  try {
    const respone = await AuthService.GetAllUser();
    return res.status(200).json(respone);
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
    const respone = await AuthService.GetDetailUser(userId);
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(500).json({
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
};
