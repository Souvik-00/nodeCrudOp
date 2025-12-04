const Subcategory = require("../models/Subcategory");
const Category = require("../models/Category");

// List all subcategories
exports.getSubcategories = async (req, res) => {
    const subcategories = await Subcategory.find().populate("category").sort({createdAt: -1});
    res.render("subcategories/list", {title: "Subcategories", subcategories});
};

// Show add form
exports.showAddForm = async (req, res) => {
    const categories = await Category.find();
    res.render("subcategories/add", {
        title: "Add Subcategory",
        categories
    });
}

// Create Subcategory
exports.createSubcategory = async (req, res) => {
    const {name, category} = req.body;

    try{
        await Subcategory.create({name, category});
        res.redirect("/subcategories");
    } catch (err) {
        res.status(400).send("Error creating subcategory");
    }
}

// Show Edit Form
exports.showEditForm = async (req, res) => {
    const subcategory = await Subcategory.findById(req.params.id);
    const categories = await Category.find();

    res.render("subcategories/edit", {
        title: "Edit Subcategory",
        subcategory,
        categories,
    });
};

// Update subcategory
exports.updateSubcategory = async (req, res) => {
    await Subcategory.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        category: req.body.category,
    });
    res.redirect("/subcategories");
}

// Delete subcategory
exports.deleteSubcategory = async (req, res) => {
    await Subcategory.findByIdAndDelete(req.params.id);
    res.redirect("/subcategories");
}