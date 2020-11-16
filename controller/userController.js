const User = require("../models/User");

module.exports.update = async (req, res) => {
  req.body.avatar = req.file.path;
  await User.updateOne(
    { _id: req.user._id },
    {
      $set: {
        name: req.body.name,
        avatar: req.body.avatar
      }
    }
  );
  res.status(201).json({
    status: 200,
    message: "update todo success"
  });
  try {
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
