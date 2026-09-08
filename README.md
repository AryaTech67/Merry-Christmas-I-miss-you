# 🎄 Merry Christmas I Miss You (Web Edition)

Aplikasi web interaktif dengan tampilan modern, efek mesin ketik lirik animasi (typewriter), latar belakang animasi hujan, salju, dan bintang berpijar (*particles*), serta pemutar musik yang didesain *mobile-friendly* dan siap di-deploy ke **GitHub Pages**.

---

## 📁 Struktur Repositori

Seluruh file utama diletakkan di **root directory** agar langsung dideteksi oleh GitHub Pages:

- 📄 [`index.html`](file:///c:/xamppnew/htdocs/Merry-Christmas-I-miss-you-main/Merry-Christmas-I-miss-you/index.html) - Struktur utama halaman web & audio player.
- 🎨 [`style.css`](file:///c:/xamppnew/htdocs/Merry-Christmas-I-miss-you-main/Merry-Christmas-I-miss-you/style.css) - Desain visual modern, glassmorphism, typography, dan responsivitas layar HP.
- ⚡ [`script.js`](file:///c:/xamppnew/htdocs/Merry-Christmas-I-miss-you-main/Merry-Christmas-I-miss-you/script.js) - Logika animasi lirik *typewriter*, canvas *particles* (raindrops, snowflakes, sparkles), dan kontrol audio.
- 🐍 [`Code`](file:///c:/xamppnew/htdocs/Merry-Christmas-I-miss-you-main/Merry-Christmas-I-miss-you/Code) - Script Tkinter asli (Python) disimpan sebagai referensi/cadangan.
- 🎵 `music.mp3` *(Opsional)* - Anda dapat meletakkan file audio `music.mp3` di root folder jika ingin menambahkan lagu latar belakang.

---

## 🚀 Cara Commit & Push ke GitHub

Jalankan perintah berikut di terminal Anda untuk mengunggah perubahan ke GitHub:

```bash
# 1. Tambahkan semua file yang telah diubah/dibuat
git add .

# 2. Buat commit
git commit -m "Deploy: Restructure web app to root for GitHub Pages"

# 3. Push ke branch main
git push origin main
```

---

## 🌐 Cara Mengaktifkan GitHub Pages

1. Buka repositori Anda di **GitHub**.
2. Masuk ke menu **Settings** > **Pages** (di bilah navigasi sebelah kiri).
3. Pada bagian **Build and deployment**:
   - **Source**: Pilih `Deploy from a branch`.
   - **Branch**: Pilih `main` dan folder `/ (root)`.
4. Klik tombol **Save**.
5. Tunggu sekitar 1–2 menit, web Anda akan aktif di URL:
   `https://<username-github>.github.io/Merry-Christmas-I-miss-you/`

---

## ✨ Fitur-Fitur Utama

1. **Responsif & Mobile-Friendly**: Tampilan otomatis menyesuaikan dengan layar HP maupun komputer.
2. **Efek Typewriter Presisi**: Lirik lagu muncul karakter demi karakter dengan jeda waktu sesuai versi asli.
3. **Canvas Partikel Dynamic**: Efek hujan, salju, dan kilauan bintang yang smooth menggunakan HTML5 Canvas.
4. **Music Control Glassmorphism**: Widget pemutar audio modern dengan tombol play/pause interaktif.