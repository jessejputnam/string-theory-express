const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AccessorySchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  company: { type: String, required: true, maxLength: 50 },
  desc: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, default: 0 },
  imgUrl: {
    type: String,
    default:
      "https://www.aaronfaber.com/wp-content/uploads/2017/03/product-placeholder-wp.jpg"
  }
});

// Virtual for category url
AccessorySchema.virtual("url", function () {
  return `/catalog/${this.category}/accesssory/${this._id}`;
});

module.exports = mongoose.model("Accessory", AccessorySchema);
