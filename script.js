const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];


const quizContainer = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDisplay = document.getElementById("score");

const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreDisplay.textContent = `Your last score was ${savedScore} out of ${questions.length}.`;
}

const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

questions.forEach((q, i) => {
  const qDiv = document.createElement("div");
  qDiv.innerHTML = `<p><strong>${q.question}</strong></p>`;
  q.options.forEach((opt, j) => {
    const id = `q${i}_opt${j}`;
    const checked = savedProgress[i] === j ? "checked" : "";
    qDiv.innerHTML += `
      <label>
        <input type="radio" name="q${i}" value="${j}" ${checked}> ${opt}
      </label>`;
  });
  quizContainer.appendChild(qDiv);
});

quizContainer.addEventListener("change", (e) => {
  if (e.target.name.startsWith("q")) {
    const qIndex = parseInt(e.target.name.slice(1));
    const ans = parseInt(e.target.value);

    savedProgress[qIndex] = ans;
    sessionStorage.setItem("progress", JSON.stringify(savedProgress));
  }
});

submitBtn.addEventListener("click", () => {
  let score = 0;
  questions.forEach((q, i) => {
    if (savedProgress[i] === q.correct) score++;
  });

  scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}.`;

  localStorage.setItem("score", score);
});