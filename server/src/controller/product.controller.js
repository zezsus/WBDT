/** @format */

const CreateProduct = async (req, res) => {
  try {
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
      name ||
      image ||
      type ||
      price ||
      countInStock ||
      rating ||
      description ||
      selled
    ) {
      return res.status(400).json({
        status: false,
        message: "Vui lòng điền đầy đủ thông tin",
      });
    }
  } catch (error) {
    return res.status(500).json({ status: false, message: error });
  }
};

module.exports = { CreateProduct };
