document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "bcffe04da54abbb310b7be9bc04d3b8e";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");

    function displayWeather(data) {
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        switch (data.weather[0].main) {
            case 'Clouds':
                weatherIcon.src = "images/clouds.png";
                break;
            case 'Clear':
                weatherIcon.src = "images/clear.png";
                break;
            case 'Drizzle':
                weatherIcon.src = "images/drizzle.png";
                break;
            case 'Mist':
                weatherIcon.src = "images/mist.png";
                break;
            case 'Rain':
                weatherIcon.src = "images/rain.png";
                break;
            case 'Snow':
                weatherIcon.src = "images/snow.png";
                break;
            case 'Haze':
                weatherIcon.src = "images/haze.png";
                break;
            default:
                weatherIcon.src = "";
                break;
        }
    }

    async function checkWeather(city) {
        try {
            const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            console.log(data);

            displayWeather(data);

            // Save weather data to local storage
            localStorage.setItem('weatherData', JSON.stringify(data));
        } catch (error) {
            alert("Please check your input again.");
        }
    }

    function loadWeather() {
        const savedWeather = localStorage.getItem('weatherData');
        if (savedWeather) {
            const data = JSON.parse(savedWeather);
            displayWeather(data);
        }
    }

    searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value);
    });

    searchBox.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            checkWeather(searchBox.value);
        }
    });

    loadWeather();
});
