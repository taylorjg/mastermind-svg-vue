import registerPromiseWorker from 'promise-worker/register'
import { evaluatesToSameScore } from './logic'
import * as U from './utils'
import * as C from './constants'

const onFindBest = untried => {
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

const onUnknownMessage = message => {
  console.log(`Unknown message: ${JSON.stringify(message)}`)
}

const processMessage = message => {
  switch (message.type) {
    case 'findBest': return onFindBest(message.untried)
    default: return onUnknownMessage(message)
  }
}

registerPromiseWorker(processMessage)
