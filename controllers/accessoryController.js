const Accessory = require("../models/accessory");
// const async = require("async");

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
        name: accessory.name,
        company: accessory.company,
        desc: accessory.desc,
        category: accessory.category,
        price: accessory.price,
        stock: accessory.stock,
        imgUrl: accessory.imgUrl
      });
    });
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
