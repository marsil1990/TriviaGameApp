import {
  mixQuestion,
  decodeHTML,
  setLocalStorage,
  getLocalStorage,
} from "./utils.mjs";
export class Game {
  constructor(questions) {
    this.questions = questions;
    this.index = 0;
    this.score = 0;
    this.correctAnswer;
  }
  init() {
    this.renderGame();
  }

  setCorrectAnswer() {
    return (this.correctAnswer = this.questions[this.index].correct_answer);
  }
  getCurrentQuestion() {
    return this.questions[this.index];
  }

  nextQuestion() {
    if (this.index < this.questions.length - 1) {
      this.index++;
      this.setCorrectAnswer();
      this.renderGame();
    } else {
      this.finishGame();
    }
  }

  checkAnswer(selectAnswer) {
    const score = document.getElementById("score");
    const numberOfquestion = document.getElementById("progress");
    console.log(this.correctAnswer == selectAnswer);
    console.log(this.correctAnswer, selectAnswer);
    if (this.correctAnswer == selectAnswer) {
      this.score++;
      score.innerHTML = `Score: ${this.score} correct`;
      numberOfquestion.innerHTML = `Question: ${this.index + 1} / ${this.questions.length}`;
      return true;
    } else {
      score.innerHTML = `Score: ${this.score} correct`;
      numberOfquestion.innerHTML = `Question: ${this.index + 1} / ${this.questions.length}`;
      return false;
    }
  }

  finishGame() {
    const result = {
      score: this.score,
      totalQuestions: this.questions.length,
      percentage: Math.round((this.score / this.questions.length) * 100),
      date: new Date().toISOString(),
    };
    setLocalStorage("lastGameResult", result);
    const history = getLocalStorage("gameHistory") || [];
    history.push(result);
    setLocalStorage("gameHistory", history);

    window.location.href = "/results/results.html";
  }

  renderGame() {
    const container = document.getElementById("answer-question");
    const question = document.getElementById("question-text");
    const score = document.getElementById("score");
    const numberOfquestion = document.getElementById("progress");
    score.innerHTML = `Score: ${this.score} correct`;
    numberOfquestion.innerHTML = `Question: ${this.index + 1} / ${this.questions.length}`;

    question.textContent = "";
    container.innerHTML = "";
    question.textContent = decodeHTML(this.questions[this.index].question);

    container.innerHTML = `
    <form id="answer-form">
      ${mixQuestion(this.questions[this.index])
        .map(
          (answer, index) => `
          <label>
            <input type="radio" name="answer" value="${answer}">
            ${answer}
          </label><br>
        `,
        )
        .join("")}
      <button type="submit" id="submit-answer">Submit</button>
    </form>
  `;
  }
}
