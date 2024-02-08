import {createSlice} from "@reduxjs/toolkit";

const clockCardSlice = createSlice({
    name: 'clockCards',
    initialState: {
        clockCardList: []
    },
    reducers: {
        initialClockCard(state, action) {
            state.clockCardList.push(action.payload)
        },
        setDropDown(state, action) {
            const changedCard = state.clockCardList.find(card => card.id === action.payload.id)
            changedCard.dropDownIsOpen = !changedCard.dropDownIsOpen
        },
        setValue(state, action) {
            const changedCard = state.clockCardList.find(card => card.id === action.payload.id)
            changedCard.value = action.payload.value
        },
        setTimezone(state, action) {
            const changedCard = state.clockCardList.find(card => card.id === action.payload.id)
            changedCard.timezone = action.payload.timezone
        },
        setOffset(state, action) {
            const changedCard = state.clockCardList.find(card => card.id === action.payload.id)
            changedCard.offset = action.payload.offset
        },
    }
})

export const {initialClockCard, setDropDown, setValue, setTimezone, setOffset} = clockCardSlice.actions

export default clockCardSlice.reducer
