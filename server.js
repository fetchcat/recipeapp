// Express

const express = require("express");
const methodOverride = require("method-override");
const app = express();

// Mongoose

const mongoose = require("mongoose");
const Recipe = require("./models/recipe");
const Category = require("./models/category");
const recipeRouter = require("./routes/recipes");
const categoryRouter = require("./routes/categories");

// Environment Variables

const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

// Connect to MongoDB Database

const connectdb = require("./config/db");
connectdb();

// EJS

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// Home Route

app.get("/", async (req, res) => {
  const recipes = await Recipe.find().sort({ createdAt: "desc" });
  const categories = await Category.find().sort({ name: "asc" });
  const first = await Category.findOne().sort({ name: "asc" });

  res.render("recipes/index", {
    recipes: recipes,
    categories: categories,
    cat: first.name,
  });
});

// Routes

app.use("/recipes", recipeRouter);
app.use("/categories", categoryRouter);

// Listen on ENV Port or 5000

app.listen(port);
