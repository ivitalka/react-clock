import React from 'react';
import './DropDownList.css'
import {useDispatch, useSelector} from "react-redux";
import {setDropDown, setOffset, setTimezone, setValue} from "../../store/clockCardSlice";
import moment from "moment";


const DropDownList = ({id}) => {
    const dispatch = useDispatch()
    const timezoneList = useSelector(state => state.timezones.timezoneList)
    const clockCards = useSelector(state => state.clockCards.clockCardList)
    const {dropDownIsOpen} = clockCards.find(card => card.id === id)

    const timeZoneHandler = (e) => {
        const {timezone} = timezoneList.find(item => item.name === e.target.textContent)
        dispatch(setTimezone({id: id, timezone: e.target.textContent}));
        dispatch(setDropDown({id}))
        dispatch(setValue({id: id, value: moment().utcOffset(parseInt(timezone)).format("HH:mm:ss")}))
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

export default DropDownList;
