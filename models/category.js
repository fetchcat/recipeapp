const mongoose = require("mongoose");

// Category Schema

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

categorySchema.pre("validate", function (next) {
  if (this.name.length > 1) {
    console.log(`Adding ${this.name} to categories`);
  }
  next();
});

module.exports = mongoose.model("Category", categorySchema);
