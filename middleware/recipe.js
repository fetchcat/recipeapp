// Save recipe and redirect back to recipes

function saveRecipeAndRedirect(path) {
  return async (req, res) => {
    let recipe = req.recipe;
    const {
      category,
      title,
      description,
      bakeTime,
      prepTime,
      bakeTemp,
      ingredients,
      method,
    } = req.body;
    recipe.category = category;
    recipe.title = title;
    recipe.description = description;
    recipe.prepTime = prepTime;
    recipe.bakeTime = bakeTime;
    recipe.bakeTemp = bakeTemp;
    recipe.ingredients = ingredients;
    recipe.method = method;
    try {
      recipe = await recipe.save();
      res.redirect(`/recipes/${recipe.slug}`);
    } catch (e) {
      res.render(`recipes/${path}`, { recipe: recipe });
    }
  };
}

// Export recipe middleware

module.exports = { saveRecipeAndRedirect };
