import { Game } from "./game";
import { getLocalStorage, decodeHTML } from "./utils.mjs";

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
    e.preventDefault();

    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) return;
    game.checkAnswer(selected.value);

    next.disabled = false;
  }
});
