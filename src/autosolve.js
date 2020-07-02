import PromiseWorker from 'promise-worker'
import { evaluatesToSameScore } from './logic'
import * as C from './constants'

const webWorker = new Worker('./web-worker.js', { type: 'module' })
const webWorkerP = new PromiseWorker(webWorker)

export const generateGuessAsync = async (untried, attempt) => {

  const guess = untried.length === C.ALL_CODES.length
    ? C.INITIAL_GUESS
    : untried.length === 1
      ? untried[0]
      : await webWorkerP.postMessage({ type: 'findBest', untried })

  const score = attempt(guess)

  return {
    guess,
    untried: untried.filter(evaluatesToSameScore(guess, score))
  }
}
