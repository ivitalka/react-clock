import React from 'react';
import './DropDownList.css'
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setDropDown, setOffset, setTimezone } from "../../store/clockCardSlice";
import { setTime } from "../../store/timeSlice";



export const DropDownList = ({ id }) => {
    const dispatch = useDispatch()
    const timezoneList = useSelector(state => state.timezones.timezoneList)
    const clockCards = useSelector(state => state.clockCards.clockCardList)
    const {dropDownIsOpen} = clockCards.find(card => card.id === id)

    const timeZoneHandler = (e) => {
        const {timezone} = timezoneList.find(item => item.name === e.target.textContent)
        dispatch(setTimezone({id: id, timezone: e.target.textContent}));
        dispatch(setDropDown({id}))
        dispatch(setTime(moment().utcOffset(parseInt(timezone)).format('HH:mm:ss')))
        dispatch(setOffset({id: id, offset: parseInt(timezone)}))

    };


    return(
        <ul className={'list'}
            style={dropDownIsOpen ? {visibility: 'visible'} : {visibility: 'hidden'}}>
            {timezoneList.map((item, index) => {
                return <li key={index} className={'list-item'} onClick={(e) => timeZoneHandler(e)}>
                    {item.name}
                </li>
            })}
        </ul>
    )
}
