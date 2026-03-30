import { Game } from "./game";
import { getLocalStorage, decodeHTML } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const next = document.getElementById("next-question-btn");

const questions = getLocalStorage("game");
const game = new Game(questions);
game.init();
game.setCorrectAnswer();

next.addEventListener("click", () => {
  game.nextQuestion();
});

document.addEventListener("submit", (e) => {
  if (e.target.id === "answer-form") {
    e.preventDefault(); // evita que se envíe
    if (!e.target.checkValidity()) {
      alert("Complete all fields");
    }

    // e.preventDefault();
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) return;
    game.checkAnswer(selected.value);
    const submitButton = document.getElementById("submit-answer");
    submitButton.disabled = true;
    next.disabled = false;
    next.addEventListener("click", () => {
      next.disabled = true;
    });
  }
});
