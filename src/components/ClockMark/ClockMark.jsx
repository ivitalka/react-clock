import React from 'react';
import './ClockMark.css';


export const ClockMark = ({ angle }) => {
    return (
        <div className={'clock-mark'} style={{ transform: `rotate(${angle}deg)` }}>
            <div className={'clock-mark-body'}/>
        </div>
    );
};
