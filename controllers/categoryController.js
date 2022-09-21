const Category = require("../models/category");

// Display list of all accessories
exports.category_list = (req, res) => {
  res.send("NOT IMPLEMENTED: Category list");
};

// Display detail page for a specific Accessory
exports.category_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Category detail: ${req.params.id}`);
};

// Display Accessory create form on GET
exports.category_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Category create GET");
};

// Handle Accessory create on POST
exports.category_create_post = (req, res) => {
  res.send("NOT IMPLEMEMTED: Category create POST");
};

// Display Accessory delete form on GET
exports.category_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Category delete GET");
};

// Handle Accessory delete on POST
exports.category_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Category delete POST");
};

// Display Accessory update form on GET
exports.category_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Category update GET");
};

// Handle Accessory update on POST
exports.category_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Category update POST");
};
