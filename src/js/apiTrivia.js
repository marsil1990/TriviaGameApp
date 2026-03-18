export async function ApiTriviaGame(category, difficulty, amount) {
  const res = await fetch(
    `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`,
  );
  console.log(res);
  if (!res.ok) {
    throw new Error("Failed to fetch trivia questions.");
  }
  const data = await res.json();
  if (data.response_code !== 0) {
    throw new Error("No questions were returned by the trivia API.");
  }
  console.log(data.results);
}
