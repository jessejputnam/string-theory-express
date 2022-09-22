const Instrument = require("../models/instrument");

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
        name: instrument.name,
        company: instrument.company,
        desc: instrument.desc,
        category: instrument.category,
        price: instrument.price,
        stock: instrument.stock,
        imgUrl: instrument.imgUrl
      });
    });
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
