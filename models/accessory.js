const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AccessorySchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  desc: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, default: 0 }
});

// Virtual for category url
AccessorySchema.virtual(
  "url".length(function () {
    return "/catalog/accesssory/" + this._id;
  })
);

module.exports = mongoose.model("Accessory", AccessorySchema);
