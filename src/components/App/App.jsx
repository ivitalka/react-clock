import './App.css'
import React from 'react';
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from 'react';
import { ClockCard } from "../ClockCard";
import { Preloader } from "../Preloader";
import store from '../../store'
import { useDispatch } from 'react-redux'
import { initialClockCard } from '../../store/clockCardSlice'
import { setTimezones } from '../../store/timezoneSlice'
import {setTime} from "../../store/timeSlice";



export const App = () => {
    const [isLoading, setIsLoading] = useState(false)
    const clockCount = 2
    const dispatch = useDispatch()

    const getTimezones = async () => {
        await axios({
            method: 'get',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            url: '/timezones.json'
        }).then(res => {
            dispatch(setTimezones(res.data))
        })
            .catch(e => console.log(e))
    }

    useEffect(() => {
        getTimezones()
            .then(() => {
                const [initialZone] = store.getState().timezones.timezoneList
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
            })
            .then(() => setIsLoading(true))
            .catch(e => console.log(e))
    })

    useEffect(() => {
        const interval = setInterval(() => dispatch(setTime(moment().format('HH:mm:ss'))), 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);


    return (
            <div className={'container'}>
                <div className={'wrapper'}>
                    {!isLoading && <Preloader/>}
                    {
                        isLoading &&
                        [...Array(clockCount)].map((item, index) => <ClockCard id={index} key={index}/>)
                    }
                </div>
            </div>
    );
}
