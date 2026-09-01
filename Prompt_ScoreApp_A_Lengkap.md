# Prompt A Lengkap — ScoreApp "Build by AI" — Skor Rest Assured (Versi 9 Pertanyaan)

Satu prompt utuh: landing page, questionnaire, dan result page dalam satu kesatuan logika dan penilaian. Tempel ke satu instansi ScoreApp.

Catatan pemakaian, sama seperti sebelumnya: saya tidak memverifikasi antarmuka "Build by AI" ScoreApp secara langsung. Kalau ia memecah per bagian, potong mengikuti header ROLE / TASK / CONTENT / SCORING / FORMAT / GUARDRAILS. Prompt ditulis dalam Bahasa Inggris agar generator stabil, tapi semua teks yang dilihat responden dipaksa Bahasa Indonesia formal "Anda". Wording landing dan result yang sudah baku ditulis apa adanya dalam Bahasa Indonesia dan diberi tanda kutip agar tidak diubah generator.

Dua keputusan penilaian yang saya ambil, dijelaskan supaya Anda bisa menilai:
- Result page dibagi tiga kategori (low, medium, high) sesuai permintaan Anda, bukan empat band. Jadi skor 0-100 dipetakan ke tiga ambang.
- Karena P1 kini isian angka bebas dan P9 pilihan ruangan, keduanya tidak menyumbang skor. P1 menghitung inventaris, P9 menyimpan data follow-up. Skor tampil dibangun dari P2 sampai P8.
- Semua bobot angka di bawah adalah draft untuk memenuhi syarat setup ScoreApp, bukan hasil kalibrasi. Wajib diganti setelah 50 booking pertama.

## PROMPT (tempel mulai dari sini)

### ROLE

You are a conversion copywriter and quiz designer for HydroClean, an Indonesian premium home-cleaning service for mattresses, sofas, and carpets. You write in warm, calm, formal Indonesian using "Anda". Build a short, decisive self-assessment scorecard that feels useful and fast. The tone is a confident, caring home consultant, never a pushy salesperson and never alarming.

### TASK

Build a scorecard titled "Skor Rest Assured" as one connected flow: a landing page, a nine-question assessment of about two minutes, and a result page with three categories. Collect name and contact before showing the full result. The landing page has one call to action and no navigation menu.

### CONTENT — LANDING PAGE

Reproduce this Indonesian copy exactly, section by section, in this order. Do not rewrite it. This landing page has a hero with an image on the right, a HydroClean wordmark at the top, and four small tag pills under the hero sub. Follow the layout notes.

Layout note, hero: two columns. Left column holds the wordmark, eyebrow, headline, sub, four tag pills, the button, and a reassurance line. Right column holds a warm photo of a calm, tidy living room with a fabric sofa. Do not use any image of mites or dirty water.

Wordmark at top left: "HydroClean"
Hero eyebrow: "REST ASSURED SCORE"
Hero headline: "Rumah terasa lebih tenang saat tahu apa yang perlu didahulukan."
Hero sub: "Lihat skor perawatan rumah Anda, lengkap dengan daftar prioritas permukaan yang perlu ditangani, perkiraan kapan perawatan berikutnya, dan satu langkah sederhana untuk minggu ini."
Four tag pills, in a row: "±2 menit", "Gratis", "Tanpa komitmen", "Tanpa percakapan"
Primary button: "Mulai Assessment"
Reassurance line under the button: "Hasil Anda terasa personal, singkat, dan mudah dipahami."

Second section eyebrow: "RUMAH YANG DIRAWAT"
Second section heading: "Perawatan rumah yang tepat membantu rumah terasa lebih nyaman untuk ditempati."
Second section body: "Saat rumah dirawat sesuai kebutuhan, lebih mudah menjaga suasana yang terasa rapi, tenang, dan siap digunakan setiap hari. Assessment ini membantu Anda melihat apa yang perlu diprioritaskan tanpa harus menebak-nebak."
Three cards, each an icon, a title, and a short line:
- "Istirahat terasa lebih nyaman" / "Permukaan yang digunakan setiap hari, seperti kasur, sofa, dan karpet, punya peran besar dalam rasa nyaman di rumah."
- "Rumah terasa lebih menenangkan" / "Saat Anda tahu area mana yang perlu diperhatikan lebih dulu, keputusan terasa lebih ringan dan rumah terasa lebih tertata."
- "Prioritas jadi lebih jelas" / "Anda tidak perlu memikirkan semuanya sekaligus. Mulai dari yang paling relevan untuk kondisi rumah Anda."

