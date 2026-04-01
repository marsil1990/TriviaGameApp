import { ApiTriviaGame } from "../js/apiTrivia";
import { vi } from "vitest";

describe("ApiTriviaGame", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test("returns results when the API responds correctly", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          response_code: 0,
          results: [{ question: "Question 1" }],
        }),
      }),
    );

    const result = await ApiTriviaGame(9, "easy", 5);

    expect(result).toEqual([{ question: "Question 1" }]);
    expect(fetch).toHaveBeenCalled();
  });

  test("throws an error when response is not ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
      }),
    );

    await expect(ApiTriviaGame(9, "easy", 5)).rejects.toThrow(
      "Failed to fetch trivia questions.",
    );
  });

  test("throws an error when response_code is not 0", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          response_code: 1,
          results: [],
        }),
      }),
    );

    await expect(ApiTriviaGame(9, "easy", 5)).rejects.toThrow(
      "No questions were returned by the trivia API.",
    );
  });
});
