const baseURL = import.meta.env.VITE_SERVER_URL_COUNTRY;
export async function getCountriesFromAPI() {
  const data = await fetch(baseURL);
  if (!data.ok) {
    throw new Error("Failed to fetch country data.");
  }

  const countries = await data.json();
  const randomIndex = Math.floor(Math.random() * countries.length);
  return countries[randomIndex];
}
