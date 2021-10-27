const User = require("../models/User");
var jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    var decoded = jwt.verify(token, process.env.SECRET);
    //   console.log(decoded);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json([{ msg: "Not Authorized" }]);
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send([{ msg: "UnAuthorized" }]);
  }
};
module.exports = isAuth;
