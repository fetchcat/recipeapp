const express = require("express");
const Recipe = require("./../models/recipe");
const router = express.Router();
const Category = require("./../models/category");

router.get("/new", async (req, res) => {
  const categories = await Category.find().sort({ name: "asc" });
  res.render("recipes/new", { recipe: new Recipe(), categories, categories });
});

router.get("/edit/:id", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  const categories = await Category.find().sort({ name: "asc" });
  res.render("recipes/edit", { recipe: recipe, categories: categories });
});

router.get("/:slug", async (req, res) => {
  const categories = await Category.find().sort({ name: "asc" });
  const recipe = await Recipe.findOne({ slug: req.params.slug });
  if (recipe == null) res.redirect("/");
  res.render("recipes/show", { recipe: recipe, categories: categories });
});

router.post(
  "/",
  async (req, res, next) => {
    req.recipe = new Recipe();
    next();
  },
  saveRecipeAndRedirect("new")
);

router.put(
  "/:id",
  async (req, res, next) => {
    req.recipe = await Recipe.findById(req.params.id);
    next();
  },
  saveRecipeAndRedirect("edit")
);

router.delete("/:id", async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

function saveRecipeAndRedirect(path) {
  return async (req, res) => {
    let recipe = req.recipe;
    recipe.category = req.body.category;
    recipe.title = req.body.title;
    recipe.description = req.body.description;
    recipe.prepTime = req.body.prepTime;
    recipe.bakeTime = req.body.bakeTime;
    recipe.bakeTemp = req.body.bakeTemp;
    recipe.ingredients = req.body.ingredients;
    recipe.method = req.body.method;
    console.log(recipe);
    try {
      recipe = await recipe.save();
      res.redirect(`/recipes/${recipe.slug}`);
    } catch (e) {
      res.render(`recipes/${path}`, { recipe: recipe });
    }
  };
}

module.exports = router;
