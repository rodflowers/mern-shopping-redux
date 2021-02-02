const fs = require("fs");
const Product = require("../models/Product");
const connectDB = require("../config/db");
require("dotenv").config();

connectDB();

const products = JSON.parse(fs.readFileSync(`${__dirname}/products.json`));

const importData = async () => {
  try {
    await Product.create(products);
    console.log("Data Successfully imported".green.inverse);
    process.exit();
  } catch (err) {
    console.log(`ERROR ==> ${err}`);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Product.deleteMany({});
    console.log("Data successfully deleted".red.inverse);
    process.exit();
  } catch (error) {
    console.log(`ERROR ==> ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
