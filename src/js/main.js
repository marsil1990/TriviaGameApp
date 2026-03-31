import { homePage, renderCountriesCard } from "./index";
import { loadHeaderFooter, updateGamesCount } from "./utils.mjs";

await loadHeaderFooter();
renderCountriesCard();
updateGamesCount();
homePage();
