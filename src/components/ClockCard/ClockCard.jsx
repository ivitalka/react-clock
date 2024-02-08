import './ClockCard.css';
import 'react-clock/dist/Clock.css'
import React, {useEffect} from 'react';
import Clock from "react-clock";
import moment from 'moment';
import DropDownList from "../DropDownList/DropDownList";
import {useDispatch, useSelector} from "react-redux";
import {setDropDown, setValue} from '../../store/clockCardSlice'



export const ClockCard = ({ id }) => {
    const dispatch = useDispatch()
    const clockCards = useSelector(state => state.clockCards.clockCardList)
    const {value, timezone, offset} = clockCards.find(card => card.id === id)

    useEffect(() => {
        const interval = setInterval(() => dispatch(setValue({
            id: id,
            value: moment().utcOffset(offset).format('HH:mm:ss')
        })), 1000);

        return () => {
            clearInterval(interval);
        };
    }, [offset]);

    const dropDownHandler = () => {
        dispatch(setDropDown({id}))
    }


    return (
        <div className={'clock-card'}>
            <Clock
                renderMinuteMarks={false}
                size={200}
                hourHandLength={40}
                minuteHandLength={80}
                value={value}
            />
            <time className={'time'}>{value}</time>
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
