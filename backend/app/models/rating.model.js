const mongoose = require("mongoose");
const { Schema } = mongoose;

const productratingSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  ratingValue: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("productratingmodel", productratingSchema);
