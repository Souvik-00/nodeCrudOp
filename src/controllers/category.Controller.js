const Category = require("../models/Category");

// Get all categories
exports.getCategories = async (req, res) => {
    const categories = await Category.find().sort({createdAt: -1});
    res.render("categories/list", {
        title: "Category",
        categories
    });
};

// Show add form
exports.showAddForm = (req, res) => {
    res.render("categories/add", {title: "Add Category"});
}

// Add Category
exports.createCategory = async (req, res) => {
    try {
        await Category.create({name: req.body.name});
        res.redirect("/categories");
    } catch (err) {
        res.status(400).send("Category already exists");
    }
}

// Show edit form
exports.showEditForm = async (req, res) => {
    const category = await Category.findById(req.params.id);
    res.render("categories/edit", {
        title: "Edit Category",
        category
    });
};

// Update Form
exports.updateCategory = async (req, res) => {
    try {
        await Category.findByIdAndUpdate(req.params.id, {
            name: req.body.name
        });
        res.redirect("/categories");
    } catch (err) {
        res.status(400).send("Error updateing category");
    }
};

// Delete category
exports.deleteCategory = async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.redirect("/categories");
}