const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);

// Recipe Schema

const recipeSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  prepTime: {
    type: String,
  },
  bakeTime: {
    type: String,
  },
  bakeTemp: {
    type: String,
  },
  ingredients: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  sanitizedIngredients: {
    type: String,
    required: true,
  },
  sanitizedMethod: {
    type: String,
    required: true,
  },
});

recipeSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  if (this.ingredients) {
    this.sanitizedIngredients = dompurify.sanitize(
      marked.parse(this.ingredients)
    );
  }

  if (this.method) {
    this.sanitizedMethod = dompurify.sanitize(marked.parse(this.method));
  }

  next();
});

module.exports = mongoose.model("Recipe", recipeSchema);
