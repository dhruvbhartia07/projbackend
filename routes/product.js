const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  getProductById,
  getProduct,
  createProduct
} = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

// Params
router.param("productId", getProductById);
router.param("userId", getUserById);

// Routes goes here
router.get("/product/:productId", getProduct);

router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  [
    check("name", "Name is required").isLength({ min: 1 }),
    check("description", "Description is required").isLength({ min: 1 }),
    check("price", "Price is required").isLength({ min: 1 }),
    check("category", "Category is required").isLength({ min: 1 }),
    check("stock", "stock is required").isLength({ min: 1 })
  ],
  createProduct
);

module.exports = router;
