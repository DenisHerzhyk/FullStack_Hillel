import {FormEvent, useRef} from "react";

const UncontrolledForm = () => {
    const emailElemRef = useRef<HTMLParagraphElement | null>(null);
    const passwordElemRef = useRef<HTMLParagraphElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const handleEmail = () => {
        if (emailElemRef.current && emailRef.current) emailElemRef.current.textContent = emailRef.current.value;
    }

    const handlePassword = () => {
        if (passwordElemRef.current && passwordRef.current) passwordElemRef.current.textContent = passwordRef.current.value;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleEmail();
        handlePassword();
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email--unconrolled">Email: </label>
                <input type="email" id="email--unconrolled" ref={emailRef} />
                <label htmlFor="password--uncontrolled">Password: </label>
                <input type="password" id="password--uncontrolled" ref={passwordRef} />
                <button type="submit">Send</button>
            </form>
            <div className="ControlledData">
                <div className="email__output" style={{ display: "flex" }}>
                    <p style={{color: "yellow"}}>Email: </p>
                    <p id="data__email--uncontrolled" ref={emailElemRef}></p>
                </div>
                <div className="password__output" style={{ display: "flex" }}>
                    <p style={{color: "yellow"}}>Password: </p>
                    <p id="data__password--uncontrolled" ref={passwordElemRef}></p>
                </div>
            </div>
        </>
    )
}

export default UncontrolledForm;
