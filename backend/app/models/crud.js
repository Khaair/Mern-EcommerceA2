const mongoose = require("mongoose");
const { Schema } = mongoose;

const crudSchema = new Schema({
  title: String,
  author: String,
  body: String,
});

module.exports = mongoose.model("crud", crudSchema);
