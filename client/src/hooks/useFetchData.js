import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetchData(url, lang) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fullUrl = lang ? `${url}${url.includes('?') ? '&' : '?'}lang=${lang}` : url;
    axios.get(fullUrl)
      .then(response => {
        setData(response.data);
      })
      .catch(err => {
        console.error(`Error fetching data from ${fullUrl}:`, err);
        setError('Could not fetch data. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url, lang]);

  return { data, loading, error };
}

export default useFetchData;
