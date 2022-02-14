const mongoose = require("mongoose");
const createDomPurify = require("dompurify");

// Category Schema

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
