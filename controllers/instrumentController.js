const Instrument = require("../models/instrument");
const Category = require("../models/category");

// const async = require("async");
const { body, validationResult } = require("express-validator");

// Display list of all accessories
exports.instrument_list = (req, res, next) => {
  Instrument.find()
    .populate("category")
    .exec(function (err, list_instruments) {
      if (err) {
        return next(err);
      }
      // Successful, so render
      res.render("instrument_list", {
        title: "Instrument List",
        instrument_list: list_instruments
      });
    });
};

// Display detail page for a specific Instrument
exports.instrument_detail = (req, res, next) => {
  Instrument.findById(req.params.id)
    .populate("category")
    .exec((err, instrument) => {
      if (err) {
        return next(err);
      }
      if (instrument === null) {
        // No results
        const err = new Error("Instrument not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render
      res.render("instrument_detail", {
        instrument: instrument
      });
    });
};

// Display Instrument create form on GET
exports.instrument_create_get = (req, res, next) => {
  Category.find({}, "name").exec((err, categories) => {
    if (err) {
      return next(err);
    }
    // Successful, so render
    res.render("instrument_form", {
      title: "Create Instrument",
      category_list: categories
    });
  });
};

// Handle Instrument create on POST
exports.instrument_create_post = [
  // Validate and sanitize fields
  body("name", "Instrument must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("company", "Company must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("desc").escape(),
  body("price", "Price must be valid number greater than 0").isNumeric(),
  body(
    "stock",
    "Stock must be valid number greater than or equal to 0"
  ).isNumeric(),

  // Process request after validation and sanitization
  (req, res, next) => {
    // Extract validation errors from a request
    const errors = validationResult(req);

    // Create an Instrument obj with escaped and trimmed data
    const instrument = new Instrument({
      name: req.body.name,
      company: req.body.company,
      desc: req.body.desc,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
      imgUrl:
        req.body.imgUrl ||
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
    });

    if (!errors.isEmpty()) {
      // There are errors, render form again with sanitized values / error messages
      Category.find({}, "name").exec(function (err, categories) {
        if (err) {
          return next(err);
        }
        // Successful, so render
        res.render("instrument_form", {
          title: "Create Instrument",
          category_list: categories,
          selected_category: instrument.category._id,
          errors: errors.array(),
          instrument: instrument
        });
      });
      return;
    } else {
      // Data form is valid
      instrument.save((err) => {
        if (err) {
          return next(err);
        }
        // Successful - redirect to new instrument
        res.redirect(instrument.url);
      });
    }
  }
];

// Display Instrument delete form on GET
exports.instrument_delete_get = (req, res, next) => {
  Instrument.findById(req.params.id).exec((err, instrument) => {
    if (err) {
      return next(err);
    }
    if (instrument === null) {
      // No results, redirect to list of instruments
      res.redirect("/catalog/instruments");
    }
    // Successful, so render
    res.render("instrument_delete", {
      title: "Delete Instrument",
      instrument: instrument
    });
  });
};

// Handle Instrument delete on POST
exports.instrument_delete_post = (req, res, next) => {
  Instrument.findById(req.body.instrumentid).exec((err, instrument) => {
    if (err) {
      return next(err);
    }
    if (instrument === null) {
      // No results, redirect to list of instruments
      res.redirect("/catalog/instruments");
    }
    // Delete object and redirect to list of instruments
    Instrument.findByIdAndRemove(req.body.instrumentid, (err) => {
      if (err) {
        return next(err);
      }
      // Success, go to instrument list
      res.redirect("/catalog/instruments");
    });
  });
};

// Display Instrument update form on GET
exports.instrument_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Instrument update GET");
};

// Handle Instrument update on POST
exports.instrument_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Instrument update POST");
};
