import React from 'react';
import './ClockCard.css';
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setDropDown } from '../../store/clockCardSlice'
import { Clock } from "../Clock";
import { DropDownList } from "../DropDownList/";



export const ClockCard = ({ id }) => {
    const dispatch = useDispatch()
    const clockCards = useSelector(state => state.clockCards.clockCardList)
    const {timezone, offset} = clockCards.find(card => card.id === id)
    const globalTime = useSelector(state => state.time.time)

    const dropDownHandler = () => {
        dispatch(setDropDown({id}))
    }


    return (
        <div className={'clock-card'}>
            <Clock id={id}/>
            <time className={'time'}>{moment().set(globalTime).utcOffset(offset).format('HH:mm:ss')}</time>
            <div className={'input-container'}>
                <input
                    className={'input'}
                    onClick={() => dropDownHandler()}
                    value={timezone}
                    readOnly
                />
                <DropDownList id={id}/>
            </div>
        </div>
    );
}
