const User = require("../models/user");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");

//Siging up user
exports.signup = (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ err: err.array() });
  }
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to save user in DB"
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id
    });
  });
};

//Signin Logic
exports.signin = (req, res) => {
  const { email, password } = req.body;

  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ err: err.array() });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User does not exists"
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match"
      });
    }

    //Create Token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    //put token in cokkie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to frontend
    const { _id, name, email, role } = user;
    res.json({
      token,
      user: {
        _id,
        name,
        email,
        role
      }
    });
  });
};

//Signout Auth logic
exports.signout = (req, res) => {
  res.json({
    message: "User Signout successful"
  });
};
