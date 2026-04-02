import { homePage, renderCountriesCard } from "./index";
import { loadHeaderFooter, updateGamesCount } from "./utils.mjs";

async function init() {
  await loadHeaderFooter();
  updateGamesCount();
  homePage();
  renderCountriesCard();
}

init();
