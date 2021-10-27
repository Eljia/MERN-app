const User = require("../models/User");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, lastName, email, password } = req.body;
  try {
    //1 check if the user exits
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json([{ msg: "user already exist" }]);
    }
    //2 create new user
    user = new User({ name, lastName, email, password });
    //3 hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    console.log(salt);
    console.log(user.password);
    //4 save the user
    await user.save();
    //5  login the user {token}
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
    // 6 response :{user , token}

    res.send({
      token,
      user: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        _id: user._id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //1*check if user exist
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json([{ msg: "bad credentials (email)" }]);
    }
    //2*compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json([{ msg: "bad credentials (password)" }]);
    }
    //3*login user (token)
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
    // 4* response :{user , token}

    res.send({
      token,
      user: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        _id: user._id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getAuthUser = (req, res) => {
  res.send({ user: req.user });
};

module.exports = {
  register,
  login,
  getAuthUser,
};
