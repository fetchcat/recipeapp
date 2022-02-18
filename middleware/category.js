// Save category and redirect back to categories view

function saveCategoryAndRedirect(path) {
  return async (req, res) => {
    const categories = await Category.find().sort({ name: "asc" });
    let category = req.category;
    category.name = req.body.name;
    try {
      category = await category.save();
      res.render(`categories/${path}`, {
        categories: categories,
        message: "Added Successfully",
        name: category.name,
      });
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
