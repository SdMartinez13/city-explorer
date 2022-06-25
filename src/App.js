import React from 'react';
import axios from 'axios';
import Display from './Display';
// import Weather from './Weather';
import Movies from './Movies';



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      city: '',
      cityData: {},
      error: false,
      errorMessage: '',
      weatherData: [],
      movieArray: []
    }
  };

  handleCitySubmit = async (e) => {
    e.preventDefault();
    try {

      this.handleLocation();

      // this.handleWeather();

      this.handleMovies();


      this.setState({
        flag: true,

      })


    } catch (error) {

      this.setState({
        error: true,
        errorMessage: `An Error Occurred: ${error.response.status}`

      })

    };


  };
  handleMovies = async (e) => {
    let url = `${process.env.REACT_APP_SERVER}/movie?searchQueryCity=${this.state.city}`
    console.log(url);
    let cityMovie = await axios.get(url);
    let movieData = cityMovie.data

    this.setState({
      movieArray: movieData

    });

  };
  handleWeather = async (locationData) => {
    console.log(locationData, 'locationData');
    // let cityForecast = await axios.get(`${process.env.REACT_APP_SERVER}/weather?searchQueryCity=${this.state.city}`);
    let cityForecast = await axios.get(`${process.env.REACT_APP_SERVER}/weather?lat=${locationData.lat}&lon=${locationData.lon}`);

    let forecast = cityForecast.data;


    this.setState({
      weatherData: forecast

    });


  };
  handleLocation = async (e) => {

    let data = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`);

    let cityDataMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${data.data[0].lat},${data.data[0].lon}&zoom=11`

    this.setState({
      cityData: data.data[0],
      img: cityDataMap

    });
    this.handleWeather(data.data[0]);
  };
    handleCityInput = (e) => {
      this.setState({
        city: e.target.value
      })
    };


    render(){

      // console.log(this.state);
      // console.log(this.state.weatherData);

      return (

        <>
          <Display
            handleCityInput={this.handleCityInput}
            handleCitySubmit={this.handleCitySubmit}
            error={this.state.error}
            errorMessage={this.state.errorMessage}
            cityData={this.state.cityData}
            weatherData={this.state.weatherData}
          />



          {this.state.movieArray.length &&
            <Movies
              movie={this.state.movieArray}
            />
          };


        </>

      );
    }
  };
export default App;
