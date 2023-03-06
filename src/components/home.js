import React, { useState } from "react";  
import { read, utils, writeFile } from 'xlsx';
import { useEffect } from 'react';
import axios from 'axios';
import { Form,Button } from "reactstrap";
import Getimage from "./getImage";
const HomeComponent = () => {



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
            console.log("inside api ")
              setname(response.data)
      
            
          },
          (error)=>{
            console.log(error);
      })};
      
       
        console.log("hello")
      






    const [movies, setMovies] = useState([]);

    const handleImport = ($event) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    setMovies(rows)
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }

   

///////////////To post data to backend from text field

const[id,setid]=useState({});

const handleform=(e)=>{
    console.log(id);
    postdatatoserver(id);
    e.preventDefault();
};

const postdatatoserver=(data)=>{
    axios.post('/product' ,data).then(
      (response)=>{
          console.log(response);
          console.log("success");
      },
      (error)=>{
          console.log(error);
          console.log("error");
      }
    )
};

// const generateDocx=()=>{
//     axios.get('/generateDocx').then(
//         (response)=>{
//             console.log(response);

//             //creating new obj of pdf file
            
//         },
//         (error)=>{
//             console.log(error);
//             console.log("error");
//         }
//     )
// };



///////////////


    return (
        <>
        <Form onSubmit={handleform}>
            <div className="row mb-2 mt-5">
                <div className="col-sm-6 offset-3">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="input-group">
                                <div className="custom-file">
                                    <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required onChange={handleImport}
                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                                    
                                </div>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6 offset-3">
                    <table className="table">
                        <thead>
                            <tr>
                                {/* <th scope="col">Id</th> */}
                                <th scope="col">title</th>
                                <th scope="col">Category</th>
                                {/* <th scope="col">Director</th>
                                <th scope="col">Rating</th> */}
                            </tr>
                        </thead>
                        <tbody> 
                                {
                                    movies.length
                                    ?
                                    movies.map((movie, index) => (
                                        <tr key={index}>
                                            {/* <th scope="row">{ index + 1 }</th> */}
                                            <td>{ movie.Movie }</td>


                                            {(movie.Category==="predefine") &&
                                            <td><input type="text" value={name.name}></input></td>}
                                           
                                           {(movie.Category==="textfield") &&
                                            <td><input type="text" name="id" 
                                            onChange={(e)=>{
                                                setid({...id,name:e.target.value})
                                            }}>
                                                </input></td>}

                                            {/* <td>{ movie.Category }</td>
                                            <td>{ movie.Director }</td> */}
                                            {/* <td><span className="badge bg-warning text-dark">{ movie.Rating }</span></td> */}
                                        </tr> 
                                    ))
                                    :
                                    <tr>
                                        <td colSpan="5" className="text-center">No data Found.</td>
                                    </tr> 
                                }
                        </tbody>
                    </table>
                </div>
            </div>
            <Button type="submit" >
           

    Submit
  </Button>
  {/* <Button onClick={Getimage}>GetPDF</Button> */}
  <Getimage />
            </Form>
        </>

    );
};

export default HomeComponent;
