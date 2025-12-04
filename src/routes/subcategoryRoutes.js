const express = require("express");
const router = express.Router();

const {
    getSubcategories,
    showAddForm,
    createSubcategory,
    showEditForm,
    updateSubcategory,
    deleteSubcategory

} = require("../controllers/subcategoryController");

// List
router.get("/", getSubcategories);

// Add form
router.get("/add", showAddForm);

// Add Save
router.post("/add", createSubcategory);

// Edit Form
router.get("/edit/:id", showEditForm);

// Edit save
router.put("/edit/:id", updateSubcategory);

// Delete
router.delete("/delete/:id", deleteSubcategory);

module.exports = router;
