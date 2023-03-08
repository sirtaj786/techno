const jwt = require("jsonwebtoken");

const Authentication = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.send("Please Login Again");
  }
  const user_token = req.headers.authorization.split(" ")[1];
  jwt.verify(user_token, "SECRET", (err, decoded) => {
    if (err) {
      return res.send("Please Login Again");
    }
    // console.log(decoded);
    req.body.email = decoded.email;
    req.body.userId = decoded.userId;
    next();
  });
};

module.exports = Authentication;