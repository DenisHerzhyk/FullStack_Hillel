import { useState } from "react";
import {getIndex, getColor} from './getColor.tsx';

const colors: string[] = ["red", "green", "blue", "yellow", "purple", "pink"];

const Stateful = () => {
    const [color, setColor] = useState('green');
    const handleColor = () => setColor(getColor(colors, getIndex(colors)));
    return (
        <>
            <div className="Stateful">
                <h1 className="Stateful__title" style={{color: color}}>Text now is {color}</h1>
                <button className="Stateful__btn--primary" onClick={handleColor}>Change color</button>
            </div>
        </>
    )
}

export default Stateful;