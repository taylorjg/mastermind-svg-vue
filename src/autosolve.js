import PromiseWorker from 'promise-worker'
import { evaluatesToSameScore } from './logic'
import * as C from './constants'

const worker = new Worker('./autosolve-worker.js', { type: 'module' })
const promiseWorker = new PromiseWorker(worker)

export const generateGuessAsync = async (untried, attempt) => {

  const guess = untried.length === C.ALL_CODES.length
    ? C.INITIAL_GUESS
    : untried.length === 1
      ? untried[0]
      : await promiseWorker.postMessage({ type: 'findBest', untried })

  const score = attempt(guess)

  return {
    guess,
    untried: untried.filter(evaluatesToSameScore(guess, score))
  }
}
