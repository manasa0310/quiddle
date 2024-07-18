import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import gameSlice from './game-slice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    game: gameSlice.reducer,
  },
});

export default store;
