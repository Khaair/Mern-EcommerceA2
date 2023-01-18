const mongoose = require("mongoose");
const { Schema } = mongoose;

const productcategorySchema = new Schema({
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("productcategorymodel", productcategorySchema);
