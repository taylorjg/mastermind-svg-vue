import Vue from "vue";
import { generateRandomSecret, evaluateGuess } from "../../logic";

const GAME_STATES = {
  INITIALISED: Symbol("initialised"),
  IN_PROGRESS: Symbol("in-progress"),
  GAME_OVER: Symbol("game-over")
};

const OUTCOMES = {
  NONE: Symbol("none"),
  WON: Symbol("won"),
  LOST: Symbol("lost")
};

const state = {
  gameState: GAME_STATES.INITIALISED,
  outcome: OUTCOMES.NONE,
  secret: [],
  guesses: [],
  activeRowIndex: -1,
  showingColourMenuFor: undefined,
  showingOutcomeModal: false
};

const getters = {
  showNewGameButton: state =>
    state.gameState === GAME_STATES.INITIALISED ||
    (state.gameState === GAME_STATES.GAME_OVER && !state.showingOutcomeModal),
  showingColourMenuFor: state =>
    state.showingColourMenuFor,
  secret: state =>
    state.secret,
  activeRowIndex: state =>
    state.activeRowIndex,
  guessAtIndex: state => index =>
    state.guesses[index]
      ? state.guesses[index].pegs
      : undefined,
  feedbackAtIndex: state => index =>
    state.guesses[index]
      ? state.guesses[index].feedback
      : undefined,
  canSubmitRow: state => row =>
    state.guesses[row] &&
    state.guesses[row].pegs.every(peg => !!peg) &&
    state.guesses[row].feedback === undefined,
  gameInProgress: state =>
    state.gameState === GAME_STATES.IN_PROGRESS,
  gameOver: state =>
    state.gameState === GAME_STATES.GAME_OVER
};

const mutations = {
  newGame: state => {
    state.gameState = GAME_STATES.IN_PROGRESS;
    state.secret = generateRandomSecret();
    state.guesses = [
      {
        pegs: Array(4).fill(undefined),
        feedback: undefined
      }
    ];
    state.activeRowIndex = 0;
  },
  setPeg: (state, payload) => {
    if (state.gameState === GAME_STATES.IN_PROGRESS) {
      const row = state.showingColourMenuFor.row;
      const col = state.showingColourMenuFor.col;
      Vue.set(state.guesses[row].pegs, col, payload.peg);
    }
  },
  submitRow: (state) => {
    if (state.gameState === GAME_STATES.IN_PROGRESS) {
      const guess = state.guesses[state.activeRowIndex].pegs;
      const feedback = evaluateGuess(state.secret, guess);
      state.guesses[state.activeRowIndex].feedback = feedback;
      // TODO: check for game won (feedback.blacks === 4)
      state.activeRowIndex++;
      // TODO: check for game lost (state.activeRowIndex === 10)
      state.guesses.push({
        pegs: Array(4).fill(undefined),
        feedback: undefined
      });
    }
  },
  showColourMenuFor: (state, payload) => {
    state.showingColourMenuFor = {
      row: payload.row,
      col: payload.col
    };
  },
  hideColourMenu: state => {
    state.showingColourMenuFor = undefined;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
