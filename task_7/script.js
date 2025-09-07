class WeatherDashboard {
    constructor () {
        
        this.API_KEY = '3f79182c2e88967fbc809eb0125766da'; 
        this.BASE_URL = 'https://api.openweathermap.org/data/2.5';
        this.ONE_CALL_URL = 'https://api.openweathermap.org/data/3.0/onecall';

        
        this.cityInput = document.getElementById('cityInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.locationBtn = document.getElementById('locationBtn');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.errorMessage = document.getElementById('errorMessage');
        this.currentWeather = document.getElementById('currentWeather');
        this.forecastSection = document.getElementById('forecastSection');
        this.recentSearches = document.getElementById('recentSearches');

        
        this.init();
    }

    init() {
        
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.locationBtn.addEventListener('click', () => this.getCurrentLocation());
        this.cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });

        
        this.loadRecentSearches();

        
        if (this.API_KEY === 'YOUR_API_KEY_HERE') {
            this.showError('Please add your OpenWeatherMap API key to script.js to use this dashboard.');
        }
    }

    async handleSearch() {
        const city = this.cityInput.value.trim();
        if (!city) {
            this.showError('Please enter a city name.');
            return;
        }

        if (this.API_KEY === 'YOUR_API_KEY_HERE') {
            this.showError('Please add your OpenWeatherMap API key to script.js');
            return;
        }

        await this.fetchWeatherData(city);
    }

    async getCurrentLocation() {
        if (!navigator.geolocation) {
            
            await this.getLocationByIP();
            return;
        }

        
        if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
            this.showError('Location services require HTTPS. Trying IP-based location...');
            await this.getLocationByIP();
            return;
        }

        this.showLoading();

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                await this.fetchWeatherDataByCoords(latitude, longitude);
            },
            async (error) => {
                this.hideLoading();
                console.log('GPS location failed, trying IP-based location...', error);
                await this.getLocationByIP();
            },
            {
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 300000
            }
        );
    }

    async getLocationByIP() {
        try {
            this.showLoading();

            
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();

            if (data.latitude && data.longitude) {
                await this.fetchWeatherDataByCoords(data.latitude, data.longitude);
            } else {
                throw new Error('IP location failed');
            }
        } catch (error) {
            this.hideLoading();
            this.showError('Unable to determine your location. Please search for a city manually.');
        }
    }

    async fetchWeatherData(city) {
        this.showLoading();
        this.hideError();

        try {
            
            const currentResponse = await fetch(
                `${this.BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${this.API_KEY}&units=metric`
            );

            if (!currentResponse.ok) {
                throw new Error('City not found');
            }

            const currentData = await currentResponse.json();

            
            const { lat, lon } = currentData.coord;
            await this.fetchDetailedWeatherData(lat, lon, currentData.name);

            
            this.saveRecentSearch(currentData.name);
            this.cityInput.value = '';

        } catch (error) {
            this.hideLoading();
            this.showError('City not found. Please check the spelling and try again.');
        }
    }

    async fetchWeatherDataByCoords(lat, lon) {
        try {
            
            const reverseGeoResponse = await fetch(
                `${this.BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric`
            );

            if (!reverseGeoResponse.ok) {
                throw new Error('Location not found');
            }

            const locationData = await reverseGeoResponse.json();
            await this.fetchDetailedWeatherData(lat, lon, locationData.name);

            
            this.saveRecentSearch(locationData.name);

        } catch (error) {
            this.hideLoading();
            this.showError('Unable to fetch weather data for your location.');
        }
    }

    async fetchDetailedWeatherData(lat, lon, cityName) {
        try {
            
            
            const promises = [
                fetch(`${this.BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric`),
                fetch(`${this.BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric`)
            ];

            const [currentResponse, forecastResponse] = await Promise.all(promises);

            if (!currentResponse.ok || !forecastResponse.ok) {
                throw new Error('Failed to fetch weather data');
            }

            const [currentData, forecastData] = await Promise.all([
                currentResponse.json(),
                forecastResponse.json()
            ]);

            this.hideLoading();
            this.displayCurrentWeather(currentData);
            this.displayForecast(forecastData);

        } catch (error) {
            this.hideLoading();
            this.showError('Failed to fetch detailed weather data.');
        }
    }

    displayCurrentWeather(data) {
        
        document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById('dateTime').textContent = this.formatDate(new Date());

        
        const iconCode = data.weather[0].icon;
        document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
        document.getElementById('weatherDescription').textContent = data.weather[0].description;

        
        document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)}°C`;
        document.getElementById('humidity').textContent = `${data.main.humidity}%`;
        document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;
        document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
        document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`;
        document.getElementById('uvIndex').textContent = 'N/A'; 

        
        this.currentWeather.classList.remove('hidden');
    }

    displayForecast(data) {
        const forecastContainer = document.getElementById('forecastContainer');
        forecastContainer.innerHTML = '';

        
        const dailyForecasts = this.processForecastData(data.list);

        dailyForecasts.forEach(forecast => {
            const forecastCard = this.createForecastCard(forecast);
            forecastContainer.appendChild(forecastCard);
        });

        this.forecastSection.classList.remove('hidden');
    }

    processForecastData(forecastList) {
        const dailyData = {};
        const today = new Date().toDateString();

        forecastList.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dateString = date.toDateString();

            
            if (dateString !== today && date.getHours() >= 11 && date.getHours() <= 13) {
                if (!dailyData[dateString]) {
                    dailyData[dateString] = item;
                }
            }
        });

        return Object.values(dailyData).slice(0, 3);
    }

    createForecastCard(forecast) {
        const card = document.createElement('div');
        card.className = 'forecast-card';

        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        card.innerHTML = `
            <div class="forecast-date">${dayName}<br><small>${dateStr}</small></div>
            <img class="forecast-icon" src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="${forecast.weather[0].description}">
            <div class="forecast-temp">${Math.round(forecast.main.temp)}°C</div>
            <div class="forecast-desc">${forecast.weather[0].description}</div>
            <div style="margin-top: 10px; font-size: 0.8rem; color: #666;">
                <div>💧 ${forecast.main.humidity}%</div>
                <div>💨 ${forecast.wind.speed} m/s</div>
            </div>
        `;

        return card;
    }

    saveRecentSearch(cityName) {
        let recentCities = JSON.parse(localStorage.getItem('recentWeatherSearches')) || [];

        
        recentCities = recentCities.filter(city => city !== cityName);

        
        recentCities.unshift(cityName);

        
        recentCities = recentCities.slice(0, 5);

        localStorage.setItem('recentWeatherSearches', JSON.stringify(recentCities));
        this.loadRecentSearches();
    }

    loadRecentSearches() {
        const recentCities = JSON.parse(localStorage.getItem('recentWeatherSearches')) || [];
        const container = document.getElementById('recentCities');

        if (recentCities.length === 0) {
            this.recentSearches.classList.add('hidden');
            return;
        }

        container.innerHTML = '';
        recentCities.forEach(city => {
            const cityElement = document.createElement('span');
            cityElement.className = 'recent-city';
            cityElement.textContent = city;
            cityElement.addEventListener('click', () => {
                this.cityInput.value = city;
                this.handleSearch();
            });
            container.appendChild(cityElement);
        });

        this.recentSearches.classList.remove('hidden');
    }

    formatDate(date) {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return date.toLocaleDateString('en-US', options);
    }

    showLoading() {
        this.loadingSpinner.classList.remove('hidden');
        this.hideError();
        this.currentWeather.classList.add('hidden');
        this.forecastSection.classList.add('hidden');
    }

    hideLoading() {
        this.loadingSpinner.classList.add('hidden');
    }

    showError(message) {
        document.querySelector('#errorMessage p').textContent = message;
        this.errorMessage.classList.remove('hidden');
        this.hideLoading();
    }

    hideError() {
        this.errorMessage.classList.add('hidden');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new WeatherDashboard();
});


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
