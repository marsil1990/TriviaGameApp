import { getCountriesFromAPI } from "../js/countries";

async function renderCountriesCard() {
  const card = document.querySelector(".country-card");
  if (!card) return "";
  try {
    const country = await getCountriesFromAPI();
    card.innerHTML = `
      <h2>Learn a random fact about a country.</h2>
      <img src="${country.flags?.png || ""}" alt="Flag of ${country.name.common}" class="flag-image">
      <p><strong>Name:</strong> ${country.name.common}</p>
      <p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>
      <p><strong>Region:</strong> ${country.region || "N/A"}</p>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
    `;
  } catch (error) {
    card.innerHTML = "<p>Country information could not be loaded.</p>";
    console.error(error);
  }
}

renderCountriesCard();
