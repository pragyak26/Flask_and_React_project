import logo from './logo.svg';
import './App.css';
import HomeComponent from './components/home';
import { useEffect ,useState} from 'react';
import axios from 'axios';
import Getimage from './components/getImage';



function App() {

const [name,setname] = useState([]);
useEffect(()=>{
  getName1();
},[])

useEffect(() => {
  console.log(name)
}, [name])

const getName1=()=>{
  axios.get('http://127.0.0.1:5000/api').then(response=>{
   
      console.log(response);

        setname(response.data)

      
    },
    (error)=>{
      console.log(error);
})};

 
  console.log("hello")


  return (

    <div className="App">
     <h1>Read gimis excel data and create a form</h1>
     <HomeComponent/>

  
    
    </div>)


}

export default App;
