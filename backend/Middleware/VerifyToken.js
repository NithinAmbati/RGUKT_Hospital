const jwt = require("jsonwebtoken");

const verifyDoctorToken = async (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return res.status(400).send("Authorization Error");
  }

  const jwtToken = authorization.split(" ")[1];

  if (!jwtToken) return res.status(400).send("Authentication Error");
  try {
    const payload = jwt.verify(jwtToken, "Nithin");
    const { userId, role } = payload;
    if (role !== "doctor") return;
    req.userId = userId;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "Invalid token." });
  }
};

const verifyNurseToken = async (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return res.status(400).send("Authorization Error");
  }

  const jwtToken = authorization.split(" ")[1];

  if (!jwtToken) return res.status(400).send("Authentication Error");
  try {
    const payload = jwt.verify(jwtToken, "Nithin");
    const { userId, role } = payload;
    if (role !== "doctor") return;
    req.userId = userId;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "Invalid token." });
  }
};

const verifyAdminToken = async (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return res.status(400).send("Authorization Error");
  }

  const jwtToken = authorization.split(" ")[1];

  if (!jwtToken) return res.status(400).send("Authentication Error");
  try {
    const payload = jwt.verify(jwtToken, "Nithin");
    const { userId, role } = payload;
    if (role !== "admin") return;
    req.userId = userId;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "Invalid token." });
  }
};

const verifyPharmacistToken = async (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return res.status(400).send("Authorization Error");
  }

  const jwtToken = authorization.split(" ")[1];

  if (!jwtToken) return res.status(400).send("Authentication Error");
  try {
    const payload = jwt.verify(jwtToken, "Nithin");
    const { userId, role } = payload;
    if (role !== "pharmacist") return;
    req.userId = userId;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "Invalid token." });
  }
};

const verifyDoctorOrAdminToken = async (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return res.status(400).send("Authorization Error");
  }

  const jwtToken = authorization.split(" ")[1];

  if (!jwtToken) return res.status(400).send("Authentication Error");
  try {
    const payload = jwt.verify(jwtToken, "Nithin");
    const { userId, role } = payload;
    if (role === "admin" || role == "doctor") {
      req.userId = userId;
      next();
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = {
  verifyAdminToken,
  verifyDoctorToken,
  verifyNurseToken,
  verifyPharmacistToken,
  verifyDoctorOrAdminToken,
};
