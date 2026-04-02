import { Game } from "./game";
import { getLocalStorage, decodeHTML } from "./utils.mjs";
import { loadHeaderFooter, updateGamesCount } from "./utils.mjs";

const next = document.getElementById("next-question-btn");

const questions = getLocalStorage("game");
if (!questions || !questions.length) {
  alert("No questions were loaded. Please start a new game.");
  window.location.href = "/index.html";
} else {
  const game = new Game(questions);
  game.init();
  game.setCorrectAnswer();

  next.addEventListener("click", () => {
    game.nextQuestion();
    next.disabled = true;
  });

  document.addEventListener("submit", (e) => {
    if (e.target.id === "answer-form") {
      e.preventDefault();
      if (!e.target.checkValidity()) {
        alert("Complete all fields");
      }

      const selected = document.querySelector('input[name="answer"]:checked');
      if (!selected) return;
      game.checkAnswer(selected.value);
      const submitButton = document.getElementById("submit-answer");
      submitButton.disabled = true;
      next.disabled = false;
    }
  });
}

async function init() {
  await loadHeaderFooter();
  updateGamesCount();
}

init();
