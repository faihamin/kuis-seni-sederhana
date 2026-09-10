let allQuestions = [
    {
      question: "Tari Kecak berasal dari daerah mana?",
      options: ["Jawa Barat", "Sumatera Utara", "Bali", "Papua"],
      answer: "Bali"
    },
    {
      question: "Tari Saman berasal dari?",
      options: ["Bali", "Aceh", "Jawa Tengah", "Sulawesi"],
      answer: "Aceh"
    },
    {
      question: "Tari Piring menggunakan properti?",
      options: ["Topeng", "Piring", "Selendang", "Kipas"],
      answer: "Piring"
    },
    {
      question: "Tari Jaipong berasal dari?",
      options: ["Jawa Timur", "Jawa Barat", "Jakarta", "Riau"],
      answer: "Jawa Barat"
    },
    {
      question: "Tari Topeng biasanya menceritakan tentang?",
      options: ["Perang", "Raja dan kerajaan", "Dewa", "Petani"],
      answer: "Raja dan kerajaan"
    },
    {
      question: "Gerakan tari disebut?",
      options: ["Langkah", "Lentur", "Ritme", "Ragam gerak"],
      answer: "Ragam gerak"
    },
    {
      question: "Tari klasik biasanya ditampilkan di?",
      options: ["Pasar", "Istana", "Sekolah", "Ladang"],
      answer: "Istana"
    },
    {
      question: "Tari modern berasal dari?",
      options: ["Pengaruh budaya luar", "Tradisi", "Rakyat", "Istana"],
      answer: "Pengaruh budaya luar"
    },
    {
      question: "Properti tari digunakan untuk?",
      options: ["Menambah gerakan", "Hiasan saja", "Menambah keindahan", "Semua benar"],
      answer: "Semua benar"
    },
    {
      question: "Tari massal ditarikan oleh?",
      options: ["Satu orang", "Dua orang", "Tiga orang", "Banyak orang"],
      answer: "Banyak orang"
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let selectedQuestions = [];
  let currentPlayer = "";
  
  function startGame() {
    const nameInput = document.getElementById("player-name").value.trim();
    if (!nameInput) {
      alert("Masukkan nama terlebih dahulu!");
      return;
    }
  
    currentPlayer = nameInput;
    score = 0;
    currentQuestion = 0;
    selectedQuestions = shuffleArray([...allQuestions]).slice(0, 10);
  
    document.getElementById("main-menu").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");
  
    showQuestion();
  }
  
  function showQuestion() {
    const question = selectedQuestions[currentQuestion];
    document.getElementById("question-text").textContent = `Soal ${currentQuestion + 1}: ${question.question}`;
  
    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";
    document.getElementById("feedback").textContent = "";
  
    question.options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.onclick = () => selectAnswer(option);
      answersDiv.appendChild(btn);
    });
  }
  
  function selectAnswer(selected) {
    const correct = selectedQuestions[currentQuestion].answer;
    const feedback = document.getElementById("feedback");
  
    if (selected === correct) {
      score++;
      feedback.textContent = "Benar!";
      feedback.style.color = "green";
    } else {
      feedback.textContent = `Salah! Jawaban yang benar: ${correct}`;
      feedback.style.color = "red";
    }
  
    Array.from(document.getElementById("answers").children).forEach(btn => {
      btn.disabled = true;
    });
  }
  
  function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < selectedQuestions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
  
  function showScore() {
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("score-screen").classList.remove("hidden");
    document.getElementById("final-score").textContent = `${score} dari 10`;
  
    // Simpan skor
    const scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.push({ name: currentPlayer, score });
    localStorage.setItem("scores", JSON.stringify(scores));
  }
  
  function showHighScores() {
    document.getElementById("main-menu").classList.add("hidden");
    document.getElementById("high-scores").classList.remove("hidden");
  
    const scoreList = document.getElementById("score-list");
    scoreList.innerHTML = "";
  
    const scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .forEach(s => {
        const li = document.createElement("li");
        li.textContent = `${s.name}: ${s.score}`;
        scoreList.appendChild(li);
      });
  }
  
  function clearHighScores() {
    if (confirm("Yakin ingin menghapus semua data skor?")) {
      localStorage.removeItem("scores");
      alert("Data skor dihapus.");
    }
  }
  
  function returnToMenu() {
    document.getElementById("main-menu").classList.remove("hidden");
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("score-screen").classList.add("hidden");
    document.getElementById("high-scores").classList.add("hidden");
  }
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }