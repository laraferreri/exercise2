import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Header from "../components/Header";

const weatherKey = "e5b2a6cebce49a66e025c491648d01f2"

function Home() {
     const [weatherData, setWeatherData] = useState(null);
     useEffect(() => {
        axios
             .get(
                 `api.openweathermap.org/data/2.5/weather?q=${"Seoul"}&appid=${weatherkey}`
                )
    .then(function (response) {
        const weather= respose.data;
        setWeatherData(response);
    })
    .catch(function (error) {
      console.log(error);
    }); 
    }, []);

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
        currentTemp = `${weatherData.main.temp}`;
        highTemp= `${weatherData.main.high.temp}%`;
        lowTemp= `${weatherData.main.humidity}%`;
        weatherType=  `${weatherData.main.weather.type}%`;
        windSpeed= `${weatheData.main.wind.speed} km/h`;
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
            <h2> Weather in {city}</h2>
            <div className= "WeatherInfo">
            <p>Weather Type: {weatherData.weather[0].description}</p>
            <p>Current Temperature: {weatherType}</p>
            <p>High Temerature: 100 {highTemp}</p>
            <p>Low Temperature : {lowTemp}</p>
            <p>Cloudiness: {cloudiness}</p>
            <p> Humidity: {humidity} </p>
            <p>Wind Spreed: {windSpeed}</p>

            </div>
        </main>
        </> 
    );
}

export default Home