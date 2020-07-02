import registerPromiseWorker from 'promise-worker/register'
import { evaluatesToSameScore } from './logic'
import * as U from './utils'
import * as C from './constants'

// TODO: fix this warning:
// Warning (worker-plugin): output.globalObject is set to "window". It must be set to "self" to support HMR in Workers.

const processMessage = message => {
  switch (message.type) {

    case 'findBest': {
      const untried = message.untried
      const best = C.ALL_CODES.reduce(
        (currentBest, code) => {
          const maxCount = C.ALL_SCORES.reduce(
            (currentMax, score) => {
              const count = U.countWithPredicate(untried, evaluatesToSameScore(code, score))
              return Math.max(currentMax, count)
            },
            0)
          return maxCount < currentBest.count
            ? { count: maxCount, guess: code }
            : currentBest
        },
        { count: Number.MAX_VALUE })
      return best.guess;
    }

    default:
      return `Unknown message.type, "${message.type}".`
  }
}

registerPromiseWorker(processMessage)
