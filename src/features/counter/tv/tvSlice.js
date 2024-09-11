import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../../utility/axios';
import {requests} from '../../../utility/apirequests';
import { selectCount } from '../counterSlice';

const initialState = {
    netflixOrignals:{
        status: "idle",
        data: null,
        error: null
    }
}

export const fetchNetflixOrignals = createAsyncThunk(
    "tv/fetchNetflixOrignals",
    async ()=>{
        const response = await axios.get(requests.getNeflixOrignals);
        return response.data;
    }
);

export const tvSlice = createSlice({
    initialState,
    name: "tv",
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchNetflixOrignals.pending, (state, action) => {
            state.netflixOrignals.status = "loading";
        })
        .addCase(fetchNetflixOrignals.fulfilled, (state, action) => {
            state.netflixOrignals.status = "success";
            state.netflixOrignals.data = action.payload;
        })
        .addCase(fetchNetflixOrignals.rejected, (state, action) => {
            state.netflixOrignals.status = "error";
            state.netflixOrignals.error = action.error;
        })
    }
})

// Selector Functions //

export const selectNetflixOrignals = (state) => state.tv.netflixOrignals;

// ------------------ //

export default tvSlice.reducer;