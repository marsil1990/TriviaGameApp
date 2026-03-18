export class Game {
  constructor(questions, correctAnswer) {
    this.questions = questions;
    this.index = 0;
    this.score = 0;
    this.correctAnswer = correctAnswer;
  }

  getCurrentQuestion() {
    return this.questions[this.index];
  }

  setNextIndex() {
    if (this.index < this.questions.length) {
      this.index++;
    }
  }

  checkAnswer(selectAnswer) {
    if (this.correctAnswer == selectAnswer) {
      this.score++;
      return true;
    } else return false;
  }
}
