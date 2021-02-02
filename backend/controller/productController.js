const asyncHandler = require("../middleware/async");
const Product = require("../models/Product");

//* @desc Get all products
//* @route GET /api/v1/product
//* @access Public
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  console.log("CONTROLLER =>>");
  res.status(200).json(res.advancedResults);
});
