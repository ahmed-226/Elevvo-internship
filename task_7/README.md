# Weather Dashboard - Real-Time Weather Data

![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)
![OpenWeatherMap](https://img.shields.io/badge/API-OpenWeatherMap-blue)
![Responsive](https://img.shields.io/badge/design-responsive-orange)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow)

![alt text](<demo.gif>)

A modern, responsive weather dashboard that provides real-time weather information for any city worldwide. This project demonstrates API integration, geolocation services, and dynamic data visualization with a clean, minimal user interface.

## Features

### Core Requirements
- **Real-time Weather Data**: Fetches current weather for multiple cities
- **Temperature Display**: Shows current temperature with weather icons
- **3-Day Forecast**: Detailed weather predictions with daily breakdown
- **Search Functionality**: City search with input validation and error handling
- **Loading States**: Animated spinner during data fetching
- **Clean UI Design**: Minimal, professional interface with responsive layout

### Weather Details
- **Current Temperature**: Real-time temperature readings in Celsius
- **Weather Icons**: Visual weather representation from OpenWeatherMap
- **Weather Description**: Detailed weather condition descriptions
- **Feels Like Temperature**: Perceived temperature readings
- **Humidity Levels**: Current atmospheric humidity percentage
- **Wind Speed**: Real-time wind speed measurements
- **Atmospheric Pressure**: Current barometric pressure readings
- **Visibility**: Current visibility distance in kilometers

### Advanced Features
- **Geolocation Support**: Auto-detect user's current location
- **Recent Searches**: Local storage of recently searched cities
- **Error Handling**: Comprehensive error messages and fallback options
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Smooth Animations**: CSS3 animations and transitions
- **Glass Morphism UI**: Modern backdrop filter effects



## Technologies Used

- **HTML5**: Semantic markup and responsive structure
- **CSS3**: Modern styling with grid, flexbox, and animations
- **JavaScript (ES6+)**: Classes, async/await, and modern syntax
- **OpenWeatherMap API**: Real-time weather data integration
- **Geolocation API**: Browser location services
- **Local Storage**: Client-side data persistence
- **Fetch API**: Modern HTTP requests and error handling



## Setup Instructions

### 1. Get OpenWeatherMap API Key
1. Visit [OpenWeatherMap API](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to the API keys section
4. Copy your personal API key

### 2. Configure the Application
1. Open `script.js` in your code editor
2. Find the line: `this.API_KEY = 'YOUR_API_KEY_HERE';`
3. Replace `'YOUR_API_KEY_HERE'` with your actual API key
4. Save the file

### 3. Run the Application
```bash
# Using Python HTTP Server
python -m http.server 8000

# Using VS Code Live Server
# Right-click on index.html -> "Open with Live Server"
```

## API Integration Details

### Current Weather API
- **Endpoint**: `https://api.openweathermap.org/data/2.5/weather`
- **Parameters**: City name, API key, metric units
- **Response**: Temperature, weather conditions, wind, humidity

### Forecast API
- **Endpoint**: `https://api.openweathermap.org/data/2.5/forecast`
- **Parameters**: Coordinates, API key, metric units
- **Response**: 5-day forecast data processed to show 3 days

### Geolocation Integration
- **Browser API**: `navigator.geolocation`
- **Fallback**: Manual city search if location unavailable
- **Error Handling**: Comprehensive permission and availability checks

## Key Features Implemented

### Weather Display
- **Dynamic Content**: Real-time data rendering with JavaScript
- **Weather Icons**: Official OpenWeatherMap weather icons
- **Temperature Cards**: Organized information display with visual hierarchy
- **Forecast Cards**: 3-day prediction with daily weather details

### User Experience
- **Search Interface**: Intuitive city search with enter key support
- **Location Button**: One-click current location weather
- **Recent Searches**: Quick access to previously searched cities
- **Error Messages**: User-friendly error handling and guidance

### Performance Features
- **Async Operations**: Non-blocking API requests with Promise.all
- **Loading States**: Visual feedback during data fetching
- **Error Recovery**: Graceful fallbacks and retry mechanisms
- **Local Caching**: Recent searches stored in browser localStorage


## Browser Compatibility

- **Modern Browsers**: Chrome 60+, Firefox 55+, Safari 11+, Edge 79+
- **JavaScript Required**: ES6+ features including classes and async/await
- **HTTPS Required**: Geolocation API requires secure connections
- **Mobile Responsive**: Optimized for iOS Safari and Chrome Mobile


## Troubleshooting

### Common Issues
- **API Key Error**: Ensure your OpenWeatherMap API key is correctly configured
- **Location Unavailable**: Check browser location permissions and internet connection
- **City Not Found**: Verify city spelling and try alternative names
- **HTTPS Required**: Use a local server or HTTPS for geolocation features

### Performance Tips
- **Modern Browser**: Use updated browsers for optimal performance
- **Stable Connection**: Ensure reliable internet for real-time data
- **Clear Cache**: Refresh if experiencing data inconsistencies

## Future Enhancements

- **Weather Maps**: Interactive weather map integration
- **Extended Forecast**: 7-day weather predictions
- **Weather Alerts**: Severe weather notifications
- **Unit Conversion**: Fahrenheit/Celsius toggle
- **Dark Mode**: Alternative color scheme option
- **Historical Data**: Past weather information and trends

---

*Created as part of Elevvo Internship Task 7*
