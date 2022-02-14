const express = require("express");
const mongoose = require("mongoose");
const Recipe = require("./models/recipe");
const Category = require("./models/category");
const recipeRouter = require("./routes/recipes");
const methodOverride = require("method-override");
const app = express();

const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

const connectdb = require("./config/db");

connectdb();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const recipes = await Recipe.find().sort({ createdAt: "desc" });
  const categories = await Category.find().sort({ name: "asc" });
  res.render("recipes/index", {
    recipes: recipes,
    categories: categories,
  });
});

app.use("/recipes", recipeRouter);

app.listen(port);
