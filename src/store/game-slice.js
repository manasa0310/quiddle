import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    choosedWord: '',
    remainingChance: 15,
    scoredPoints: 0,
    alreadyPlayedWords: [],
    guessedWords: [],
  },
  reducers: {
    reduceRemainingChance(state) {
      state.remainingChance--;
    },

    resetRemainingChance(state) {
      state.remainingChance = 15;
    },
    addGuessedWord(state, action) {
      state.guessedWords.unshift(action.payload);
    },
    resetGuessedWords(state) {
      state.guessedWords = [];
    },
    setChoosedWord(state, action) {
      state.choosedWord = action.payload;
    },
    resetChooseWord(state) {
      state.choosedWord = '';
    },
    setAlreadyPlayedWords(state, action) {
      state.alreadyPlayedWords = action.payload;
    },
    setScoredPoints(state, action) {
      state.scoredPoints = action.payload;
    },
  },
});

export const gameActions = gameSlice.actions;

export default gameSlice;
