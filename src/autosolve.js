import { evaluateScore } from './logic'
import { P, ALL_PEGS } from './constants'
import { runParallelSubTasksAsync } from './parallelSubTasks'

export const ALL_COMBINATIONS =
  Array.from(function* () {
    for (const p0 of ALL_PEGS)
      for (const p1 of ALL_PEGS)
        for (const p2 of ALL_PEGS)
          for (const p3 of ALL_PEGS)
            yield [p0, p1, p2, p3]
  }())

const INITIAL_GUESS = [P.R, P.R, P.G, P.G]

export const generateGuessAsync = async (untried, attempt) => {

  const guess = untried.length === ALL_COMBINATIONS.length
    ? INITIAL_GUESS
    : (untried.length === 1
      ? untried[0]
      : await runParallelSubTasksAsync(untried))

  const score = attempt(guess)

  return {
    guess,
    untried: untried.filter(evaluatesToSameScore(guess, score))
  }
}

const evaluatesToSameScore = (code1, score) => code2 =>
  sameScore(evaluateScore(code1, code2), score)

const sameScore = (score1, score2) =>
  score1.blacks === score2.blacks && score1.whites === score2.whites
