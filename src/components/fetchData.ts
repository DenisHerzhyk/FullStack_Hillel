import axios from 'axios';
import AnimalInterface from './AnimalInterface';
const contentLink: string = "https://raw.githubusercontent.com/LearnWebCode/json-example/refs/heads/master/animals-1.json";


const fetchData = async(): Promise<AnimalInterface[]> => {
    const response = await axios.get(contentLink);
    return response.data;
}

export default fetchData