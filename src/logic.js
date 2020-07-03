import * as C from './constants'

export const randomSecret = () => {
  const randomIndex = Math.floor((Math.random() * C.ALL_CODES.length))
  return C.ALL_CODES[randomIndex]
}

const countOccurrencesOfPeg = (peg, code) =>
  (peg === code[0] ? 1 : 0) +
  (peg === code[1] ? 1 : 0) +
  (peg === code[2] ? 1 : 0) +
  (peg === code[3] ? 1 : 0)

const countMatchingPegsByPosition = (code1, code2) =>
  (code1[0] === code2[0] ? 1 : 0) +
  (code1[1] === code2[1] ? 1 : 0) +
  (code1[2] === code2[2] ? 1 : 0) +
  (code1[3] === code2[3] ? 1 : 0)

export const evaluateScore = (code1, code2) => {
  let sumOfMinOccurrences = 0
  C.ALL_PEGS.forEach(peg => {
    const numOccurrences1 = countOccurrencesOfPeg(peg, code1)
    const numOccurrences2 = countOccurrencesOfPeg(peg, code2)
    const minOccurrences = Math.min(numOccurrences1, numOccurrences2)
    sumOfMinOccurrences += minOccurrences
  })
  const blacks = countMatchingPegsByPosition(code1, code2)
  const whites = sumOfMinOccurrences - blacks
  return { blacks, whites }
}

const sameScore = (score1, score2) =>
  score1.blacks === score2.blacks && score1.whites === score2.whites

export const evaluatesToSameScore = (code1, score) => code2 =>
  sameScore(evaluateScore(code1, code2), score)
