const asyncHandler = require("../middleware/async");
const Product = require("../models/Product");

// @desc Get all products
// @route GET /api/v1/product
// @access Public
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  console.log("CONTROLLER =>>");
  res.status(200).json(res.advancedResults);
});

exports.getProduct = asyncHandler(async (req, res, next) => {
  console.log("GET PRODUCT => ");
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(
      new ErrorResponse(
        `Producto no encontrado con id de ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: product });
});
