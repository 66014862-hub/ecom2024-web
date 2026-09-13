const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

exports.authCheck = async (req, res, next) => {
  try {
    const headerToken = req.headers.authorization;

    if (!headerToken) {
      return res.status(401).json({ message: "No Token, Authorization" });
    }

    const token = headerToken.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No Token" });
    }

    const secret = process.env.SECRET;
    if (!secret) {
      console.error("FATAL ERROR: process.env.SECRET is not defined!");
      return res.status(500).json({ message: "Server configuration error" });
    }

    // ตรวจสอบ Token
    const decode = jwt.verify(token, secret);
    console.log("Decode Payload:", decode);

    // ค้นหา User โดยเลือกฟิลด์ที่ไม่เอา password ส่งต่อ
    let user = null;
    if (decode.id) {
      user = await prisma.user.findUnique({
        where: { id: decode.id },
        select: { id: true, email: true, role: true, enabled: true },
      });
    } else if (decode.email) {
      user = await prisma.user.findUnique({
        where: { email: decode.email },
        select: { id: true, email: true, role: true, enabled: true },
      });
    }

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // (Optional) เช็คสถานะการเปิดใช้งานบัญชีผู้ใช้
    if (user.enabled === false) {
      return res.status(403).json({ message: "User account is disabled" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    return res.status(401).json({
      message: "Unauthorized",
      error: err.message,
    });
  }
};

exports.adminCheck = (req, res, next) => {
  console.log("Admin Check User:", req.user);

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: User missing" });
  }

  if (!req.user.role || req.user.role.toLowerCase() !== "admin") {
    return res.status(403).json({ message: "Error Admin access denied" });
  }

  next();
};