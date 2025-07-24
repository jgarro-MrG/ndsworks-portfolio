import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetchData(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setData(response.data);
      })
      .catch(err => {
        console.error(`Error fetching data from ${url}:`, err);
        setError('Could not fetch data. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

export default useFetchData;