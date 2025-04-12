import {useState} from "react";

export default function Button(props) {
    const [count, setCount] = useState(0);
    const click = () => {
        setCount(count + 1);
        console.log(`You clicked ${count} times!`);
    }
    const clickHandler = () => {
        click();
    }
    return (
        <>
            <button type={props.type} onClick={clickHandler}>{props.text}</button>
        </>
    )
}