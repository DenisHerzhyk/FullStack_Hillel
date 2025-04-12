import {useEffect, useState} from 'react';
import axios from 'axios';
import Post from './Post/Post.jsx';
const REQUEST_URL = "https://jsonplaceholder.typicode.com/posts"

const DataFetcher = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const getData = async () => {
        try {
            const {data} = await axios.get(REQUEST_URL);
            setTimeout(() => {
                setPosts(data);
                setLoading(false);
            }, 1000)
        }
        catch {
            setError("⚠️Something went wrong.⚠️");
            setLoading(false);
        }
    };
    useEffect(() => {
        getData().catch((err) => console.log(err));
    }, []);

    return (
        <>
            {
                loading
                ? <p>🔄 Loading...</p> : error ? <p>{error}</p>
                : posts.map((post) => <Post key={post.id} body={post.body} userId={post.userId} title={post.title} />)
            }
        </>
    )
}

export default DataFetcher;