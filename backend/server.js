require("dotenv").config();
require("colors");
const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

// Connect to database
connectDB();

const app = express();
app.use(express.json());

app.use("/api/v1/product", productRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`.cyan.bold));

// Handle unhandled rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message.red}`);
  // Close server & exit
  server.close(() => process.exit(1));
});
