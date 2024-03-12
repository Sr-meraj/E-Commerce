import axios from 'axios';
import { useState } from 'react';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api/v1/', 
});

const useDataMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (method, url, data) => {
    try {
      setLoading(true);
      // Introduce a 1.2 seconds (1200 milliseconds) loading delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const response = await axiosInstance({
        method,
        url,
        data,
      });

      if (response.data && response.data.data) {
        setError(null);
        return response.data.data;
      } else {
        setError('Invalid data structure in the response');
        return null;
      }
    } catch (err) {
      setError(err.message || 'An error occurred while sending the request');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const postData = async (url, data) => {
    return await sendRequest('post', url, data);
  };

  const putData = async (url, data) => {
    return await sendRequest('put', url, data);
  };

  const deleteData = async (url) => {
    return await sendRequest('delete', url);
  };
  const getData = async (url) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await axiosInstance.get(url);

      if (response.data && response.data.data) {
        setError(null);
        return response.data.data;
      } else {
        setError('Invalid data structure in the response');
        return null;
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching data');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, postData, putData, deleteData,getData };
};

export default useDataMutation;
