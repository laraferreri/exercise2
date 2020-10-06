import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Header from "../components/Header";

const weatherKey = "e5b2a6cebce49a66e025c491648d01f2"

function Home() {
     const history = useHistory();
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
            <h2> Weather in {city}</h2>
            <div className= "WeatherInfo">
            <p>Weather Type: {weatherType}</p>
            <p>Current Temperature: {weatherType}</p>
            <p>High Temerature: {highTemp}</p>
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