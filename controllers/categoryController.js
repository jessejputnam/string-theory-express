// Import Tools
const async = require("async");
const { body, validationResult } = require("express-validator");

// Import Models
const Category = require("../models/category");
const Instrument = require("../models/instrument");
const Accessory = require("../models/accessory");

// Display list of all categories
exports.category_list = (req, res, next) => {
  Category.find({}, "name imgUrl")
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

// Display detail page for a specific Category
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
        Accessory.find({ category: req.params.id }).exec(callback);
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

// Display Category create form on GET
exports.category_create_get = (req, res, next) => {
  res.render("category_form", { title: "Create Category" });
};

// Handle Category create on POST
exports.category_create_post = [
  // Validate and sanitize the name field
  body("name", "Category name required").trim().isLength({ min: 1 }).escape(),
  // Process request after validation and sanitization
  (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    // Create a category objet with escaped and trimmed data
    const category = new Category({
      name: req.body.name,
      imgUrl:
        req.body.imgUrl ||
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages
      res.render("category_form", {
        title: "Create Category",
        category,
        errors: errors.array()
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Category with the same name already  exists
      Category.findOne({ name: req.body.name }).exec((err, found_category) => {
        if (err) {
          return next(err);
        }

        if (found_category) {
          // Category found, redirect to its detail page
          res.redirect(found_category._id);
        } else {
          category.save((err) => {
            if (err) {
              return next(err);
            }

            // Category saved. Redirect to category detail page
            res.redirect(category.url);
          });
        }
      });
    }
  }
];

// Display Category delete form on GET
exports.category_delete_get = (req, res, next) => {
  async.parallel(
    {
      category(callback) {
        Category.findById(req.params.id).exec(callback);
      },
      category_instruments(callback) {
        Instrument.find({ category: req.params.id }).exec(callback);
      },
      category_accessories(callback) {
        Accessory.find({ category: req.params.id }).exec(callback);
      }
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.category === null) {
        // No results
        res.redirect("catalog/categories");
      }
      // Successful, so render
      res.render("category_delete", {
        title: "Delete Category",
        category: results.category,
        category_instruments: results.category_instruments,
        category_accessories: results.category_accessories
      });
    }
  );
};

// Handle Category delete on POST
exports.category_delete_post = (req, res, next) => {
  async.parallel(
    {
      category(callback) {
        Category.findById(req.body.categoryid).exec(callback);
      },
      category_instruments(callback) {
        Instrument.find({ category: req.body.categoryid }).exec(callback);
      },
      category_accessories(callback) {
        Accessory.find({ category: req.body.categoryid }).exec(callback);
      }
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      // Success
      if (
        results.category_instruments.length > 0 ||
        results.category_accessories.length > 0
      ) {
        // Category has items. Render same as GET route
        res.render("category_delete", {
          title: "Delete Category",
          category: results.category,
          category_instruments: results.category_instruments,
          category_accessories: results.category_accessories
        });
        return;
      }
      // Category has  no items. Delete object and redirect to category list
      Category.findByIdAndRemove(req.body.categoryid, (er) => {
        if (err) {
          return next(err);
        }
        // Success - go to category list
        res.redirect("/catalog/categories");
      });
    }
  );
};

// Display Category update form on GET
exports.category_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Category update GET");
};

// Handle Category update on POST
exports.category_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Category update POST");
};
