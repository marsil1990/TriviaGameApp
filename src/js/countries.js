export async function getCountriesFromAPI() {
  const data = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags",
  );
  if (!data.ok) {
    throw new Error("Failed to fetch country data.");
  }

  const countries = await data.json();
  const randomIndex = Math.floor(Math.random() * countries.length);
  return countries[randomIndex];
}
