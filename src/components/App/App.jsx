import './App.css'
import React from 'react';
import moment from "moment";
import { useEffect, useState } from 'react';
import { ClockCard } from "../ClockCard";
import { Preloader } from "../Preloader";
import {useDispatch, useSelector} from 'react-redux'
import { initialClockCard } from '../../store/clockCardSlice'
import { fetchTimezones } from '../../store/timezoneSlice'
import { setTime } from "../../store/timeSlice";



export const App = () => {
    const dispatch = useDispatch()
    const clockCount = 2
    const [isAppReady, setIsAppReady] = useState(false)
    const {timezoneList, isLoading, error, status} = useSelector(state => state.timezones)

    useEffect(() => {
        dispatch(fetchTimezones())
    }, [])


    useEffect(() => {
        if(!isLoading ) {
            const [initialZone] = timezoneList
            const {name, timezone} = initialZone
            const arr = [...Array(clockCount)]
            arr.map((item, index) => {
                dispatch(initialClockCard({
                    id: index,
                    dropDownIsOpen: false,
                    timezone: name,
                    offset: parseInt(timezone)}))
            })
            dispatch(setTime(moment().format('HH:mm:ss')))
            setIsAppReady(true)
        }
    }, [isLoading])


    useEffect(() => {
        const interval = setInterval(() => dispatch(setTime(moment().format('HH:mm:ss'))), 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);


    return (
            <div className={'container'}>
                <div className={'wrapper'}>
                    {status === 'rejected' && <h2>{`Error: ${error}`}</h2>}
                    {status === 'pending' && <Preloader/>}
                    {
                        isAppReady &&
                        [...Array(clockCount)].map((item, index) => <ClockCard id={index} key={index}/>)
                    }
                </div>
            </div>
    );
}
