import axios from 'axios';
import { useEffect, useState } from 'react';

const useDataFetching = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                if (response.data && response.data.data) {
                    setData(response.data.data);
                    setLoading(false);
                    setError(null);
                } else {
                    setError('Invalid data structure in the response');
                }
            } catch (err) {
                setLoading(false);
                setError(err.message || 'An error occurred while fetching data');
            }
        };

        fetchData();
        console.log('api rendaring');
    }, [url]); // Only run effect once on mount

  return { data, loading, error };
};

export default useDataFetching;
