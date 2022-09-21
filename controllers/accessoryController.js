const Accessory = require("../models/accessory");

// Display list of all accessories
exports.accessory_list = (req, res) => {
  res.send("NOT IMPLEMENTED: Accessory list");
};

// Display detail page for a specific Accessory
exports.accessory_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Accessory detail: ${req.params.id}`);
};

// Display Accessory create form on GET
exports.accessory_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Accessory create GET");
};

// Handle Accessory create on POST
exports.accessory_create_post = (req, res) => {
  res.send("NOT IMPLEMEMTED: Accessory create POST");
};

// Display Accessory delete form on GET
exports.accessory_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Accessory delete GET");
};

// Handle Accessory delete on POST
exports.accessory_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Accessory delete POST");
};

// Display Accessory update form on GET
exports.accessory_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Accessory update GET");
};

// Handle Accessory update on POST
exports.accessory_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Accessory update POST");
};
