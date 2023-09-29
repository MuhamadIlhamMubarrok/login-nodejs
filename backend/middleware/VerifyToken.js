import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Tidak diizinkan: Token tidak disediakan" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ msg: "Dilarang: Token tidak valid atau telah kedaluwarsa" });
    }
    req.email = decoded.email;
    next();
  });
};
