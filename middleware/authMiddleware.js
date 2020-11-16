const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    res.status(401).send({ status_code: 401, message: "Unauthorized" });

  try {
    const verfied = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findOne({ _id: verfied._id });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send({ status_code: 400, message: "Invalid Token" });
  }
};
