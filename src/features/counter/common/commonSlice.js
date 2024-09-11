import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utility/axios";
import { requests } from "../../../utility/apirequests";

const initialState = {
  headerVideos: {
    status: "idle",
    data: null,
    error: null,
  },
  videoDetails: {
    status: "idle",
    data: null,
    error: null,
  },
  queryString : ""
};

export const fetchHeaderVideos = createAsyncThunk(
  "common/fetchHeaderVideos",
  async (requestValues) => {
    const response = await axios.get(requests.getDetails(requestValues));
    return response.data;
  }
);

export const fetchVideoDetails = createAsyncThunk(
  "common/fetchVideoDetails",
  async (requestValues) => {
    const response = await axios.get(requests.getDetails(requestValues));
    return response.data;
  }
);

export const commonSlice = createSlice({
  initialState,
  name: "common",
  reducers: {
    searchVideo : (state,action) => {
      state.queryString = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeaderVideos.pending, (state, action) => {
        state.headerVideos.status = "loading";
      })
      .addCase(fetchHeaderVideos.fulfilled, (state, action) => {
        state.headerVideos.status = "success";
        state.headerVideos.data = action.payload;
      })
      .addCase(fetchHeaderVideos.rejected, (state, action) => {
        state.videoDetails.status = "failed";
        state.videoDetails.error = action.error;
      })
      .addCase(fetchVideoDetails.pending, (state, action) => {
        state.videoDetails.status = "loading";
      })
      .addCase(fetchVideoDetails.fulfilled, (state, action) => {
        state.videoDetails.status = "success";
        state.videoDetails.data = action.payload;
      })
      .addCase(fetchVideoDetails.rejected, (state, action) => {
        state.videoDetails.status = "failed";
        state.videoDetails.error = action.error;
      });
  },
});

export const { searchVideo } = commonSlice.actions;

export const selectSearchString = (state) => state.common.queryString;

export const selectHeaderVideo = (state) => state.common.headerVideos;

export const selectVideoDetails = (state) => state.common.videoDetails;

export default commonSlice.reducer;
