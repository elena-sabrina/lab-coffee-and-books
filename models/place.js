const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 140,
    required: true
  },
  type: {
    type: String,
    enum: ["coffee_shop", "bookstore"]
  },
  timestamps: {
    type: Date,
    createdAt: Date.now
  }
});

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;
