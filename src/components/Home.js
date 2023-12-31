import React, {useState} from 'react'
import './Home.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CryptoJS from "crypto-js";


const Home = () => {
    // U2FsdGVkX1/PtCjVEm5pjzX2VjELF7rOfT/1SC1hjxi2PXik6NLi7hHDOuLc4F3x
    const [text, settext] = useState("");
    const [encrptedData, setEncrptedData] = useState("");
    const [decrptedData, setDecrptedData] = useState("");
  
    const secretPass = "Minato_Namekaze_is_the_goat";
    // const delay = ms => new Promise(
    //     resolve => setTimeout(resolve, ms)
    // );
    // const reroute = async () => {
    //     decryptData() ;
    //     console.log('reroute' + decrptedData);
    //     const latitude= decrptedData.substring(0,10);
    //     const longitude = decrptedData.substring(10,20);
    //     // console.log('reroute');
    //     console.log('reroute'+latitude);
    //     console.log(longitude);
    //     window.open(`https://maps.google.com/?q=${latitude},${longitude}`);
    // }
  
    const encryptData = (d) => {
      const data = CryptoJS.AES.encrypt(
        JSON.stringify(d),
        secretPass
      ).toString();
      setEncrptedData(data);
      settext(data)
    };
  
    const decryptData = async () => 
    {
      if(text === "")
        alert("Enter a Valid Code")
      else
      {
        const bytes = CryptoJS.AES.decrypt(text, secretPass);
        const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      //   setDecrptedData(data);
      //   await delay (1000);
          const latitude= data.substring(0,10);
          const longitude = data.substring(10,20);
          // console.log('reroute');
          console.log('reroute'+latitude);
          console.log(longitude);
          window.open(`https://maps.google.com/?q=${latitude},${longitude}`);
      }
    };

    const handleLocationClick = () => 
    {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(success, error);
        } else {
          console.log("Geolocation not supported");
        }
    }
    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const data = JSON.stringify(latitude)+JSON.stringify(longitude) ;
        console.log(data);
        encryptData(data);
        console.log(encrptedData);
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }
    const error = () => {
        console.log("Unable to retrieve your location");
    };

  return (
    <div className='home'>
        <div className='text'>
        <TextField sx={{ width: '40%', minWidth: '300px', "& fieldset": { border: 'none' },borderRadius: '15px', backgroundColor: '#bd94ff',boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' , marginBottom: '20px'}} rows={8} multiline
        value = {text}
        onChange={(e) => {
            settext(e.target.value);
            console.log(text);
        }}
        />
        </div>

        <div><Button sx={{backgroundColor:  'white', color: '#0471c4' , fontWeight: 600 , marginTop: '2vh' }} className='get-code'  onClick={handleLocationClick}> Get Code </Button></div>
        <div><Button sx={{backgroundColor: 'white' , color: '#0471c4', fontWeight: 600 ,marginTop: '2vh'}} className='get-location' onClick={decryptData}> Get Location </Button></div>
    </div>
  )
}

export default Home ;

