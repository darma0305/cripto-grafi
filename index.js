const express = require("express");
const app = express();
const PORT = 3000;
require("dotenv").config();

// Impor instance sequelize dari models
const { sequelize } = require("./models");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Definisikan router yang ingin diimpor secara dinamis
const arr_router = ["user"]; // Kamu tinggal menambah router baru di sini

// Inisialisasi objek untuk menampung semua router
let arr = {};

// Loop melalui nama router dan secara dinamis mengimpor router
arr_router.forEach((e) => {
  // Misalnya kamu menambahkan file router dengan nama `router_chat.js` atau `router_user.js`
  arr[`${e}`] = require(`./router/router_${e}`);
});

// Daftarkan semua router secara dinamis dengan path yang sesuai
Object.keys(arr).forEach((routerKey) => {
  // Ubah ke path yang sesuai
  app.use("/", arr[routerKey]); // Jangan ada "/chat" lagi
});

// Autentikasi dengan database dan mulai server
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ MySQL connected!");

    sequelize
      .sync({ force: false }) // force: false agar tidak menghapus tabel yang sudah ada
      .then(() => {
        console.log("✅ Tabel sudah disinkronkan!");

        // Setelah sinkronisasi selesai, jalankan server
        app.listen(PORT, () => {
          console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
        });
      })
      .catch((err) => {
        console.error("❌ Error sinkronisasi tabel:", err);
      });
  })
  .catch((err) => {
    console.error("❌ MySQL connection error:", err);
  });
