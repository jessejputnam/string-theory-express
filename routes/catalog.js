const express = require("express");
const router = express.Router();

// Require controller modules
const accessory_controller = require("../controllers/accessoryController");
const category_controller = require("../controllers/categoryController");
const instrument_controller = require("../controllers/instrumentController");
const page_controller = require("../controllers/pageController");

// GET catalog home index
router.get("/", page_controller.catalog_index);

/// ######## ACCESSORY ROUTES ######## ///

// GET request for creating an Accessory
router.get("/accessory/create", accessory_controller.accessory_create_get);

// POST request for creating an Accessory
router.post("/accessory/create", accessory_controller.accessory_create_post);

// GET request for deleting an Accessory
router.get(
  "/:category/accessory/:id/delete",
  accessory_controller.accessory_delete_get
);

// POST request for deleting an Accessory
router.post(
  "/:category/accessory/:id/delete",
  accessory_controller.accessory_delete_post
);

// GET request for updating an Accessory
router.get(
  "/:category/accessory/:id/update",
  accessory_controller.accessory_update_get
);

// POST request for updating an Accessory
router.post(
  "/:category/accessory/:id/update",
  accessory_controller.accessory_update_post
);

// GET request for one Accessory
router.get("/:category/accessory/:id", accessory_controller.accessory_detail);

// GET request for list of all Accessory items
router.get("/accessories", accessory_controller.accessory_list);

/// ######## CATEGORY ROUTES ######## ///

// GET request for creating a Category
router.get("/category/create", category_controller.category_create_get);

// POST request for creating a Category
router.post("/category/create", category_controller.category_create_post);

// GET request for deleting a Category
router.get("/category/:id/delete", category_controller.category_delete_get);

// POST request for deleting a Category
router.post("/category/:id/delete", category_controller.category_delete_post);

// GET request for updating a Category
router.get("/category/:id/update", category_controller.category_update_get);

// POST request for updating a Category
router.post("/category/:id/update", category_controller.category_update_post);

// GET request for one Category
router.get("/category/:id", category_controller.category_detail);

// GET request for list of all Category items
router.get("/categories", category_controller.category_list);

/// ######## INSTRUMENT ROUTES ######## ///

// GET request for creating an Instrument
router.get("/instrument/create", instrument_controller.instrument_create_get);

// POST request for creating an Instrument
router.post("/instrument/create", instrument_controller.instrument_create_post);

// GET request for deleting an Instrument
router.get(
  "/:category/instrument/:id/delete",
  instrument_controller.instrument_delete_get
);

// POST request for deleting an Instrument
router.post(
  "/:category/instrument/:id/delete",
  instrument_controller.instrument_delete_post
);

// GET request for updating an Instrument
router.get(
  "/:category/instrument/:id/update",
  instrument_controller.instrument_update_get
);

// POST request for updating an Instrument
router.post(
  "/:category/instrument/:id/update",
  instrument_controller.instrument_update_post
);

// GET request for one Instrument
router.get(
  "/:category/instrument/:id",
  instrument_controller.instrument_detail
);

// GET request for list of all Instrument items
router.get("/instruments", instrument_controller.instrument_list);

module.exports = router;
