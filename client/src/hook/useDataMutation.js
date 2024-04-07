import axios from 'axios';
import { useState } from 'react';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api/v1/', 
});

const useDataMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const sendRequest = async (method, url, data, token) => {
  try {
    setLoading(true);

    const response = await axiosInstance({
      method,
      url,
      data,
      headers: {
        Authorization: `Bearer ${token}` // Include token here
      }
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

  const postData = async (url, data,token) => {
    return await sendRequest('post', url, data, token);
  };

  const putData = async (url, data, token) => {
    return await sendRequest('put', url, data, token);
  };
  const patchData = async (url, data, token) => {
    return await sendRequest('patch', url, data, token);
  };

  const deleteData = async (url, token) => {
    return await sendRequest('delete', url, token);
  };
  const getData = async (url,info) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const response = await axiosInstance.get(url, info);

      if (response.data && response.data.data) {
        setError(null);
        return response.data;
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

  return { loading,setLoading, error,patchData, postData, putData, deleteData,getData };
};

export default useDataMutation;