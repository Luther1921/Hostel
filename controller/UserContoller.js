const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const asyncHandler = require("express-async-handler");

const getUser = asyncHandler(async (req, res) => {
  const user = await User.find();
  return res.status(200).json(user);
});

const registerUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !email || !password)
    res.status(400).json({ error: "all fields are mandatory" });
  const availableUser = await User.findOne({ email });
  if (availableUser) res.status(400).json({ error: "user already exists" });

  // hashed password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  const user = await User.create({
    email,
    username,
    password: hashedPassword,
  });
  res.status(201).json({ _id: user.id, email: user.email });
  res.status(400).json({ error: "user data not valid" });
});

// creating a login endpoint for user

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    res.status(400).json({ error: "all fields are mandatory" });
  const user = await User.findOne({ email });
  //compare password with hashed password
  if (!user) res.status(400).json({ error: "user not found" });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" }
    );
    res.status(200).json({ accessToken });
    res.status(401).json({ error: "email or password is not valid" });
    next(error);
  }
});

// current user info
const currentUser = asyncHandler(async (req, res) => {
  console.log("welcome");
  res.json(req.user);
});

module.exports = { registerUser, getUser, userLogin, currentUser };
