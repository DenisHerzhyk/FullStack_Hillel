import {useState, useEffect } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

const Fetching = () => {
    const [user, setUser] = useState<User[]>([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) => setUser(data))
    }, [])

    return (
        <>
            <div>
                {
                    user.length > 0 ? user.map(elem =>
                    <div key={elem.id}>
                        <p>Name: {elem.name}</p>
                        <p>Email: {elem.email}</p>
                    </div>
                    ) : (
                        <p>Loading...</p>
                    )
                }
            </div>
        </>
    )
}

export default Fetching;