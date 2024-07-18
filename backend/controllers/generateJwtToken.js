const generateJwtToken = (userId) => {
  const payload = {
    userId,
  };
  const jwtToken = jwt.sign(payload, "Nithin");
  return jwtToken;
};
