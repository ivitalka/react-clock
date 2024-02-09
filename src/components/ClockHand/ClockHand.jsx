import React from 'react';
import './ClockHand.css';



export const ClockHand = ({ type, angle }) => {
    return (
        <div className='clock-hand' style={{ transform: `rotate(${angle}deg)` }}>
            <div className={`clock-hand-body clock-hand-body-${type}`} />
        </div>
    );
};
