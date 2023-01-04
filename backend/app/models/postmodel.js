const mongoose = require("mongoose");
const { Schema } = mongoose;

const crudSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  postTime: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("postmodel", crudSchema);
