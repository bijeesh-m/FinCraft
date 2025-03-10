const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.AccessToken;
  if (token) {
    jwt.verify(token, process.env.SEC_KEY, (err, user) => {
      if (err) {
        res.status(400).json({ message: "Access Denied" });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "Login Required" });
  }
};
module.exports = verifyToken
