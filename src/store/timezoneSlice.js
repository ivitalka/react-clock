import {createSlice} from "@reduxjs/toolkit";

const timezoneSlice = createSlice({
    name: 'timezones',
    initialState: {
        timezoneList: []
    },
    reducers: {
        setTimezones(state, action) {
            state.timezoneList = action.payload
        }
    }
})

export const {setTimezones} = timezoneSlice.actions

export default timezoneSlice.reducer
