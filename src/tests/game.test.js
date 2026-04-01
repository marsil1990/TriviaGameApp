import { Game } from "../js/game";

describe("Game class", () => {
  const questions = [
    {
      question: "2 + 2",
      correct_answer: "4",
      incorrect_answers: ["1", "2", "3"],
    },
  ];

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="score"></div>
      <div id="progress"></div>
      <div id="question-text"></div>
      <div id="answer-question"></div>
    `;
  });

  test("setCorrectAnswer sets the current correct answer", () => {
    const game = new Game(questions);
    game.setCorrectAnswer();

    expect(game.correctAnswer).toBe("4");
  });

  test("checkAnswer returns true for a correct answer", () => {
    const game = new Game(questions);
    game.setCorrectAnswer();

    const result = game.checkAnswer("4");

    expect(result).toBe(true);
    expect(game.score).toBe(1);
  });

  test("checkAnswer returns false for a wrong answer", () => {
    const game = new Game(questions);
    game.setCorrectAnswer();

    const result = game.checkAnswer("3");

    expect(result).toBe(false);
    expect(game.score).toBe(0);
  });
});
