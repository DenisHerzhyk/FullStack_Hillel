import {useEffect, useState} from "react";
import fetchMovies from "./fetchMovie.jsx";

const Contact = () => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        fetchMovies(movies, setMovies);
    }, [])

    return (
        <>
            <h1>Contact Page</h1>
            <ul>
                {movies.map(movie => (
                    <li className="Contact__overview" key={movie.id}>{movie.overview}</li>
                ))}
            </ul>
        </>
    )
}

export default Contact;