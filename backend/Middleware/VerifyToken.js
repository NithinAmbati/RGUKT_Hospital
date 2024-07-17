const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return res.status(400).send("Authorization Error");
  }

  const jwtToken = authorization.split(" ")[1];
  if (!jwtToken) return res.status(400).send("Authentication Error");

  try {
    const payload = jwt.verify(jwtToken, "Nithin"); // Verify the token
    const { userId } = payload;
    req.userId = userId; // Attach user data to the request object
    next(); // Proceed to the next middleware
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = verifyToken;
