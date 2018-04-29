import { evaluateGuess } from "./logic";
import { P, PEGS } from "./constants";
import { runParallelSubTasksAsync} from "./parallelSubTasks";

export const ALL_COMBINATIONS =
  Array.from(function* () {
    for (const a of PEGS)
      for (const b of PEGS)
        for (const c of PEGS)
          for (const d of PEGS)
            yield [a, b, c, d];
  }());

const INITIAL_GUESS = [P.R, P.R, P.G, P.G];

export const generateGuessAsync = (set, used, lastGuess, lastFeedback) => {
  if (lastFeedback) {
    return mainAlgorithmAsync(set, used, lastGuess, lastFeedback);
  }
  else {
    return Promise.resolve({
      guess: INITIAL_GUESS,
      set,
      used: [INITIAL_GUESS]
    });
  }
};

const mainAlgorithmAsync = (set, used, lastGuess, lastFeedback) => {

  const filteredSet = set.filter(evaluatesToSameFeedback(lastGuess, lastFeedback));

  if (filteredSet.length === 1) {
    const guess = filteredSet[0];
    return Promise.resolve({
      guess,
      set: filteredSet,
      used: [...used, guess]
    });
  }

  const unused = ALL_COMBINATIONS.filter(guess => !used.find(sameGuess(guess)));

  return runParallelSubTasksAsync(filteredSet, unused)
    .then(guess => ({
      guess,
      set: filteredSet,
      used: [...used, guess]
    }));
};

const evaluatesToSameFeedback = (code1, feedback) => code2 =>
  sameFeedback(evaluateGuess(code1, code2), feedback);

const sameFeedback = (fb1, fb2) =>
  fb1.blacks === fb2.blacks && fb1.whites === fb2.whites;

const sameGuess = g1 => g2 =>
  g1.every((p, i) => p === g2[i]);
