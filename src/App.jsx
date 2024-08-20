import { useState, } from 'react'
import './App.css'
/*Images*/
import SearchIcon from "./assets/Search.png";
import CloudIcon from "./assets/Cloud.png";
import DrizzleIcon from "./assets/Drizzle.png";
import HumidityIcon from "./assets/Humidity.png";
import RainIcon from "./assets/Rain.png";
import SnowIcon from "./assets/Snow.png";
import SunIcon from "./assets/Sun.png";
import WindIcon from "./assets/Wind.png";
import { useEffect } from 'react';

const WeatherDetails =({icon,temp,city,country,lat,log,humidity,wind}) => {
  return(<>
    <div className='image'>
      <img className='snow' src={icon} alt='Image'/>
    </div>
    <div className='temp'>{temp}°C</div>
    <div className='location'>{city}  </div>
    <div className='country'> {country} </div>
    <div className='cord'> 
    <div>
      <span className='lat'>latitude </span>
      <span>{lat}</span>
      </div>
      <div>
      <span className='log'>longitude </span>
      <span>{log}</span>
      </div>
      </div>
      <div className='data-container'>
        <div className='element'>
        <img src={HumidityIcon} alt=''
        className='icon'/>
        <div className='data'>
          <div className='humidity-percent'>{humidity}%</div>
          <div className='text'> Humidity </div>
        </div>
        </div>
     
      <div className='element'>
        <img src={WindIcon} alt=''
        className='icon'/>
        <div className='data'>
          <div className='wind-percent'>{wind} km/h</div>
          <div className='text'> Windspeed </div>
        </div>
        </div>
        </div>
        <p className='copyright'>
          Designed by <span> Sundaraganesan </span>
        </p>
       
  </>)
}




function App() {
  let api_key =`712c89572f1051cb647a4b6d6f10890f`;
  const [text,setText] = useState("london")
  const [icon , seticon]= useState (SnowIcon);
  const [temp , settemp]= useState (0);
  const [city , setcity]= useState ("london")
  const [ country, setcountry]= useState ("India")
  const [lat , setlat]= useState (0);
  const [log , setlog]= useState (0);
  const [humidity, sethumidity] = useState(0);
  const [ wind, setwind] = useState(0);

  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false)

  const weatherIconMap ={
    "01d": SunIcon,
    "01n": SunIcon,
    "02d": CloudIcon,
    "02n": CloudIcon,
    "03d": DrizzleIcon,
    "03n": DrizzleIcon,
    "04d": DrizzleIcon,
    "04n": DrizzleIcon,
    "09d": RainIcon,
    "09n": RainIcon,
    "10d": RainIcon,
    "10n": RainIcon,
    "13d": SnowIcon,
    "13n": SnowIcon,
  }

  const search = async()=>{

    setLoading(true)
    
    let url =`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

    try{
      let res = await fetch(url)
      let data = await res.json()
     //console.log(data)
     if (data.cod === "404"){
      console.error("City not found")
      setCityNotFound(true)
      setLoading(false)
      return;
     } 

      sethumidity(data.main.humidity)
      setwind (data.wind.speed)
      settemp (Math.floor(data.main.temp))
      setcity (data.name)
      setcountry(data.sys.country)
      setlat(data.coord.lat)
      setlog(data.coord.lon)
      const weatherIconcode = data.weather[0].icon
  seticon(weatherIconMap [weatherIconcode]|| SunIcon)
  setCityNotFound(false)
}  
    catch(error){   
      console.error("An error occurred:",error.message)
    }
    finally{
      setLoading(false)
    }
  } 

  const handleCity =(e) => {
    setText(e.target.value);
  }
  const handleKeyDown=(e)=>{
    if (e.key== "Enter"){
      search();
    }
  }
  useEffect(function(){
    search();
  },[])
  return (
    <>
      <div className='container'>
      <div className='input-container'>
      <input type='text'
       className='cityInput'
       placeholder='Search City' onChange={handleCity}text
        value={text} onKeyDown={handleKeyDown}
       />
       <div className='search-icon' onClick={()=> search() }>
        <img className= "search"src={SearchIcon} alt='search'/>
        </div>
      </div> 
        <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind}/>
      </div>
    </>
  )
}

export default App
