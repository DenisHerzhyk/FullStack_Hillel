import {useContext} from "react";
import React from 'react';
import {NumberContext, PriorityColorContext} from "./context.jsx";
import ChildContext2 from "./ChildContext2.jsx";

const ChildContext = () => {
    const number = useContext(NumberContext);
    const priorityColor = useContext(PriorityColorContext);
    return (
        <>
            <div className="ChildContext">
                <h1>CHILD_CONTEXT</h1>
                Number: <span style={{backgroundColor: priorityColor}}>{number}</span>
                <ChildContext2 />
            </div>
        </>
    )
}

export default ChildContext;