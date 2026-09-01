# Skor Rest Assured — HydroClean Scorecard

Landing page + quiz 9 pertanyaan + hasil skor (low/medium/high) untuk iklan HydroClean.
Berdasarkan `Prompt_ScoreApp_A_Lengkap.md` — dibangun manual sebagai pengganti ScoreApp
karena platform ScoreApp error saat proses build.

## Struktur
- `index.html` — semua 4 screen (landing, quiz, lead capture, result) dalam satu halaman
- `script.js` — logic quiz, scoring, dan kirim lead ke Google Sheet
- `assets/logo-hydroclean.png` — logo brand

## Live
https://ais-adri.github.io/hydroclean-scorecard/ (aktif setelah GitHub Pages di-enable)

## Cara kerja skor
Hanya Q2–Q8 yang menyumbang skor (Q1 dan Q9 tidak memengaruhi skor):
- Q5 "Tidak" (kasur < 3 tahun) → +25
- Q6 "Ya" (pernah dibersihkan profesional) → +25
- Q7 "Tidak" (tidak ada anak/lansia/hewan) → +25
- Q8 "Tidak" (tidak ada acara ramai 3 bulan ke depan) → +25

Skor 0–100 dipetakan ke 3 kategori: Low (0–39), Medium (40–74), High (75–100).

**Catatan penting (dari dokumen prompt asli):** bobot ini adalah draft untuk memenuhi
setup awal, BUKAN hasil kalibrasi. Wajib ditinjau ulang setelah 50 booking pertama nyata.

## Setup Google Sheet untuk capture lead (WAJIB sebelum live iklan)

Karena ini dipakai untuk kantor, gunakan **akun Google Workspace kantor** (bukan akun pribadi),
supaya data lead ownership-nya benar dan bisa diakses tim.

### Langkah 1 — Buat Google Sheet
1. Login ke akun Google kantor, buka https://sheets.google.com
2. Buat spreadsheet baru, beri nama misalnya "HydroClean Scorecard Leads"
3. Di baris pertama (header), isi kolom ini (urutan bebas asal konsisten dengan Apps Script):
   `timestamp | name | phone | score | category | primaryBeds | q2_sofaKain | q3_kamarTamu | q4_karpet | q5_kasurLama | q6_pernahProfesional | q7_anakLansiaHewan | q8_acaraRamai | q9_ruangPrioritas`

### Langkah 2 — Buat Apps Script Web App
1. Di spreadsheet itu, klik menu **Extensions → Apps Script**
2. Hapus kode default, ganti dengan ini:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.timestamp, data.name, data.phone, data.score, data.category,
    data.primaryBeds, data.q2_sofaKain, data.q3_kamarTamu, data.q4_karpet,
    data.q5_kasurLama, data.q6_pernahProfesional, data.q7_anakLansiaHewan,
    data.q8_acaraRamai, data.q9_ruangPrioritas
  ]);
  return ContentService.createTextOutput(JSON.stringify({ok: true}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Klik **Save** (ikon disket), beri nama project misalnya "HydroClean Scorecard Webhook"
4. Klik **Deploy → New deployment**
5. Klik ikon gear di "Select type" → pilih **Web app**
6. Isi:
   - Description: bebas, misal "Scorecard lead webhook"
   - Execute as: **Me** (akun kantor kamu)
   - Who has access: **Anyone** (harus "Anyone", bukan "Anyone with Google account", supaya website bisa kirim data tanpa login)
7. Klik **Deploy**
8. Google akan minta otorisasi — klik **Authorize access**, pilih akun kantor, kalau muncul
   peringatan "Google hasn't verified this app" klik **Advanced → Go to [nama project] (unsafe)**
   (ini normal untuk script buatan sendiri, bukan berbahaya)
9. Setelah deploy selesai, copy **Web app URL** yang muncul (bentuknya seperti
   `https://script.google.com/macros/s/AKfycb.../exec`)

### Langkah 3 — Pasang URL ke website
1. Buka file `script.js` di repo ini
2. Cari baris:
   ```javascript
   const GAS_WEBHOOK_URL = "";
   ```
3. Ganti jadi:
   ```javascript
   const GAS_WEBHOOK_URL = "https://script.google.com/macros/s/xxxxx/exec";
   ```
4. Commit & push perubahan itu (atau minta bantuan lagi untuk push-kannya)

### Catatan
- Kalau nanti Apps Script perlu diubah lagi, edit lewat Extensions → Apps Script di sheet yang sama,
  lalu **Deploy → Manage deployments → edit (ikon pensil) → New version → Deploy** (URL tetap sama).
- Selama `GAS_WEBHOOK_URL` masih kosong, website tetap jalan normal (quiz & result tetap tampil),
  cuma lead tidak tersimpan ke Sheet.

## Menjalankan lokal
```bash
cd hydroclean-scorecard
python3 -m http.server 8000
# buka http://localhost:8000
```
