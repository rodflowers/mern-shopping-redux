const express = require("express");
const advancedResults = require("../middleware/advancedResults");
const Product = require("../models/Product");

const router = express.Router();

const {
  getAllProducts,
  getProduct,
} = require("../controllers/productController");

router.route("/").get(advancedResults(Product, ""), getAllProducts);

router.route("/:id").get(getProduct);

module.exports = router;
