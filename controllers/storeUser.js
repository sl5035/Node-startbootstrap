const path = require("path");

const User = require("../models/User.js");

module.exports = (req, res) => {
  User.create(req.body, (error, user) => {
    if (error) {
      return res.direct("auth/register");
    }

    res.redirect("/");
  });
};
