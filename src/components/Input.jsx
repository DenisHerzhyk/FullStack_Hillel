import {useState} from 'react';

export default function Input(props) {
    const [value, setValue] = useState("");
    const change = (e) => {
        const value = e.target.value;
        setValue(value);
        console.log(`You changed input to ${value}`);
    }
    const changeHandler = (e) => {
        change(e);
    }
    return (
        <>
            <input type={props.type} placeholder={props.placeholder} onChange={changeHandler} value={value}/>
        </>
    )
}