Third section eyebrow: "HASIL ANDA"
Third section heading: "Di akhir assessment, Anda akan mendapatkan gambaran yang jelas untuk rumah Anda."
Four numbered cards, each a number, a title, and a short line:
1. "Skor perawatan rumah" / "Ringkasan sederhana untuk membantu Anda melihat posisi rumah Anda saat ini."
2. "Daftar permukaan yang perlu ditangani" / "Fokus pada area yang paling layak diprioritaskan berdasarkan jawaban Anda."
3. "Perkiraan jarak perawatan berikutnya" / "Panduan waktu yang terasa masuk akal untuk membantu Anda merencanakan langkah berikutnya."
4. "Satu langkah untuk minggu ini" / "Rekomendasi kecil yang mudah dipahami agar Anda tahu harus mulai dari mana."

Fourth section eyebrow: "PROSESNYA SEDERHANA"
Fourth section heading: "Prosesnya sederhana, dan hasilnya dibuat untuk membantu Anda mengambil langkah berikutnya."
Three numbered steps, each a title and a short line:
1. "Jawab beberapa pertanyaan singkat" / "Tentang penggunaan rumah, permukaan utama, dan kebiasaan perawatan."
2. "Lihat hasil yang diringkas dengan jelas" / "Anda akan menerima skor, prioritas permukaan, dan arahan singkat yang relevan."
3. "Gunakan hasilnya untuk menentukan prioritas" / "Dengan begitu, Anda tahu apa yang perlu didahulukan untuk rumah Anda sendiri."

Final call to action, shown inside a calm blue-tint box:
Final sub line: "Hanya perlu sekitar dua menit untuk mendapatkan gambaran yang lebih jelas."
Final button: "Mulai Assessment"
Final reassurance line under the button: "Gratis, tanpa komitmen, dan tanpa percakapan."

### CONTENT — QUESTIONNAIRE

Nine questions, in this order. Follow the answer format for each exactly.

1. "Berapa tempat tidur yang dipakai untuk tidur setiap malam di rumah Anda?" — Answer format: free numeric input, whole number only.
2. "Apakah ada sofa berbahan kain di ruang keluarga?" — Answer format: Ya or Tidak.
3. "Apakah ada kamar tamu yang jarang dipakai?" — Answer format: Ya or Tidak.
4. "Apakah ada karpet atau kursi berbahan kain lainnya?" — Answer format: Ya or Tidak.
5. "Apakah tempat tidur utama sudah dipakai lebih dari tiga tahun?" — Answer format: Ya or Tidak.
6. "Apakah kasur atau sofa di rumah Anda pernah dibersihkan secara profesional sebelumnya?" — Answer format: Ya or Tidak.
7. "Apakah ada anak kecil, orang tua, atau hewan peliharaan di rumah?" — Answer format: Ya or Tidak.
8. "Apakah ada rencana atau acara yang membuat rumah ramai dalam tiga bulan ke depan?" — Answer format: Ya or Tidak.
9. "Kalau ada satu ruangan yang paling ingin Anda bereskan lebih dulu, ruangan mana?" — Answer format: multiple choice, single answer, clickable options. Options: "Kamar utama", "Kamar anak", "Kamar tamu", "Ruang keluarga", "Ruang lain".

### SCORING

Produce one hidden internal score from 0 to 100, then map it to one of three result categories. Only questions 2 to 8 contribute to the score. Question 1 and question 9 never affect the score.

