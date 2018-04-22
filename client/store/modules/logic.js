import { generateRandomSecret } from "../../logic";

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
    state.showingColourMenuFor
};

const mutations = {
  start: state => {
    state.gameState = GAME_STATES.IN_PROGRESS;
    state.secret = generateRandomSecret();
    state.guesses = [
      [{}, {}, {}, {}]
    ];
    state.activeRowIndex = 0;
  },
  setPeg: (state, payload) => {
    if (state.gameState === GAME_STATES.IN_PROGRESS) {
      const row = state.showingColourMenuFor.row - 1;
      const col = state.showingColourMenuFor.col - 1;
      state.guesses[row][col].peg = payload.peg;
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
