const express = require("express");
const router = express.Router();


const {
    getProducts,
    showAddForm,
    createProduct,
    showEditForm,
    updateProduct,
    deleteProducts,
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/add", showAddForm);
router.post("/add", createProduct);
router.get("/edit/:id", showEditForm);
router.put("/edit/:id", updateProduct);
router.delete("/delete/:id", deleteProducts);


module.exports = router;
