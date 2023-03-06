
import axios from "axios";
import React, { useState } from "react";
import { Form,Button } from "reactstrap";
import Base64Downloader from 'common-base64-downloader-react';



var Buffer =require("buffer/").Buffer
const Getimage = () => {
    const [base64, setBase64] = useState();
    const getimageFromServer=()=>{
        axios.get(`/generateDocx`,{
            responseType: "arraybuffer",
          }).then(
            (response)=>{
                    console.log(response);
          
                    // setimageDetails(response.data);
                    setBase64(Buffer.from(response.data, "binary").toString("base64"))
                    console.log(toString(base64));
                    console.log(base64)
               
            },
            (error)=>{
                    console.log(error);
            }
        )        
};

const downloadPDF=(base64)=> {
    const linkSource = `data:application/pdf;charset=utf-8;base64,${base64}`;
    const downloadLink = document.createElement("a");
    const fileName = "file.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();

};


const getPdf=()=>{

axios({
    url: '/download', //your url
    method: 'GET',
    responseType: 'blob', // important
}).then((response) => {
    // create file link in browser's memory
    const href = URL.createObjectURL(response.data);

    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', 'file.pdf'); //or any other extension
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
});
}




////////////////////////get excel
const getExcel=()=>{

  axios({
      url: '/form_file', //your url
      method: 'GET',
      responseType: 'blob', // important
  }).then((response) => {
      // create file link in browser's memory
      const href = URL.createObjectURL(response.data);
  
      // create "a" HTML element with href to file & click
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', 'file.xlsx'); //or any other extension
      document.body.appendChild(link);
      link.click();
  
      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
  });
  }


  return (
    <div>
   
   {/* <img src={`data:image/jpeg;charset=utf-8;base64,${base64}`} height={'50'}/> */}

   

    <Button onClick={getExcel}>Form</Button>
    <Button onClick={getPdf}>get pdfe</Button>

    </div>
  )
}

export default Getimage
