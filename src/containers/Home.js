import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Header from "../components/Header";
import WeatherImage from "../components/WeatherImage"

const weatherKey = "e5b2a6cebce49a66e025c491648d01f2"

function Home() {
     const history = useHistory();console.log("history", history)
     const [weatherData, setWeatherData] = useState(null);
     const [city, setCity] = useState("Tokyo");
    
     useEffect(() => {
        axios
             .get(
                 `api.openweathermap.org/data/2.5/weather?q=${"Seoul"}&appid=${weatherKey}`
                )
    .then(function (response) {
        const weather= response.data;
        setWeatherData(weather);
    })
    .catch(function (error) {
      console.log(error);
    }); 
    }, []);

    useEffect (() => {
        const searchParams = history.location.search;
        const urlParams = new URLSearchParams (searchParams);
        const city = urlParams.get("city");
        if (city){
            setCity(city);
        }
    }, [history]);

 const { 
     currentTemp,  
     weatherType,
     highTemp,
     lowTemp,
     cloudiness,
     humidity,
     windSpeed
}= useMemo(() => {
    let cloudiness = '';
    let currentTemp = '';
    let highTemp = '';
    let lowTemp = '';
    let weatherType = '';
    let humidity = '';
    let windSpeed = '';

    if(weatherData){
        cloudiness= `${weatherData.clouds.all}%`;
        currentTemp = `${weatherData.main.temp}`;
        highTemp= `${weatherData.main.temp_max}%`;
        lowTemp= `${weatherData.main.temp_min}%`;
        weatherType= `${weatherData.weather[0].description}%`;
        windSpeed= `${weatherData.main.wind.speed} km/h`;
        humidity= `${weatherData.main.humidity}%`;
    }

    return { 
        cloudiness,
        currentTemp,
        highTemp,
        humidity,
        lowTemp,
        weatherType,
        windSpeed,
    };

}, [weatherData]);


    return(
        <>
    <Header/>
        <main className= "Home" >
            <h2> Weather in <span>{city}</span></h2>
            <div className= "WeatherInfo">
                <div className= "WeatherInfo_Basic">
                    <div className= "WeatherInfo_Image">
                        <WeatherImage weatherType={weatherType} />
                </div>
                <p className="WeatherInfo_Type">{weatherType}</p>
                <h3 className="Label">Current Temperature</h3>
                <p className= "WeatherInfo_Temperature">{currentTemp}</p>
                </div>
            <div className= "WeatherInfo_Extra">
                <div className= "WeatherInfo_Extra_Column">
                <h3 className="Label">High Temerature: </h3>
                <p className="WeatherInfo_Temperature_Small">{highTemp}</p>
                <h3 className="Label">Low Temperature : </h3>
                <p className="WeatherInfo_Temperature_Small">{lowTemp}</p>
                </div>
                <div className= "WeatherInfo_Extra_Column">
                <h3 className="Label">Cloudiness: </h3>
                <p className="WeatherInfo_Temperature_Small">{cloudiness}</p>
                <h3 className="Label"> Humidity: </h3>
                <p className="WeatherInfo_Temperature_Small">{humidity} </p>
                <h3 className="Label">Wind Spreed: </h3>
                <p className="WeatherInfo_Temperature_Small">{windSpeed}</p>
                </div>
            </div>
            </div>
        </main>
        </> 
    );
}

export default Home