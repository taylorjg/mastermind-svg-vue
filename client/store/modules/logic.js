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
  rows: [],
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
  guessAtRow: state => row =>
    state.rows[row]
      ? state.rows[row].pegs
      : undefined,
  feedbackAtRow: state => row =>
    state.rows[row]
      ? state.rows[row].feedback
      : undefined,
  canSubmitRow: state => row =>
    state.rows[row] &&
    state.rows[row].pegs.every(peg => !!peg) &&
    state.rows[row].feedback === undefined,
  gameInProgress: state =>
    state.gameState === GAME_STATES.IN_PROGRESS,
  gameOver: state =>
    state.gameState === GAME_STATES.GAME_OVER
};

const mutations = {
  newGame: state => {
    state.gameState = GAME_STATES.IN_PROGRESS;
    state.secret = generateRandomSecret();
    console.log(`secret: ${state.secret.map(peg => peg.toString())}`);
    state.rows = [
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
      Vue.set(state.rows[row].pegs, col, payload.peg);
    }
  },
  submitRow: (state, payload) => {
    if (state.gameState === GAME_STATES.IN_PROGRESS) {
      state.showingColourMenuFor = undefined;
      const row = payload.row;
      const guess = state.rows[row].pegs;
      const feedback = evaluateGuess(state.secret, guess);
      state.rows[row].feedback = feedback;
      if (feedback.blacks === 4) {
        state.gameState = GAME_STATES.GAME_OVER;
        state.outcome = OUTCOMES.WON;
      }
      else {
        state.activeRowIndex++;
        if (state.activeRowIndex === 10) {
          state.gameState = GAME_STATES.GAME_OVER;
          state.outcome = OUTCOMES.LOST;
        }
        else {
          state.rows.push({
            pegs: Array(4).fill(undefined),
            feedback: undefined
          });
        }
      }
    }
  },
  showColourMenuFor: (state, payload) => {
    if (state.gameState === GAME_STATES.IN_PROGRESS) {
      state.showingColourMenuFor = {
        row: payload.row,
        col: payload.col
      };
    }
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
