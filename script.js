// ===== Skor Rest Assured — quiz logic =====

const WA_ADMIN = "6281293321250";
// TODO(Ais): ganti dengan URL Web App Google Apps Script setelah setup (lihat SETUP-SHEET.md)
const GAS_WEBHOOK_URL = "";

const QUESTIONS = [
  { id: 1, type: "number", text: "Berapa tempat tidur yang dipakai untuk tidur setiap malam di rumah Anda?", placeholder: "Contoh: 3" },
  { id: 2, type: "yn", text: "Apakah ada sofa berbahan kain di ruang keluarga?" },
  { id: 3, type: "yn", text: "Apakah ada kamar tamu yang jarang dipakai?" },
  { id: 4, type: "yn", text: "Apakah ada karpet atau kursi berbahan kain lainnya?" },
  { id: 5, type: "yn", text: "Apakah tempat tidur utama sudah dipakai lebih dari tiga tahun?" },
  { id: 6, type: "yn", text: "Apakah kasur atau sofa di rumah Anda pernah dibersihkan secara profesional sebelumnya?" },
  { id: 7, type: "yn", text: "Apakah ada anak kecil, orang tua, atau hewan peliharaan di rumah?" },
  { id: 8, type: "yn", text: "Apakah ada rencana atau acara yang membuat rumah ramai dalam tiga bulan ke depan?" },
  { id: 9, type: "multi", text: "Kalau ada satu ruangan yang paling ingin Anda bereskan lebih dulu, ruangan mana?",
    options: ["Kamar utama", "Kamar anak", "Kamar tamu", "Ruang keluarga", "Ruang lain"] },
];

const state = {
  current: 0,
  answers: {}, // qid -> value
};

