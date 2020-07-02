import * as C from './constants'

export const generateRandomSecret = () => {
  const chooseRandomPeg = () => {
    const randomIndex = Math.floor((Math.random() * C.ALL_PEGS.length))
    return C.ALL_PEGS[randomIndex]
  }
  return [0, 1, 2, 3].map(chooseRandomPeg)
}

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

export const evaluateScore = (code1, code2) => {
  let sumOfMinOccurrencies = 0
  C.ALL_PEGS.forEach(peg => {
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

export const evaluatesToSameScore = (code1, score) => code2 =>
  sameScore(evaluateScore(code1, code2), score)
