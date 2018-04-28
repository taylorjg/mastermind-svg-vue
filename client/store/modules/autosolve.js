import * as AS from "../../autosolve";

const state = {
  set: [],
  used: []
};

const mutations = {
};

const actions = {
  generateGuessAsync({ commit, state, rootState }) {
    const lastRow = rootState.logic.rows.slice(-2, -1)[0];
    const { lastGuess, lastFeedback } = lastRow;
    AS.generateGuessAsync(state.set, state.used, lastGuess, lastFeedback)
      .then(guess => commit("logic/submitGuess", { guess }, { root: true }));
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
