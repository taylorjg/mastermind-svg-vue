import { evaluateGuess } from "./logic";
import { P, PEGS } from "./constants";
import { runParallelSubTasksAsync } from "./parallelSubTasks";

export const ALL_COMBINATIONS =
  Array.from(function* () {
    for (const a of PEGS)
      for (const b of PEGS)
        for (const c of PEGS)
          for (const d of PEGS)
            yield [a, b, c, d];
  }());

const INITIAL_GUESS = [P.R, P.R, P.G, P.G];

export const generateGuessAsync = async (set, attempt) => {

  const guess = set.length === ALL_COMBINATIONS.length
    ? INITIAL_GUESS
    : (set.length === 1
      ? set[0]
      : await runParallelSubTasksAsync(set));

  const score = attempt(guess);

  return {
    guess,
    set: set.filter(evaluatesToSameFeedback(guess, score))
  };
};

const evaluatesToSameFeedback = (code1, feedback) => code2 =>
  sameFeedback(evaluateGuess(code1, code2), feedback);

const sameFeedback = (fb1, fb2) =>
  fb1.blacks === fb2.blacks && fb1.whites === fb2.whites;
