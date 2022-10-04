const Accessory = require("../models/accessory");
const Category = require("../models/category");
// const async = require("async");
const { body, validationResult } = require("express-validator");

// Display list of all accessories
exports.accessory_list = (req, res, next) => {
  Accessory.find()
    .populate("category")
    .exec(function (err, list_accessories) {
      if (err) {
        return next(err);
      }
      // Successful, so render
      res.render("accessory_list", {
        title: "Accessory List",
        accessory_list: list_accessories
      });
    });
};

// Display detail page for a specific Accessory
exports.accessory_detail = (req, res, next) => {
  Accessory.findById(req.params.id)
    .populate("category")
    .exec((err, accessory) => {
      if (err) {
        return next(err);
      }
      if (accessory === null) {
        // No results
        const err = new Error("Accessory not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render
      res.render("accessory_detail", {
        accessory: accessory
      });
    });
};

// Display Accessory create form on GET
exports.accessory_create_get = (req, res, next) => {
  Category.find({}, "name").exec((err, categories) => {
    if (err) {
      return next(err);
    }
    // Successful, so render
    res.render("accessory_form", {
      title: "Create Accessory",
      category_list: categories
    });
  });
};

// Handle Accessory create on POST
exports.accessory_create_post = [
  // Validate and sanitize fields
  body("name", "Accessory must be specified")
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

    // Create an Accessory obj with escaped and trimmed data
    const accessory = new Accessory({
      name: req.body.name,
      company: req.body.company,
      desc: req.body.desc,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
      imgUrl:
        req.body.imgUrl ||
        "https://www.aaronfaber.com/wp-content/uploads/2017/03/product-placeholder-wp.jpg"
    });

    if (!errors.isEmpty()) {
      // There are errors, render form again with sanitized values / error messages
      Category.find({}, "name").exec(function (err, categories) {
        if (err) {
          return next(err);
        }
        // Successful, so render
        res.render("accessory_form", {
          title: "Create Accessory",
          category_list: categories,
          selected_category: accessory.category._id,
          errors: errors.array(),
          accessory: accessory
        });
      });
      return;
    } else {
      // Data form is valid
      accessory.save((err) => {
        if (err) {
          return next(err);
        }
        // Successful - redirect to new accessory
        res.redirect(accessory.url);
      });
    }
  }
];

// Display Accessory delete form on GET
exports.accessory_delete_get = (req, res, next) => {
  Accessory.findById(req.params.id)
    .populate("category")
    .exec((err, accessory) => {
      if (err) {
        return next(err);
      }
      if (accessory === null) {
        // No results, redirect to list of accessories
        res.redirect("/catalog/accessories");
      }
      // Successful, so render
      res.render("accessory_delete", {
        title: "Delete Accessory",
        accessory: accessory
      });
    });
};

// Handle Accessory delete on POST
exports.accessory_delete_post = (req, res, next) => {
  Accessory.findById(req.params.id).exec((err, accessory) => {
    if (err) {
      return next(err);
    }
    if (accessory === null) {
      // No results, redirect to list of accessories
      res.redirect("/catalog/accessories");
    }
    // Delete object and redirect to list of accessories
    Accessory.findByIdAndRemove(req.body.accessoryid, (err) => {
      if (err) {
        return next(err);
      }
      // Success - go to accessory list
      res.redirect("/catalog/accessories");
    });
  });
};

// Display Accessory update form on GET
exports.accessory_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Accessory update GET");
};

// Handle Accessory update on POST
exports.accessory_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Accessory update POST");
};
