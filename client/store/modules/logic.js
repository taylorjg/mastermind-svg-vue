import Vue from "vue";
import { generateRandomSecret, evaluateGuess } from "../../logic";
import { generateGuessAsync, ALL_COMBINATIONS } from "../../autosolve";

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
  showingColourMenuFor: undefined,
  showingOutcomeModal: false,
  autosolve: false,
  autosolveState: {
    set: [],
    used: [],
  }
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
    state.gameState === GAME_STATES.IN_PROGRESS ? state.rows.length - 1 : -1,
  guessAtRowIndex: state => rowIndex =>
    state.rows[rowIndex]
      ? state.rows[rowIndex].guess
      : undefined,
  feedbackAtRowIndex: state => rowIndex =>
    state.rows[rowIndex]
      ? state.rows[rowIndex].feedback
      : undefined,
  canSubmitRow: state => rowIndex => {
    const row = state.rows[rowIndex];
    return row && !row.feedback && (row.guess.every(peg => peg) || state.autosolve);
  },
  gameInProgress: state =>
    state.gameState === GAME_STATES.IN_PROGRESS,
  gameOver: state =>
    state.gameState === GAME_STATES.GAME_OVER,
  gameWon: state =>
    state.outcome === OUTCOMES.WON,
  showingOutcomeModal: state =>
    state.showingOutcomeModal,
  autosolve: state =>
    state.autosolve,
  lastSubmittedRow: state =>
    state.rows.slice().reverse().find(row => row.feedback)
};

const mutations = {
  enableAutosolveMode(state) {
    state.autosolve = true;
  },
  disableAutosolveMode(state) {
    state.autosolve = false;
  },
  newGame(state) {
    state.gameState = GAME_STATES.IN_PROGRESS;
    state.outcome = OUTCOMES.NONE;
    state.secret = generateRandomSecret();
    console.log(`secret: ${state.secret}`);
    state.rows = [
      {
        guess: Array(4).fill(undefined),
        feedback: undefined
      }
    ];
    if (state.autosolve) {
      state.autosolveState.set = ALL_COMBINATIONS;
      state.autosolveState.used = [];
    }
    else {
      state.autosolveState.set = [];
      state.autosolveState.used = [];
    }
  },
  setPeg(state, payload) {
    if (state.gameState === GAME_STATES.IN_PROGRESS) {
      const row = state.showingColourMenuFor.row;
      const col = state.showingColourMenuFor.col;
      Vue.set(state.rows[row].guess, col, payload.peg);
    }
  },
  submit(state) {
    if (state.gameState === GAME_STATES.IN_PROGRESS) {
      submit(state);
    }
  },
  submitGeneratedGuess(state, payload) {
    if (state.gameState === GAME_STATES.IN_PROGRESS) {
      const rowIndex = state.rows.length - 1;
      state.rows[rowIndex].guess = payload.guess;
      state.autosolveState.set = payload.set;
      state.autosolveState.used = payload.used;
      submit(state);
    }
  },
  showColourMenuFor(state, payload) {
    if (state.gameState === GAME_STATES.IN_PROGRESS) {
      state.showingColourMenuFor = {
        row: payload.row,
        col: payload.col
      };
    }
  },
  hideColourMenu(state) {
    state.showingColourMenuFor = undefined;
  },
  hideOutcomeModal(state) {
    state.showingOutcomeModal = false;
  }
};

const actions = {
  async generateGuessAsync({ commit, state, getters }) {
    const lastSubmittedRow = getters.lastSubmittedRow
      || { guess: undefined, feedback: undefined };
    const { guess: lastGuess, feedback: lastFeedback } = lastSubmittedRow;
    const result = await generateGuessAsync(
      state.autosolveState.set,
      state.autosolveState.used,
      lastGuess,
      lastFeedback);
    commit("submitGeneratedGuess", result);
  }
};

const submit = (state) => {
  const rowIndex = state.rows.length - 1;
  const guess = state.rows[rowIndex].guess;
  const feedback = evaluateGuess(state.secret, guess);
  state.rows[rowIndex].feedback = feedback;
  if (feedback.blacks === 4) {
    state.gameState = GAME_STATES.GAME_OVER;
    state.outcome = OUTCOMES.WON;
    state.showingOutcomeModal = true;
  }
  else {
    if (state.rows.length === 10) {
      state.gameState = GAME_STATES.GAME_OVER;
      state.outcome = OUTCOMES.LOST;
      state.showingOutcomeModal = true;
    }
    else {
      state.rows.push({
        guess: Array(4).fill(undefined),
        feedback: undefined
      });
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
