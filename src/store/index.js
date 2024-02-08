import {configureStore} from "@reduxjs/toolkit";
import timezoneReducer from './timezoneSlice'
import clockCardReducer from './clockCardSlice'

export default configureStore({
    reducer: {
        timezones: timezoneReducer,
        clockCards: clockCardReducer
    }
})
