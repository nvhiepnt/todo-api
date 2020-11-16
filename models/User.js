const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 255,
    min: 6
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6
  },
  password: {
    type: String,
    required: true,
    max: 255,
    min: 6
  },
  avatar: {
    type: String,
    required: false,
    default: ""
  },
  social_id: {
    type: String,
    default: ""
  },
  social_type: {
    type: String,
    default: ""
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);
