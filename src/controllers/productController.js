const Product = require("../models/Product");
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");

// List all products
exports.getProducts = async (req, res) => {
    const products = await Product.find().populate("category").populate("subcategory").sort({createdAt: -1});
    res.render("products/list", {
        title: "Products",
        products
    });
};

// Add Form
exports.showAddForm = async (req, res) => {
    const categories = await Category.find();
    const subcategories = await Subcategory.find();

    res.render("products/add", {
        title: "Add Product",
        categories,
        subcategories
    });
};

// Create Product
exports.createProduct = async (req, res) => {
    const {name, category, subcategory, price, stock} = req.body;

    await Product.create({
        name,
        category,
        subcategory,
        price,
        stock
    });
    res.redirect("/products");
};

// Edit Form
exports.showEditForm = async (req, res) => {
    const product = await Product.findById(req.params.id);
    const categories = await Category.find();
    const subcategories = await Subcategory.find();

    res.render("products/edit", {
        title: "Edit Product",
        product,
        categories,
        subcategories,
    });
};

// Update Product
exports.updateProduct = async (req, res) => {
    const {name, category, subcategory, price, stock} = req.body;

    await Product.findByIdAndUpdate(req.params.id, {
        name,
        category,
        subcategory,
        price,
        stock,
    });
    res.redirect("/products");
}

// Delete Product
exports.deleteProducts = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/products");
}