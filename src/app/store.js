import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import tvReducer from '../features/counter/tv/tvSlice';
import movieReducer from '../features/counter/movie/movieSlice';
import commonReducer from '../features/counter/common/commonSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tv: tvReducer,
    movie: movieReducer,
    common: commonReducer
  },
});
