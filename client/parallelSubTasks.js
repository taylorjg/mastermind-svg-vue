import hamsters from 'hamsters.js'
import { PEGS } from './constants'
import { ALL_COMBINATIONS } from './autosolve'

hamsters.init({
  browser: true,
  reactNative: false,
  node: false
})

const range = n => Array.from(Array(n).keys())

const minBy = (xs, f) =>
  xs.reduce((acc, x) => f(x) < f(acc) ? x : acc)

const ALL_SCORES =
  Array.from(function* () {
    for (const blacks of range(5))
      for (const whites of range(5))
        yield { blacks, whites }
  }())
    .filter(fb => fb.blacks + fb.whites <= 4)
    .filter(fb => !(fb.blacks === 3 && fb.whites === 1))

export const runParallelSubTasksAsync = set => {

  const combineSubTaskResults = subTaskResults =>
    minBy(subTaskResults, x => x.min).guess

  const params = {
    array: ALL_COMBINATIONS,
    threads: hamsters.maxThreads,
    set,
    ALL_SCORES,
    PEGS
  }

  // TODO: use hamsters.promise instead of Promise + hamsters.run
  // However, at the moment, I get the following error:
  //   ReferenceError: scaffold is not defined
  // Some discussion of it here:
  // https://github.com/austinksmith/Hamsters.js/issues/50#issuecomment-377788588
  return new Promise(resolve => {
    hamsters.run(
      params,
      subTask,
      function (rtn) {
        const guess = combineSubTaskResults(rtn.data)
        resolve(guess)
      }
    )
  })
}

const subTask = () => {

  /* eslint-disable no-undef */
  const hamstersParams = params
  const hamstersRtn = rtn
  /* eslint-enable no-undef */

  const ALL_COMBINATIONS_CHUNK = hamstersParams.array
  const set = hamstersParams.set
  const ALL_SCORES = hamstersParams.ALL_SCORES
  const PEGS = hamstersParams.PEGS

  const countOccurrenciesOfPeg = (peg, code) => {
    return (
      (peg === code[0] ? 1 : 0) +
      (peg === code[1] ? 1 : 0) +
      (peg === code[2] ? 1 : 0) +
      (peg === code[3] ? 1 : 0)
    )
  }

  const countMatchingPegsByPosition = (code1, code2) => {
    return (
      (code1[0] === code2[0] ? 1 : 0) +
      (code1[1] === code2[1] ? 1 : 0) +
      (code1[2] === code2[2] ? 1 : 0) +
      (code1[3] === code2[3] ? 1 : 0)
    )
  }

  const evaluateScore = (code1, code2) => {
    let sumOfMinOccurrencies = 0
    PEGS.forEach(peg => {
      const numOccurrencies1 = countOccurrenciesOfPeg(peg, code1)
      const numOccurrencies2 = countOccurrenciesOfPeg(peg, code2)
      const minOccurrencies = Math.min(numOccurrencies1, numOccurrencies2)
      sumOfMinOccurrencies += minOccurrencies
    })
    const blacks = countMatchingPegsByPosition(code1, code2)
    const whites = sumOfMinOccurrencies - blacks
    return { blacks, whites }
  }

  const sameScore = (score1, score2) =>
    score1.blacks === score2.blacks && score1.whites === score2.whites

  const evaluatesToSameScore = (code1, score) => code2 =>
    sameScore(evaluateScore(code1, code2), score)

  const countWithPredicate = (xs, p) =>
    xs.reduce((acc, x) => acc + (p(x) ? 1 : 0), 0)

  const seed = { min: Number.MAX_VALUE }
  hamstersRtn.data = ALL_COMBINATIONS_CHUNK.reduce(
    (currentBest, unusedCode) => {
      const max = ALL_SCORES.reduce(
        (currentMax, score) => {
          const count = countWithPredicate(set, evaluatesToSameScore(unusedCode, score))
          return Math.max(currentMax, count)
        },
        0)
      return max < currentBest.min ? { min: max, guess: unusedCode } : currentBest
    },
    seed)
}
