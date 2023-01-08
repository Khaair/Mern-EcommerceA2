const mongoose = require("mongoose");
const { Schema } = mongoose;

const billingAddressSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postcode: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  cart: {
    type: Array,
    required: true,
  },
  subtotal: {
    type: String,
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
  ordernumber: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("billingaddresssmodel", billingAddressSchema);
