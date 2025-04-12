import {useState, useEffect} from 'react';
import fetchMovie from "./fetchMovie.jsx";

const Home = () => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        fetchMovie(movies, setMovies);
    }, [])

    return (
        <>
            <h1>Home Page</h1>
            <ul>
                {movies.map(movie => (
                    <li className="Home__title" key={movie.id}><h2>{movie.title}</h2></li>
                ))}
            </ul>
        </>
    )
}

export default Home