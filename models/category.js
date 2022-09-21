const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true, maxLength: 40 },
  desc: { type: String, required: true }
});

// Virtual for category url
CategorySchema.virtual("url", function () {
  return "/catalog/category/" + this._id;
});

module.exports = mongoose.model("Category", CategorySchema);
