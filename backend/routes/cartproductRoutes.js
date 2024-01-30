const express = require("express");
const router = express.Router();
const { postcartProduct, getcartProduct,deleteCartProduct } = require("../controllers/cartProductController");

router.route("/").post(postcartProduct);
router.route("/").get(getcartProduct);
router.route("/:name").delete(deleteCartProduct);

module.exports = router;
