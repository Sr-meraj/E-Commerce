import axios from 'axios';
import { useEffect, useState } from 'react';

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api/v1/', // Replace with your base URL
});

const useDataFetching = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(url);
        if (response.data && response.data.data) {
          setLoading(true);
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
    console.log('api rendering');
  }, [url]); // Only run effect once on mount

  return { data, loading, error };
};

export default useDataFetching;
