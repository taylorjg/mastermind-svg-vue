import { PEGS } from './constants'

export const generateRandomSecret = () => {
  const chooseRandomPeg = () => {
    const randomIndex = Math.floor((Math.random() * PEGS.length))
    return PEGS[randomIndex]
  }
  return [0, 1, 2, 3].map(chooseRandomPeg)
}

export const evaluateGuess = (secret, guess) => {
  const count = (xs, p) => xs.filter(x => x === p).length
  const add = (a, b) => a + b
  const sum = PEGS.map(p => Math.min(count(secret, p), count(guess, p))).reduce(add)
  const blacks = secret.filter((peg, index) => peg === guess[index]).length
  const whites = sum - blacks
  return { blacks, whites }
}
