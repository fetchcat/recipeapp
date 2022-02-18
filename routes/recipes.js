// Express and Mongoose

const express = require("express");
const Recipe = require("./../models/recipe");
const router = express.Router();
const Category = require("./../models/category");

// Middleware

const { saveRecipeAndRedirect } = require("../middleware/recipe");

// GET ROUTE - New Recipe

router.get("/new", async (req, res) => {
  const categories = await Category.find().sort({ name: "asc" });
  res.render("recipes/new", { recipe: new Recipe(), categories: categories });
});

// GET ROUTE - Edit Recipe

router.get("/edit/:id", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  const categories = await Category.find().sort({ name: "asc" });
  res.render("recipes/edit", { recipe: recipe, categories: categories });
});

// GET ROUTE - Edit Recipe

router.get("/category/:id", async (req, res) => {
  const recipes = await Recipe.find().sort({ createdAt: "desc" });
  const categories = await Category.find().sort({ name: "asc" });
  res.render("recipes/byCategory", {
    recipes: recipes,
    categories: categories,
  });
});

// GET ROUTE - Get Recipe by Slug

router.get("/:slug", async (req, res) => {
  const categories = await Category.find().sort({ name: "asc" });
  const recipe = await Recipe.findOne({ slug: req.params.slug });
  if (recipe == null) res.redirect("/");
  res.render("recipes/show", { recipe: recipe, categories: categories });
});

// POST ROUTE - Update Recipe

router.post(
  "/",
  async (req, res, next) => {
    req.recipe = new Recipe();
    next();
  },
  saveRecipeAndRedirect("new")
);

// PUT ROUTE - Update recipe

router.put(
  "/:id",
  async (req, res, next) => {
    req.recipe = await Recipe.findById(req.params.id);
    next();
  },
  saveRecipeAndRedirect("edit")
);

// DELETE ROUTE - Delete recipe;

router.delete("/:id", async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

// Export recipe routes

module.exports = router;
