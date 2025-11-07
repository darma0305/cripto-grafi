const { User } = require("../../../models");

class Model_r {
  constructor(req) {
    this.req = req;
  }

  // Fungsi untuk mengambil semua data User
  async daftar_user() {
    try {
      // Mengambil semua data User dari database
      const Users = await User.findAll();

      // Mengembalikan data User
      return Users;
    } catch (error) {
      console.error("Error fetching User data:", error);
      throw error;
    }
  }
}

module.exports = Model_r;
