import {useContext} from "react";
import React from 'react';
import {ThemeContext, LanguageContext, PriorityColorContext} from "./context.js";
import ChildContext from "./ChildContext.jsx";
import {useSelector} from "react-redux";
import {selectCount, selectLoading} from "../redux/counterSlice.js";

const AppContext = () => {
    const theme = useContext(ThemeContext);
    const language = useContext(LanguageContext);
    const priorityColor = useContext(PriorityColorContext);
    const counter = useSelector(selectCount);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectLoading);
    return (
        <>
            <div className="AppContext" style={{backgroundColor: theme}}>
                <h1 style={{backgroundColor: priorityColor}}>APP_CONTEXT</h1>
                <h2 style={{fontWeight: "bold", color: "white"}}>Loading status: {loading ? "Loading..." : "-"}</h2>
                <h2 style={{fontWeight: "bold", color: "white"}}>Error status: {error ? error : "-"}</h2>
                <h2 style={{color: "green"}}>Counter value: {counter}</h2>
                <p>Current language: {language}</p>
                <ChildContext />
            </div>
        </>
    )
}

export default AppContext;