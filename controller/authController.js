const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(200)
        .json({ status: 400, message: "Email does not exist" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(200).json({ status: 400, message: "Password Invalid" });
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1d"
    });
    res.status(200).json({
      status: 200,
      message: "Login success",
      data: {
        user: {
          name: user.name,
          email: user.email,
          avatar: user.avatar
        },
        access_token: token
      }
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports.loginsocial = async (req, res) => {
  try {
    const userSocial = await User.findOne({
      social_id: req.body.social_id,
      social_type: req.body.social_type
    });
    if (!userSocial) {
      const user = new User({
        name: req.body.name ? req.body.name : "User new",
        email: "notemail@gmail.com",
        password: "loginsocial",
        social_id: req.body.social_id,
        social_type: req.body.social_type
      });
      const usernew = await user.save();
      const tokennew = jwt.sign(
        { _id: usernew._id },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "1d"
        }
      );
      res.status(200).json({
        status: 200,
        message: "Register success, Login social success",
        data: {
          user: {
            name: usernew.name,
            email: usernew.email
          },
          access_token: tokennew
        }
      });
    } else {
      const token = jwt.sign(
        { _id: userSocial._id },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "1d"
        }
      );
      res.status(200).json({
        status: 200,
        message: "Login social success",
        data: {
          user: {
            name: userSocial.name,
            email: userSocial.email
          },
          access_token: token
        }
      });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports.register = async (req, res) => {
  try {
    const emailExist = await User.findOne({ email: req.body.email });

    if (emailExist)
      return res
        .status(200)
        .json({ status: 400, message: "Email already exist" });

    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hasedPassword
    });
    await user.save();
    res.status(200).json({
      status: 200,
      message: "Register success",
      data: { user: user._id }
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
