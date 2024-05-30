/** @format */
const Product = require("../modals/product.modal");

const CreateProduct = async (req, res) => {
  const {
    name,
    image,
    type,
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

const UpdateProduct = async (req, res) => {
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

const DeleteProduct = async (req, res) => {
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

const GetAllProduct = async (req, res) => {
  const limit = 5;
  let page = req.query.page;
  const sort = req.query.sort;
  const filter = req.query.filter;

  try {
    const totalPage = await Product.countDocuments();

    if (filter) {
      let label = filter[0];
      const productFilter = await Product.find({
        [label]: { $regex: filter[1] },
      });
      return res.status(200).json({
        status: true,
        data: productFilter,
        pageCurrent: page,
        totalPage: Math.ceil(totalPage / limit),
      });
    }

    if (page) {
      page = parseInt(page);
      page < 0 ? (page = 1) : page;
      const skip = (page - 1) * limit;
      if (sort) {
        let objectSort = {};
        objectSort[sort[1]] = sort[0];
        const productSort = await Product.find()
          .limit(limit)
          .skip(skip)
          .sort(objectSort);
        return res.status(200).json({
          status: true,
          data: productSort,
          pageCurrent: page,
          totalPage: Math.ceil(totalPage / limit),
        });
      }

      const productPage = await Product.find().limit(limit).skip(skip);
      return res.status(200).json({
        status: true,
        data: productPage,
        pageCurrent: page,
        totalPage: Math.ceil(totalPage / limit),
      });
    }

    const allProduct = await Product.find();
    return res.status(200).json({
      status: true,
      data: allProduct,
      page: page,
      totalPage: Math.ceil(totalPage / limit),
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

const GetDettailProduct = async (req, res) => {
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

module.exports = {
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
  GetAllProduct,
  GetDettailProduct,
};
