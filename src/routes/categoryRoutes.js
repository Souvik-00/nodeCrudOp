const express = require("express");
const router = express.Router();

const {
    getCategories,
    showAddForm,
    createCategory,
    showEditForm,
    updateCategory,
    deleteCategory

} = require("../controllers/category.Controller");


// Get
router.get("/", getCategories);

// Get categories/add
router.get("/add", showAddForm);

// Post categories/add
router.post("/add", createCategory);

// Get categories/edit/:id
router.get("/edit/:id", showEditForm);

// Post categories/edit/:id?_method=Put
router.put("/edit/:id", updateCategory);

// Delete categories/delete/:id
router.delete("/delete/:id", deleteCategory);

module.exports = router;
