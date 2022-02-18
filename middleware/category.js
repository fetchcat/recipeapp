// Save category and redirect back to categories view

function saveCategoryAndRedirect(path) {
  return async (req, res) => {
    const Category = require("../models/category");
    const categories = await Category.find().sort({ name: "asc" });
    let category = req.category;
    category.name = req.body.name;
    try {
      category = await category.save();
      res.redirect("/categories/new");
    } catch (e) {
      res.render(`categories/${path}`, {
        categories: categories,
        name: category.name,
      });
    }
  };
}

// Export category middleware

module.exports = { saveCategoryAndRedirect };
