import {useContext} from "react";
import React from 'react';
import {ThemeContext, LanguageContext, PriorityColorContext} from "./context.js";
import ChildContext from "./ChildContext.jsx";
import {useSelector} from "react-redux";

const AppContext = () => {
    const theme = useContext(ThemeContext);
    const language = useContext(LanguageContext);
    const priorityColor = useContext(PriorityColorContext);
    const counter = useSelector((state) => state.count);
    return (
        <>
            <div className="AppContext" style={{backgroundColor: theme}}>
                <h1 style={{backgroundColor: priorityColor}}>APP_CONTEXT</h1>
                <h2 style={{color: "green"}}>Counter value: {counter ? counter : "it was undefined before, but now its null, trust me!"}</h2>
                <p>Current language: {language}</p>
                <ChildContext />
            </div>
        </>
    )
}

export default AppContext;