import { useEffect, useState } from 'react'
import axios from "axios"
import './App.css'
import { Register } from './components/RegisterPage/Register';

interface Data {
  text: string;
}

function App() {
  const [data, setData] = useState<Data>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await axios.get<Data>("http://localhost:5000/test")
  //     .then((res) => setData(res.data))
  //     .catch((ex) => console.log(ex));
  //   };

  //   fetchData();
  // }, [])

  return (
    <>
      <Register/>
    </>
  )
}

export default App
