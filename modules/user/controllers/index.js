const Model_r = require("../models/model_r");

// Fungsi ambil semua user
exports.daftar_user = async (req, res) => {
  try {
    const model = new Model_r(req);
    const result = await model.daftar_user();

    if (result.success) {
      res.status(200).json({
        error: false,
        message: "Data user berhasil diambil",
        data: result.data,
      });
    } else {
      res.status(400).json({
        error: true,
        message: result.message || "Gagal mengambil data user",
      });
    }
  } catch (error) {
    console.error("Error daftar_user:", error);
    res.status(500).json({
      error: true,
      message: "Terjadi kesalahan pada server",
      detail: error.message,
    });
  }
};

// Fungsi register user baru
exports.register = async (req, res) => {
  try {
    const model = new Model_r(req);
    const result = await model.register();

    if (result.success) {
      res.status(200).json({
        error: false,
        message: result.message,
        data: result.data,
      });
    } else {
      res.status(400).json({
        error: true,
        message: result.message || "User gagal ditambahkan",
      });
    }
  } catch (error) {
    console.error("Error register:", error);
    res.status(500).json({
      error: true,
      message: "Terjadi kesalahan pada server",
      detail: error.message,
    });
  }
};