function $(sel) { return document.querySelector(sel); }
function show(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

function startQuiz() {
  state.current = 0;
  show("screen-quiz");
  renderQuestion();
}

function updateProgress() {
  const pct = Math.round(((state.current) / QUESTIONS.length) * 100);
  $("#progressFill").style.width = pct + "%";
}

function renderQuestion() {
  updateProgress();
  const q = QUESTIONS[state.current];
  const body = $("#quizBody");
  let html = `<div class="q-eyebrow">PERTANYAAN ${state.current + 1} DARI ${QUESTIONS.length}</div>`;
  html += `<div class="q-text">${q.text}</div>`;

  if (q.type === "yn") {
    html += `<div class="options">
      <button type="button" class="option-btn ${state.answers[q.id] === "Ya" ? "selected" : ""}" onclick="answerAndNext(${q.id}, 'Ya')">Ya</button>
      <button type="button" class="option-btn ${state.answers[q.id] === "Tidak" ? "selected" : ""}" onclick="answerAndNext(${q.id}, 'Tidak')">Tidak</button>
    </div>`;
  } else if (q.type === "single") {
    html += `<div class="options">` + q.options.map(opt =>
      `<button type="button" class="option-btn ${state.answers[q.id] === opt ? "selected" : ""}" onclick="answerAndNext(${q.id}, '${opt.replace(/'/g, "\\'")}')">${opt}</button>`
    ).join("") + `</div>`;
  } else if (q.type === "multi") {
    const selected = Array.isArray(state.answers[q.id]) ? state.answers[q.id] : [];
    html += `<div class="multi-hint">Pilih minimal satu ruangan. Boleh pilih lebih dari satu.</div>`;
    html += `<div class="options">` + q.options.map(opt => {
      const isSel = selected.includes(opt);
      return `<button type="button" class="option-btn multi ${isSel ? "selected" : ""}" onclick="toggleMulti(${q.id}, '${opt.replace(/'/g, "\\'")}')">
        <span class="checkbox-box"><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.2 11.5L13 4.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        ${opt}
      </button>`;
    }).join("") + `</div>`;
  } else if (q.type === "number") {
    const val = state.answers[q.id] ?? "";
    html += `<div class="num-input-row">
      <input type="number" id="numInput" min="0" step="1" inputmode="numeric" placeholder="${q.placeholder}" value="${val}">
    </div>`;
  }

  html += `<div class="q-nav">
    <button type="button" class="link-btn" onclick="prevQuestion()" ${state.current === 0 ? 'style="visibility:hidden"' : ""}>Kembali</button>
    ${q.type === "number" ? `<button type="button" class="btn" onclick="submitNumber(${q.id})">Lanjut</button>` : ""}
    ${q.type === "multi" ? `<button type="button" class="btn" id="multiNextBtn" onclick="submitMulti(${q.id})">Lanjut</button>` : ""}
  </div>`;

  body.innerHTML = html;

  if (q.type === "number") {
    const input = document.getElementById("numInput");
    input.focus();
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") submitNumber(q.id); });
  }
}

function submitNumber(qid) {
  const input = document.getElementById("numInput");
  const val = parseInt(input.value, 10);
  if (isNaN(val) || val < 0) {
    input.style.borderColor = "#e0554f";
    input.focus();
    return;
  }
  state.answers[qid] = val;
  goNext();
}

function toggleMulti(qid, option) {
  const current = Array.isArray(state.answers[qid]) ? state.answers[qid].slice() : [];
  const idx = current.indexOf(option);
  if (idx >= 0) {
    current.splice(idx, 1);
  } else {
    current.push(option);
  }
  state.answers[qid] = current;
  renderQuestion();
}

function submitMulti(qid) {
  const current = Array.isArray(state.answers[qid]) ? state.answers[qid] : [];
  if (current.length < 1) {
    const btn = document.getElementById("multiNextBtn");
    if (btn) {
      btn.style.background = "#e0554f";
      setTimeout(() => { btn.style.background = ""; }, 600);
    }
    return;
  }
  goNext();
}

function answerAndNext(qid, value) {
  state.answers[qid] = value;
  setTimeout(goNext, 150);
}

function goNext() {
  if (state.current < QUESTIONS.length - 1) {
    state.current += 1;
    renderQuestion();
  } else {
    // finished all 9 questions -> lead capture
    updateProgress();
    $("#progressFill").style.width = "100%";
    show("screen-lead");
  }
}

function prevQuestion() {
  if (state.current > 0) {
    state.current -= 1;
    renderQuestion();
  }
}

function goToQuestion(index) {
  state.current = index;
  show("screen-quiz");
  renderQuestion();
}

// ===== scoring =====
function computeScore() {
  let score = 0;
  score += state.answers[5] === "Tidak" ? 25 : 0;
  score += state.answers[6] === "Ya" ? 25 : 0;
  score += state.answers[7] === "Tidak" ? 25 : 0;
  score += state.answers[8] === "Tidak" ? 25 : 0;
  return score;
}

function categoryFor(score) {
  if (score <= 39) return "low";
  if (score <= 74) return "medium";
  return "high";
}

const RESULT_COPY = {
  low: `<p>Ini adalah awal baik untuk mengenal lebih dalam rumah Anda.</p>
<p>Rumah Anda baru saja memulai perjalanan perawatan yang lebih baik. Beberapa area dan item rumah mungkin belum sempat tersentuh secara rutin, namun setiap langkah kecil sudah membawa perubahan positif.</p>
<p>Beberapa ruang dan item seperti kamar tidur utama atau sofa ruang tengah sudah menjadi perhatian Anda. Sementara itu, ada area yang mungkin belum sempat diperhatikan seperti kamar anak, karpet harian, atau kasur tambahan.</p>
<p>Rumah yang dirawat secara bertahap akan semakin mendukung suasana istirahat yang lebih nyaman dan ritme harian yang lebih tenang. Setiap perubahan kecil hari ini adalah investasi untuk ketenangan keluarga di masa depan.</p>`,
  medium: `<p>Anda sudah memulai perawatan. Langkah yang bagus.</p>
<p>Rumah Anda sudah berada di jalur perawatan yang cukup baik. Beberapa area dan item rumah tampaknya sudah mulai mendapatkan perhatian secara berkala, meskipun masih ada ruang untuk membuat rutinitas perawatan menjadi lebih konsisten.</p>
<p>Area seperti kamar tidur utama, sofa ruang tengah, atau kasur yang sering digunakan mungkin sudah cukup terjaga. Namun, beberapa bagian lain seperti kamar anak, karpet harian, kasur tambahan, atau sofa yang jarang terlihat tetap perlu mendapat perhatian agar kebersihan rumah terasa lebih menyeluruh.</p>
<p>Dengan menjaga ritme perawatan secara bertahap, rumah akan semakin mendukung suasana istirahat yang nyaman, udara yang lebih segar, dan aktivitas keluarga yang lebih tenang. Langkah yang sudah Anda mulai hari ini bisa menjadi dasar yang baik untuk menciptakan rumah yang lebih sehat dan menyenangkan setiap hari.</p>`,
  high: `<p>Perawatan rumah Anda sudah berjalan dengan baik.</p>
<p>Rumah Anda sudah menunjukkan kebiasaan perawatan yang cukup konsisten. Beberapa area dan item penting tampaknya telah mendapat perhatian dengan baik, sehingga suasana rumah lebih mendukung kenyamanan, kebersihan, dan ketenangan keluarga sehari-hari.</p>
<p>Area seperti kamar tidur utama, sofa ruang tengah, kasur yang sering digunakan, hingga beberapa item rumah lainnya kemungkinan sudah masuk dalam rutinitas perawatan Anda. Ini adalah tanda bahwa Anda sudah memiliki kesadaran yang baik dalam menjaga kualitas ruang istirahat dan aktivitas keluarga.</p>
<p>Dengan mempertahankan kebiasaan ini, rumah akan terasa semakin nyaman, segar, dan menyenangkan untuk ditinggali. Perawatan yang sudah berjalan baik hari ini menjadi fondasi penting untuk menjaga kesehatan dan kenyamanan keluarga dalam jangka panjang.</p>`,
};

const BADGE_LABEL = { low: "PERLU PERHATIAN", medium: "SUDAH DI JALUR YANG BAIK", high: "PERAWATAN BERJALAN BAIK" };

function submitLead() {
  const name = $("#leadName").value.trim();
  const phone = $("#leadPhone").value.trim();
  if (!name || !phone) {
    if (!name) $("#leadName").style.borderColor = "#e0554f";
    if (!phone) $("#leadPhone").style.borderColor = "#e0554f";
    return;
  }
  state.answers.name = name;
  state.answers.phone = phone;

  const score = computeScore();
  const category = categoryFor(score);

  renderResult(category, score);
  sendLead(name, phone, score, category);
  show("screen-result");
}

function renderResult(category, score) {
  $("#resultCopy").innerHTML = RESULT_COPY[category];

  const numEl = $("#scoreCardNum");
  const barEl = $("#scoreCardBarFill");
  const catEl = $("#scoreCardCat");
  numEl.textContent = score + "%";
  numEl.className = "score-card-num cat-" + category;
  barEl.className = "score-card-bar-fill cat-" + category;
  barEl.style.width = score + "%";
  catEl.textContent = BADGE_LABEL[category];
  catEl.className = "score-card-cat cat-" + category;

  const rooms = Array.isArray(state.answers[9]) ? state.answers[9] : [];
  const roomText = rooms.length ? rooms.join(", ") : "belum dipilih";
  const waText = encodeURIComponent(
    `[Skor Rest Assured] Halo admin, saya baru selesai assessment Skor Rest Assured. Kategori hasil saya: ${category} (${score}%). Ruangan prioritas: ${roomText}. Saya ingin jadwalkan demonstrasi.`
  );
  $("#resultCtaBtn").href = `https://api.whatsapp.com/send?phone=${WA_ADMIN}&text=${waText}`;
}

function shareToInstagram() {
  const text = "Saya baru selesai Skor Rest Assured dari HydroClean, coba juga di sini: " + window.location.href;
  if (navigator.share) {
    navigator.share({ title: "Skor Rest Assured — HydroClean", text, url: window.location.href }).catch(() => {});
  } else {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("Link disalin. Tempel di caption atau story Instagram Anda.");
    }).catch(() => {
      alert("Buka Instagram dan tempel link ini: " + window.location.href);
    });
  }
}

function sendLead(name, phone, score, category) {
  if (!GAS_WEBHOOK_URL) return; // belum di-setup, skip diam-diam
  const payload = {
    name,
    phone,
    score,
    category,
    primaryBeds: state.answers[1] ?? null,
    q2_sofaKain: state.answers[2] ?? null,
    q3_kamarTamu: state.answers[3] ?? null,
    q4_karpet: state.answers[4] ?? null,
    q5_kasurLama: state.answers[5] ?? null,
    q6_pernahProfesional: state.answers[6] ?? null,
    q7_anakLansiaHewan: state.answers[7] ?? null,
    q8_acaraRamai: state.answers[8] ?? null,
    q9_ruangPrioritas: Array.isArray(state.answers[9]) ? state.answers[9].join(", ") : (state.answers[9] ?? null),
    timestamp: new Date().toISOString(),
  };
  fetch(GAS_WEBHOOK_URL, {
    method: "POST",
    mode: "no-cors", // Apps Script web app tidak selalu kirim CORS header; no-cors cukup untuk fire-and-forget
    headers: { "Content-Type": "text/plain" }, // hindari CORS preflight
    body: JSON.stringify(payload),
  }).catch(() => { /* diam-diam gagal, jangan blokir user */ });
}
