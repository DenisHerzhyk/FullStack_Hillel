import {useContext} from "react";
import React from 'react';
import {FloatContext, LanguageContext, PriorityColorContext, ThemeContext} from "./context.js";
import {useDispatch} from "react-redux";
import {increment, decrement} from '../redux/action.js';

const ChildContext2 = () => {
    const theme = useContext(ThemeContext);
    const priorityColor = useContext(PriorityColorContext)
    const language = useContext(LanguageContext);
    const float = useContext(FloatContext);
    const dispatch = useDispatch();
    return (
        <>
            <div className="AppContext" style={{backgroundColor: theme}}>
                <p>Current language: {language}</p>
                <p>We currently on height: <span style={{color: priorityColor}}>{float}m.</span></p>
                <div>
                    <span>SEND IT TO PARENT: </span>
                    <button className="ClickContext" onClick={() => dispatch(increment())}>+</button>
                    <button className="ClickContext" onClick={() => dispatch(decrement())}>-</button>
                </div>
            </div>
        </>
    )
}

export default ChildContext2;
