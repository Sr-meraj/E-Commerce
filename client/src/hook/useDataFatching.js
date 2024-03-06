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
        
        setLoading(true);
        // Introduce a 1.2 seconds (1200 milliseconds) loading delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await axiosInstance.get(url);
        if (response.data && response.data.data) {
          setData(response.data.data);
          setError(null);
        } else {
          setError('Invalid data structure in the response');
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useDataFetching;
