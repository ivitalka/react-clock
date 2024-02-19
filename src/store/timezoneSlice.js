import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchTimezones = createAsyncThunk(
    'timezones/fetchTimezones',
    async function(_, { rejectWithValue }) {
        try {
            const response = await axios({
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                url: '/timezones.json'
            })
            return response.data
        }
        catch (error) {
            return rejectWithValue(error.message)
        }
    }
)


const timezoneSlice = createSlice({
    name: 'timezones',
    initialState: {
        timezoneList: [],
        isLoading: true,
        error: null,
        status: ''
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchTimezones.pending, (state) => {
            state.isLoading = true
            state.error = null
            state.status = 'pending'
        })
        builder.addCase(fetchTimezones.fulfilled, (state, action) => {
            state.timezoneList = action.payload
            state.isLoading = false
            state.error = null
            state.status = 'fulfilled'
        })
        builder.addCase(fetchTimezones.rejected, (state, action) => {
            state.error = action.payload
            state.isLoading = true
            state.status = 'rejected'
        })
    }
})


export default timezoneSlice.reducer
