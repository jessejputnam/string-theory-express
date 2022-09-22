const Category = require("../models/category");
const Instrument = require("../models/instrument");
const Accessory = require("../models/accessory");
const async = require("async");
const { instrument_detail } = require("./instrumentController");

// Display list of all accessories
exports.category_list = (req, res, next) => {
  Category.find({}, "name")
    .sort({ name: 1 })
    .exec(function (err, list_categories) {
      if (err) {
        return next(err);
      }
      // Successful, so render
      res.render("category_list", {
        title: "Category List",
        category_list: list_categories
      });
    });
};

// Display detail page for a specific Accessory
exports.category_detail = (req, res, next) => {
  async.parallel(
    {
      category(callback) {
        Category.findById(req.params.id).exec(callback);
      },
      category_instruments(callback) {
        Instrument.find({ category: req.params.id }).exec(callback);
      },
      category_accessories(callback) {
        Accessory.find({ category: req.params.id });
      }
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.category === null) {
        // No results
        const err = new Error("Category not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render
      res.render("category_detail", {
        title: "Category Detail",
        category: results.category,
        category_instruments: results.category_instruments,
        category_accessories: results.category_accessories
      });
    }
  );
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
