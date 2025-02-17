const jwt = require("jsonwebtoken");
const { hiddenKey } = require("../secret/key");

const authMidWare = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, login again",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, hiddenKey);

    req.user = { id: decoded.id };

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message:
        error.name === "TokenExpiredError"
          ? "Token has expired, please login again"
          : "Invalid token, authentication failed",
    });
  }
};

module.exports = { authMidWare };
