import axios from 'axios';
import React, {useMemo, createContext, useState, useEffect , useContext } from 'react';
import Router from 'src/routes/sections';
import { useRouter } from 'src/routes/hooks';

const MyContext = createContext();

export const MyProvider = ({children}) => {

  

  const [data, setData] = useState('Some data');
  const router = useRouter();

  useEffect(() => {
    axios.get('http://localhost:8000/home', {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    })
      .then(response => {
        // console.log(response.data);
        if(response.data==="ns"){
          router.push('/login');
        }
        setData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  // Memoize the context value
  const value = useMemo(() => ({ data, setData }), [data]);

  return (
    <MyContext.Provider value={value} >
        {children}
        </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
