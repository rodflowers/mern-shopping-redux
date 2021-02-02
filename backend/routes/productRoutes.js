const express = require("express");
const advancedResults = require("../middleware/advancedResults");
const Product = require("../models/Product");

const router = express.Router();

const { getAllProducts } = require("../controller/productController");

router.route("/").get(advancedResults(Product, ""), getAllProducts);
console.log("ROUTES ==>");

module.exports = router;
