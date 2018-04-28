import { generateRandomSecret } from "./logic";
import { P } from "./constants";

export const generateGuessAsync = (set, used, lastGuess, lastFeedback) => {
  if (lastFeedback) {
    return new Promise(resolve => {
      setTimeout(
        () => {
          // TEMPORARY IMPLEMENTATION
          resolve(generateRandomSecret());
        },
        1000);
    });
  }
  else {
    return Promise.resolve([P.R, P.R, P.G, P.G]);
  }
};
