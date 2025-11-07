const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Cek header ada gak
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Token gak dikasih" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Simpen data user ke req biar bisa dipake di route
    req.user = decoded;

    next(); // lanjut ke route
  } catch (err) {
    return res.status(401).json({ message: "Token gak valid / expired" });
  }
};

module.exports = authMiddleware;
