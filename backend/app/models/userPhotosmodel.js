const mongoose = require("mongoose");
const { Schema } = mongoose;

const userPhotosSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("userPhotosmodel", userPhotosSchema);
