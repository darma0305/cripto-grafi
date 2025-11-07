# 🔐 Simple Cryptography API (Express.js)

Project ini adalah contoh sederhana implementasi **kriptografi** menggunakan **Node.js + Express.js**.  
Tujuannya buat belajar cara enkripsi dan dekripsi data (misalnya pakai `crypto` bawaan Node.js).

---

## 🚀 Fitur
- 🔒 Enkripsi teks menggunakan algoritma AES-256-CBC  
- 🔓 Dekripsi teks hasil enkripsi  
- 🧠 Dibangun dengan Express.js
- 📦 Struktur clean dan simple

---

## 🧱 Struktur Folder
```
project-folder/
│
├── src/
│   ├── routes/
│   │   └── cryptoRoute.js
│   ├── controllers/
│   │   └── cryptoController.js
│   ├── app.js
│
├── .env
├── package.json
├── .gitignore
└── README.md
```

---

## ⚙️ Instalasi

1. **Clone repo**
   ```bash
   git clone https://github.com/username/simple-cryptography-api.git
   cd simple-cryptography-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Buat file `.env`**
   ```bash
   touch .env
   ```

   Isi dengan contoh berikut:
   ```
   PORT=3000
   SECRET_KEY=12345678901234567890123456789012
   IV_KEY=1234567890123456
   ```

   > ⚠️ SECRET_KEY harus 32 karakter dan IV_KEY 16 karakter untuk AES-256-CBC.

4. **Jalankan server**
   ```bash
   npm run dev
   ```
   atau (kalau pakai nodemon)
   ```bash
   npx nodemon src/app.js
   ```

---

## 🧪 API Endpoint

### 🔹 Enkripsi
**POST** `/encrypt`
```json
{
  "text": "halo dunia"
}
```

**Response:**
```json
{
  "encrypted": "gk8F8d92R7jvC6uLx9s8vA=="
}
```

---

### 🔹 Dekripsi
**POST** `/decrypt`
```json
{
  "encrypted": "gk8F8d92R7jvC6uLx9s8vA=="
}
```

**Response:**
```json
{
  "decrypted": "halo dunia"
}
```

---

## 🧰 Tech Stack
- Node.js
- Express.js
- Crypto (bawaan Node)
- Dotenv
- Nodemon (opsional untuk dev mode)

---

## 📄 License
MIT License © 2025

---

## ✨ Author
Made with ❤️ by **DARMA & FITRA FUADI**
