const baseURL = import.meta.env.VITE_SERVER_URL_TRIVIA;

export async function ApiTriviaGame(category, difficulty, amount) {
  const res = await fetch(
    `${baseURL}amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch trivia questions.");
  }
  const data = await res.json();
  if (data.response_code !== 0) {
    throw new Error("No questions were returned by the trivia API.");
  }

  return data.results;
}
