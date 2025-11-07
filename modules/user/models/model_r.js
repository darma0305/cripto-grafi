const { User } = require("../../../models");
const crypto = require("crypto");
require("dotenv").config();

class Model_r {
  constructor(req) {
    this.req = req;
    this.res = req.res;
  }

  // === Fungsi Dekripsi Password ===
  decryptPassword(encryptedText) {
    const secretKey = process.env.SECRET_KEY;
    const [ivHex, encrypted] = encryptedText.split(":");
    const iv = Buffer.from(ivHex, "hex");

    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(secretKey, "utf8"),
      iv
    );

    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }

  // === Fungsi Enkripsi Password ===
  encryptPassword(password) {
    const secretKey = process.env.SECRET_KEY;
    const iv = crypto.randomBytes(16); // IV unik tiap enkripsi

    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.from(secretKey, "utf8"),
      iv
    );

    let encrypted = cipher.update(password, "utf8", "hex");
    encrypted += cipher.final("hex");

    // simpan iv + encrypted text (biar bisa didekripsi nanti)
    return iv.toString("hex") + ":" + encrypted;
  }

  // === REGISTER USER (dengan transaksi) ===
  async register() {
    const t = await User.sequelize.transaction();
    try {
      const { name, role, email, password } = this.req.body;

      // Enkripsi password pakai secret key
      const encryptedPassword = this.encryptPassword(password);

      // Simpan user ke database (pakai transaksi)
      const newUser = await User.create(
        {
          name,
          role,
          email,
          password: encryptedPassword,
        },
        { transaction: t }
      );

      // Commit transaksi kalau sukses
      await t.commit();

      return {
        success: true,
        message: "User berhasil didaftarkan dengan password terenkripsi!",
        data: newUser,
      };
    } catch (error) {
      // Rollback transaksi kalau error
      await t.rollback();
      console.error("Error register user:", error);
      return {
        success: false,
        message: "Gagal mendaftarkan user",
        error: error.message,
      };
    }
  }

  // === GET SEMUA USER ===
  async daftar_user() {
    try {
      const Users = await User.findAll();
      return {
        success: true,
        data: Users,
      };
    } catch (error) {
      console.error("Error fetching User data:", error);
      return {
        success: false,
        message: "Gagal mengambil data user",
        error: error.message,
      };
    }
  }
}

module.exports = Model_r;
