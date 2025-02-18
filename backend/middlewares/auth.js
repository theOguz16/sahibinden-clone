const jwt = require("jsonwebtoken");
const secretkey = "your-secret-key";

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Giriş başarısız. Yetkilendirme bilgileri eksik veya hatalı.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, secretkey);
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({
      message: "Giriş başarısız. Geçersiz veya süresi dolmuş token.",
    });
  }
};