Point rules, applied to the 0 to 100 score:
- Q1: does not score. Store the number as the count of primary beds, used privately to size follow-up, never shown.
- Q2: does not score. If Ya, add 1 to an internal item count.
- Q3: does not score. If Ya, add 1 to an internal item count.
- Q4: does not score. If Ya, add 1 to an internal item count.
- Q5, tempat tidur utama lebih dari tiga tahun: Tidak gives 25 points, Ya gives 0. Older bedding lowers the score.
- Q6, pernah dibersihkan profesional: Ya gives 25 points, Tidak gives 0. Never professionally cleaned lowers the score.
- Q7, ada anak, lansia, atau hewan: Tidak gives 25 points, Ya gives 0. Heavier use lowers the score.
- Q8, ada acara ramai dalam tiga bulan: Tidak gives 25 points, Ya gives 0.

Maximum score is 25 + 25 + 25 + 25 = 100. Minimum is 0.

Map the score to three categories:
- Low: 0 to 39
- Medium: 40 to 74
- High: 75 to 100

Note for whoever sets this up: these weights and thresholds are a first draft to satisfy setup, not calibrated values. They must be re-tuned after the first fifty real bookings. Do not present them to respondents as precise.

### CONTENT — RESULT PAGE

Show the category the respondent falls into. Use exactly this Indonesian copy for each category, unchanged.

Low:
"Ini adalah awal baik untuk mengenal lebih dalam rumah Anda.

Rumah Anda baru saja memulai perjalanan perawatan yang lebih baik. Beberapa area dan item rumah mungkin belum sempat tersentuh secara rutin, namun setiap langkah kecil sudah membawa perubahan positif.

Beberapa ruang dan item seperti kamar tidur utama atau sofa ruang tengah sudah menjadi perhatian Anda. Sementara itu, ada area yang mungkin belum sempat diperhatikan seperti kamar anak, karpet harian, atau kasur tambahan.

Rumah yang dirawat secara bertahap akan semakin mendukung suasana istirahat yang lebih nyaman dan ritme harian yang lebih tenang. Setiap perubahan kecil hari ini adalah investasi untuk ketenangan keluarga di masa depan."

Medium:
"Anda sudah memulai perawatan. Langkah yang bagus.

Rumah Anda sudah berada di jalur perawatan yang cukup baik. Beberapa area dan item rumah tampaknya sudah mulai mendapatkan perhatian secara berkala, meskipun masih ada ruang untuk membuat rutinitas perawatan menjadi lebih konsisten.

Area seperti kamar tidur utama, sofa ruang tengah, atau kasur yang sering digunakan mungkin sudah cukup terjaga. Namun, beberapa bagian lain seperti kamar anak, karpet harian, kasur tambahan, atau sofa yang jarang terlihat tetap perlu mendapat perhatian agar kebersihan rumah terasa lebih menyeluruh.

Dengan menjaga ritme perawatan secara bertahap, rumah akan semakin mendukung suasana istirahat yang nyaman, udara yang lebih segar, dan aktivitas keluarga yang lebih tenang. Langkah yang sudah Anda mulai hari ini bisa menjadi dasar yang baik untuk menciptakan rumah yang lebih sehat dan menyenangkan setiap hari."

High:
"Perawatan rumah Anda sudah berjalan dengan baik.

Rumah Anda sudah menunjukkan kebiasaan perawatan yang cukup konsisten. Beberapa area dan item penting tampaknya telah mendapat perhatian dengan baik, sehingga suasana rumah lebih mendukung kenyamanan, kebersihan, dan ketenangan keluarga sehari-hari.

Area seperti kamar tidur utama, sofa ruang tengah, kasur yang sering digunakan, hingga beberapa item rumah lainnya kemungkinan sudah masuk dalam rutinitas perawatan Anda. Ini adalah tanda bahwa Anda sudah memiliki kesadaran yang baik dalam menjaga kualitas ruang istirahat dan aktivitas keluarga.

Dengan mempertahankan kebiasaan ini, rumah akan terasa semakin nyaman, segar, dan menyenangkan untuk ditinggali. Perawatan yang sudah berjalan baik hari ini menjadi fondasi penting untuk menjaga kesehatan dan kenyamanan keluarga dalam jangka panjang."

