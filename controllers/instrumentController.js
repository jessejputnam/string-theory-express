const Instrument = require("../models/instrument");

// Display list of all accessories
exports.instrument_list = (req, res) => {
  res.send("NOT IMPLEMENTED: Instrument list");
};

// Display detail page for a specific Instrument
exports.instrument_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Instrument detail: ${req.params.id}`);
};

// Display Instrument create form on GET
exports.instrument_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Instrument create GET");
};

// Handle Instrument create on POST
exports.instrument_create_post = (req, res) => {
  res.send("NOT IMPLEMEMTED: Instrument create POST");
};

// Display Instrument delete form on GET
exports.instrument_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Instrument delete GET");
};

// Handle Instrument delete on POST
exports.instrument_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Instrument delete POST");
};

// Display Instrument update form on GET
exports.instrument_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Instrument update GET");
};

// Handle Instrument update on POST
exports.instrument_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Instrument update POST");
};
