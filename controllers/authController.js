const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const user_exist = await User.findOne({ email }).exec();
  if (user_exist) {
    return res.status(401).json({ message: "User already exist!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    first_name,
    last_name,
    email,
    password: hashedPassword,
  });

  const accessToken = jwt.sign(
    {
      UserInfo: {
        id: user._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15s" }
  );
  const refreshToken = jwt.sign(
    {
      UserInfo: {
        id: user._id,
      },
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: "None", // domain and sub-domain will receive the cookie
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    accessToken,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const user_exist = await User.findOne({ email }).exec();
  if (!user_exist) {
    return res.status(401).json({ message: "User does not exist!" });
  }

  const match = await bcrypt.compare(password, user_exist.password);

  if (!match) {
    return res.status(401).json({ message: "Wrong Password!" });
  }

  const accessToken = jwt.sign(
    {
      UserInfo: {
        id: user_exist._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15s" }
  );
  const refreshToken = jwt.sign(
    {
      UserInfo: {
        id: user_exist._id,
      },
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: "None", // domain and sub-domain will receive the cookie
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    accessToken,
    email: user_exist.email,
    first_name: user_exist.first_name,
    last_name: user_exist.last_name,
  });
};

const refresh = (req, res) => {
  const cookies = req.cookies;
  // check if jwt does not not exist in cookies
  if (!cookies?.jwt) return res.status(403).json({ message: "Unauthorized" });
  const refreshToken = cookies.jwt;
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    //  check if refreshToken is not compatible ike the once created from the server
    if (err) return res.status(403).json({ message: "Forbidden" });
    const foundUser = await User.findById(decoded.UserInfo.id).exec();
    if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: foundUser._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15s" }
    );

    return res.json({ accessToken });
  });
};

const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(204); // No content
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.json({ message: "Cookie cleared" });
};

module.exports = {
  register,
  login,
  refresh,
  logout,
};
