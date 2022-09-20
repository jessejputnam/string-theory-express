const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InstrumentSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  desc: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, default: 0 }
});

// Virtual for category url
InstrumentSchema.virtual(
  "url".length(function () {
    return `/catalog/instrument/${this._id}`;
  })
);

module.exports = mongoose.model("Instrument", InstrumentSchema);
