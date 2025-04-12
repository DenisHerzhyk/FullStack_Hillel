import axios from 'axios';
import API_LINK from "./API_LINK.jsx";

const fetchMovies = async(movies, setMovies) => {
    try {
        const response = await axios.get(API_LINK);
        setMovies(response.data.results);
    }
    catch(error) {
        console.error(error);
    }
}

export default fetchMovies;