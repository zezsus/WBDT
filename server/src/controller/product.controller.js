/** @format */
const Product = require("../modals/product.modal");

const createProduct = async (req, res) => {
  const {
    name,
    image,
    type,
    brand,
    price,
    countInStock,
    rating,
    description,
    selled,
  } = req.body;

  if (
    !name ||
    !image ||
    !type ||
    !brand ||
    !price ||
    !countInStock ||
    !rating ||
    !description ||
    !selled
  ) {
    return res.status(400).json({
      status: false,
      message: "Vui lòng điền đầy đủ thông tin",
    });
  }

  try {
    const checkProduct = await Product.findOne({ name });
    if (checkProduct) {
      return res.status(400).json({
        status: false,
        message: "Sản phẩm đã tồn tại",
      });
    }

    const newProduct = new Product({
      name,
      image,
      type,
      brand,
      price,
      countInStock,
      rating,
      description,
      selled,
    });
    await newProduct.save();

    return res.status(200).json({
      status: true,
      message: "Thêm sản phẩm thành công",
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const data = req.body;

  if (!productId) {
    return res.status(400).json({
      status: false,
      message: "Vui lòng chọn sản phẩm",
    });
  }
  try {
    const checkProduct = await Product.findOne({ _id: productId });
    if (!checkProduct) {
      return res.status(400).json({
        status: false,
        message: "Sản phẩm không tồn tại",
      });
    }

    const updateProduct = await Product.findByIdAndUpdate(productId, data, {
      new: true,
    });

    return res.status(200).json({
      status: true,
      message: "Sửa thông tin sản phẩm thành công",
      data: updateProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    return res.status(400).json({
      status: false,
      message: "Vui lòng chọn sản phẩm",
    });
  }
  try {
    const checkProduct = await Product.findOne({ _id: productId });
    if (!checkProduct) {
      return res.status(400).json({
        status: false,
        message: "Sản phẩm không tồn tại",
      });
    }
    const deleteProduct = await Product.findByIdAndDelete(productId);
    return res.status(200).json({
      status: 200,
      message: "Xóa thành công",
      deleteProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

const getAllProduct = async (req, res) => {
  const limit = 12;
  let { page = 1, search, type, brand, price } = req.query;

  try {
    const query = {};
    if (search) {
      query.name = { $regex: search, $options: "i" }; // Tìm kiếm tương đối theo tên sản phẩm, không phân biệt hoa thường
    }
    if (type) {
      query.type = type; // Tìm kiếm theo loại sản phẩm
    }
    if (brand) {
      query.brand = brand; // Tìm kiếm theo loại sản phẩm
    }
    if (price) {
      const [minPrice, maxPrice] = price.split("-").map((p) => parseInt(p, 10));
      if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        query.price = { $gte: minPrice, $lte: maxPrice }; // Tìm kiếm sản phẩm trong khoảng giá
      }
    }

    const totalProducts = await Product.countDocuments(query);

    page = parseInt(page, 10);
    page = page < 1 ? 1 : page;
    const skip = (page - 1) * limit;

    const productPage = await Product.find(query)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .exec();
    return res.status(200).json({
      status: true,
      data: productPage,
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

const getDettailProduct = async (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    res.status(400).json({
      status: false,
      message: "Vui lòng chọn sản phẩm",
    });
  }
  try {
    const productDetail = await Product.findById({ _id: productId });
    if (!productDetail) {
      return res.status(400).json({
        status: false,
        message: "Sản phẩm không tồn tại",
      });
    }

    return res.status(200).json({
      status: 200,
      data: productDetail,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

const getTypeProduct = async (req, res) => {
  try {
    const typeProduct = await Product.distinct("type");
    typeProduct.sort();
    return res.status(200).json({
      status: true,
      data: typeProduct.sort(),
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

const getBrandProduct = async (req, res) => {
  try {
    const brandProduct = await Product.distinct("brand");
    brandProduct.sort();
    return res.status(200).json({
      status: true,
      data: brandProduct.sort(),
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getDettailProduct,
  getTypeProduct,
  getBrandProduct,
};
