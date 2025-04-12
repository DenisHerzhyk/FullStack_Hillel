import {useEffect, useState} from "react";
import fetchMovies from "./fetchMovie.jsx";

const About = () => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        fetchMovies(movies, setMovies);
    }, [])

    return (
        <>
            <h1>About Page</h1>
            {movies.map(movie => (
                <img className="About__image" key={movie.id} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            ))}
        </>
    )
}

export default About;