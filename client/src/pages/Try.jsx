import axios from 'axios';
import { useEffect, useState } from "react";

const Try = () => {
    const [jokes, setJokes] = useState([]);

    useEffect(() => {
        axios.get('/api/jokes')
            .then((res) => {
                setJokes(res.data)
            })
            .catch(err => {
                console.log(err);
            });

    });

    console.log(jokes);
    console.log(import.meta.env.VITE_API_URL);
    return (
        <div>
            Try {jokes.length}
        </div>
    );
}
export default Try;