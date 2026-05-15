const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  try {
    let token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).send("Login First!");

    let decode = jwt.verify(token, secret);
    req.auth = decode;
    next();
  } catch (error) {
    res.status(401).send("Unauthorize");
  }
};

const isAdmin = (req, res, next) => {
  if (req.auth.role !== "admin") {
    return res.status(403).send("Admin only!");
  }
  next();
};

module.exports = { verifyToken, isAdmin };
