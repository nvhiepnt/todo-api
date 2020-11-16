const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});
TodoSchema.index({ title: "text" });

module.exports = mongoose.model("Todo", TodoSchema);
