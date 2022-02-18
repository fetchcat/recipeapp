// Express and Mongoose

const express = require("express");
const Recipe = require("./../models/recipe");
const router = express.Router();
const Category = require("./../models/category");

// Middleware

const { saveCategoryAndRedirect } = require("../middleware/category");

// GET - New Category Route

router.get("/new", async (req, res) => {
  const categories = await Category.find().sort({ name: "asc" });
  const name = req.body.name;
  res.render("categories/new", {
    categories: categories,
    name: name,
    message: "Add a new category",
  });
});

// GET - Edit Categories

router.get("/edit", async (req, res) => {
  const categories = await Category.find().sort({ name: "asc" });
  res.render("categories/edit", {
    categories: categories,
  });
});

// DELETE - Delete Category

router.delete("/:id", async (req, res) => {
  const del = await Category.findOne({ _id: req.params.id });
  if (del) {
    await Category.findByIdAndDelete(req.params.id);
    res.redirect("/categories/list");
  }
});

// POST - New Category, if not already added

router.post(
  "/new",
  async (req, res, next) => {
    req.category = new Category();
    const categoryExists = await Category.findOne({ name: req.body.name });
    const categories = await Category.find().sort({ name: "asc" });
    if (categoryExists !== null) {
      res.render("categories/new", {
        categories: categories,
        message: "Entry already exists",
        name: req.body.name,
      });
    }
    next();
  },
  saveCategoryAndRedirect("new")
);

// GET - View Recipes by Category

router.get("/show/", async (req, res) => {
  const cat = await Category.findById(req.query.category);
  const recipes = await Recipe.find({ category: cat.name }).sort({
    createdAt: "desc",
  });
  const categories = await Category.find().sort({ name: "asc" });
  res.render("categories/showByCat", {
    recipes: recipes,
    categories: categories,
    cat: cat,
  });
});

// Export Category Routes

module.exports = router;
