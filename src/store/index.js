import { configureStore } from "@reduxjs/toolkit";
import timezoneReducer from './timezoneSlice'
import clockCardReducer from './clockCardSlice'
import timeReducer from './timeSlice'


export default configureStore({
    reducer: {
        timezones: timezoneReducer,
        clockCards: clockCardReducer,
        time: timeReducer
    }
})
