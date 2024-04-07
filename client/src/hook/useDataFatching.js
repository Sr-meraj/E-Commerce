import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../utility/utility';
const useDataFetching = (url) => {
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       // Introduce a 1.2 seconds (1200 milliseconds) loading delay
  //       await new Promise((resolve) => setTimeout(resolve, 1000));
  //       const response = await axiosInstance.get(url);
  //       if (response.data && response.data.data) {
  //         setData(response.data.data);
  //         setError(null);
  //       } else {
  //         setError('Invalid data structure in the response');
  //       }
  //     } catch (err) {
  //       setError(err.message || 'An error occurred while fetching data');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [url]);

  // return { data, loading, error };

   const { isPending, error, data } = useQuery({
      queryKey: ['Data', url],
     queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const { data } = await axiosInstance.get(url)
        if (data.success) {
            return data.data;
        } else {
          throw new Error('Failed to fetch products');
        }
     },
        
   });
  return { data, loading: isPending, error };
  
};

export default useDataFetching;