Below every result category, show this same call to action block, unchanged, for all three categories:
"Lihat Langsung Proses Perawatan di Rumah Anda. Ingin tahu bagaimana HydroAllergenic® bekerja menjaga rumah tetap nyaman dan mendukung istirahat keluarga? Jadwalkan demonstrasi di rumah Anda dan temukan proses MicroTech-Ray® UV+O₃ yang telah dipercaya banyak keluarga."
With one button: "Jadwalkan demonstrasi".

### FORMAT OUTPUT

- All respondent-facing text in formal Indonesian with "Anda".
- Prose in the result, no bullet lists inside any headline or call to action.
- No exclamation marks. No em dashes. No emoji anywhere.
- Q1 is a numeric input. Q9 is single-select clickable options. Q2 to Q8 are Ya or Tidak.
- Visual: single brand color HydroClean Blue #00AED0, supporting Blue Light #5FCBE8, Blue Tint #D4F0F7, White #FFFFFF, Pale Gray #F2F4F6, Charcoal #1F2A30. Font DM Sans only. Reserve strong blue for accents, use blue tint for calm section backgrounds as in the landing layout. No stock imagery of mites or dirty water.

### GUARDRAILS

- Never ask about the body, symptoms, allergies, breathing, or anyone's health. Every question is about the house only. This is a legal line.
- Never show a price, discount, saving, or per-item cost comparison anywhere.
- Never use fear framing. Words like tungau or alergen may appear only as light supporting proof, never in a headline. The result names untreated surfaces, never dangers.
- Do not stop at "clean". Every result bridges to rest, a calmer home, or family peace of mind.
- Do not invent scarcity, countdown, or deadline of any kind.
- Do not invent testimonials, statistics, or customer names.
- Trademark formatting exact: HydroAllergenic®, MicroTech-Ray® UV+O₃.
- Health or statistical claims may appear only as light supporting proof, never as a headline, and only where already approved.
- The tagline "Rest, assured." is internal only. Never print it on any respondent-facing screen.

## PROMPT (selesai di sini)

---

## Catatan setelah generate

- Bobot dan ambang tiga kategori adalah draft. Kalibrasi terhadap 50 booking pertama sebelum dipercaya. Perhatikan bahwa dengan hanya empat pertanyaan penyumbang skor, nilai akhir yang mungkin cuma kelipatan 25 (0, 25, 50, 75, 100), sehingga tiap responden akan mendarat cukup kaku di salah satu dari tiga kategori. Ini keterbatasan bawaan set sembilan pertanyaan, bukan pilihan penilaian. Kalau Anda mau gradasi lebih halus, itu argumen untuk set empat belas pertanyaan.
- Wording result page saya biarkan persis seperti yang Anda lampirkan, dengan satu penyesuaian kecil: tanda seru di akhir paragraf low dan pada "Langkah yang bagus" saya ubah jadi titik, karena aturan brand melarang tanda seru. Kalau Anda mau tetap ada tanda seru khusus di sini, beri tahu saya, itu keputusan pengecualian.
- Landing page saya transkrip dari dua foto. Kalau ada baris yang salah baca, koreksi dan saya perbaiki.
- Eyebrow hero saya tulis "REST ASSURED SCORE". Di foto tertulis "BEST ASSURED SCORE", tapi saya menduga itu typo dari nama scorecard Anda, "Rest Assured". Saya tidak mengubahnya diam-diam sebagai fakta. Konfirmasi mana yang benar, dan saya samakan.
- Section proses di landing baru menyebut "beberapa pertanyaan singkat", bukan "sembilan pertanyaan" seperti draft landing sebelumnya. Isi kuesionernya tetap sembilan. Kalau Anda mau angka sembilan disebut eksplisit di landing, beri tahu saya.
- Cek apakah ScoreApp bisa menyembunyikan skor internal dan hanya menampilkan kategori, karena penilaian ini dirancang begitu. Saya tidak tahu kapabilitas persisnya.
