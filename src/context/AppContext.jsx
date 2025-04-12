import {useContext} from "react";
import React from 'react';
import {ThemeContext, LanguageContext, PriorityColorContext} from "./context.jsx";
import ChildContext from "./ChildContext.jsx";

const AppContext = () => {
    const theme = useContext(ThemeContext);
    const language = useContext(LanguageContext);
    const priorityColor = useContext(PriorityColorContext);


    return (
        <>
            <div className="AppContext" style={{backgroundColor: theme}}>
                <h1 style={{backgroundColor: priorityColor}}>APP_CONTEXT</h1>
                <p>Current language: {language}</p>
                <ChildContext />
            </div>
        </>
    )
}

export default AppContext;