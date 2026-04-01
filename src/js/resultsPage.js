import {
  getLocalStorage,
  loadHeaderFooter,
  updateGamesCount,
} from "./utils.mjs";

function loadResultsPage() {
  const lastGame = getLocalStorage("lastGameResult");
  const history = getLocalStorage("gameHistory") || [];
  const finalScore = document.getElementById("final-score");
  const finalPercentage = document.getElementById("final-percentage");
  const gamesPlayed = document.getElementById("games-played");
  const averagePercentage = document.getElementById("average-percentage");
  const bestPercentage = document.getElementById("best-percentage");
  const restartGame = document.getElementById("new-game");
  restartGame.addEventListener("click", () => {
    localStorage.clear();
  });

  if (!lastGame) {
    finalScore.textContent = "No Game Results Avaiable.";
    return;
  }
  finalScore.textContent = `Final Score: ${lastGame.score} / ${lastGame.totalQuestions}`;
  finalPercentage.textContent = `Score Percentage: ${lastGame.percentage}%`;
  gamesPlayed.textContent = `Games Played: ${history.length}`;
  const totalPercentage = history.reduce((ac, game) => ac + game.percentage, 0);
  const average = history.length
    ? Math.round(totalPercentage / history.length)
    : 0;
  let best = 0;
  if (history.length > 0) {
    const percenatges = history.map((g) => g.percentage);
    best = Math.max(...percenatges);
  }

  averagePercentage.textContent = `Average Percentage: ${average}%`;
  bestPercentage.textContent = `Best Percentage: ${best}%`;
}

async function init() {
  await loadHeaderFooter();
  loadResultsPage();
  updateGamesCount();
}

init();
