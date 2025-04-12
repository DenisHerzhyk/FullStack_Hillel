import {ChangeEvent, FormEvent, useState} from 'react';

const ControlledForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [click, setClick] = useState(false);

    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setClick(false);
        setEmail(e.target.value);
    }
    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setClick(false);
        setPassword(e.target.value)
    }

    const sendStatus = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setClick(true);
    }

    return (
        <>
            <form>
                <label htmlFor="email">Email: </label>
                <input type="email" id="email" onChange={handleEmail} />
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" onChange={handlePassword} />
                <button type="submit" onClick={sendStatus}>Send</button>
            </form>
            <div className="ControlledData">
                <div className="email__output" style={{ display: "flex" }}>
                    <p style={{color: "yellow"}}>Email: </p>
                    <p id="data__email">{click && email}</p>
                </div>
                <div className="password__output" style={{ display: "flex" }}>
                    <p style={{color: "yellow"}}>Password: </p>
                    <p id="data__password">{click && password}</p>
                </div>
            </div>
        </>
    )
}

export default ControlledForm;