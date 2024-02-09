import React from 'react';
import './Clock.css';
import moment from "moment";
import { useSelector } from "react-redux";
import { ClockHand } from "../ClockHand";
import { ClockMark } from "../ClockMark";



export const Clock = ({ id }) => {
    const clockCards = useSelector(state => state.clockCards.clockCardList)
    const globalTime = useSelector(state => state.time.time)
    const {offset} = clockCards.find(card => card.id === id)
    const currentClockTime = moment().set(globalTime).utcOffset(offset)

    const secondsAngle = 6 * currentClockTime.seconds()
    const minutesAngle = 6 * currentClockTime.minutes()
    const hoursAngle = 30 * currentClockTime.hours() + minutesAngle / 12


        return (
            <time className="clock">
                <div className="clock-face">
                    {
                        [...Array(12)].map((item, index) => {
                            return <ClockMark key={index++} angle={(index++) * 30} />
                        })
                    }
                </div>
                <ClockHand type="hour" angle={hoursAngle} />
                <ClockHand type="minutes" angle={minutesAngle} />
                <ClockHand type="seconds" angle={secondsAngle} />
            </time>
        );
    }
