import React from 'react';
import { useEffect, useState } from 'react';
import AnimalInterface from './AnimalInterface';
import fetchData from './fetchData';

const UserProfile = () => {
    const [fields, setFields] = useState<AnimalInterface[] | null>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect (() => {
        fetchData()
        .then((response) => {
            if (response.some(animal => !animal.name)) {
                throw new Error("Invalid data: Animal name is required");
            }
            setTimeout(() => {
                setFields(response);
                setLoading(false);
            }, 2000)
        })
        .catch((error) => {
            setLoading(false);
            setError(error.message);
        }) 

    }, [])
    return (
        <>
        <div>
            <h1 className="mb-10">User Profile</h1>
            {
            (error) ? <p className='font-bold text-red-500 text-xl'>Error: {error}!!!</p>
            : (loading) ? <p className="font-bold text-blue-500 text-xl underline">🔄Loading...</p>
            : (fields) ?
            <ul className="flex flex-row gap-[200px]">
                {fields.map((animal, index) => 
                    <li key={index} className="border-2 p-[20px] whitespace-nowrap text-left flex flex-col gap-1">
                        <h3 className="text-2xl font-bold text-lime-700">{animal.name}</h3>
                        <p>Type: {animal.species}</p>
                        <p>❤️Likes: {animal.foods.likes.join(", ")}</p>
                        <p>💔Displikes: {animal.foods.dislikes.join(", ")}</p>
                    </li>
                )}
            </ul>
            : <p>No data available</p>}
        </div>
        </>
    )
} 

export default UserProfile;