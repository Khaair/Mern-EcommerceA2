const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },

  userId: {
    type: String,
    required: true,
  },

  postId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("commentmodel", commentSchema);
