import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  endpoints,
  platformType,
  requests,
} from "../../../utility/apirequests";
import axios from "../../../utility/axios";

const initialState = {
  nowPlaying: {
    status: "idle",
    data: null,
    error: null,
  },
};

export const fetchNowPlayingMovies = createAsyncThunk(
  "movie/fetchNowPlayingMovies",
  async () => {
    const response = await axios.get(
      requests.getCollection(platformType.movie, endpoints.nowPlaying)
    );
    return response.data;
  }
);

export const movieSlice = createSlice({
  initialState,
  name: "movie",
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNowPlayingMovies.pending, (state, action) => {
        state.nowPlaying.status = "loading";
      })
      .addCase(fetchNowPlayingMovies.fulfilled, (state, action) => {
        state.nowPlaying.status = "success";
        state.nowPlaying.data = action.payload;
      })
      .addCase(fetchNowPlayingMovies.rejected, (state, action) => {
        state.nowPlaying.status = "failed";
        state.nowPlaying.error = action.error;
      });
  },
});

export const selectNowPalyingMovies = (state) => state.movie.nowPlaying;

export default movieSlice.reducer;
