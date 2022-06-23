import React from 'react';
import axios from 'axios';
import Display from './Display';
import Weather from './Weather';
import Movies from './Movies';



class App extends React.Component {
 constructor(props) {
  super(props) 
    this.state = {
      city: '',
      cityData: 0,
      error: false,
      errorMessage: '',
      weatherData: [],
      movieArray: []
    }
  }  

  handleCitySubmit = async(e) => {
    e.preventDefault();
    try {
      let data =  await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`);

      let cityDataMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${data.data[0].lat},${data.data[0].lon}&zoom=14`

      let cityForecast = await axios.get(`${process.env.REACT_APP_SERVER}/weather?searchQueryCity=${this.state.city}`);
      let forecast = cityForecast.data;
      console.log(cityForecast);
      let url = `${process.env.REACT_APP_SERVER}/movies?movieQueryCity=${this.state.city}`
      let cityMovie = await axios.get(url);
      let movieData = cityMovie.data



      this.setState ({
        cityData: data.data[0],
        flag:true,
        img: cityDataMap,
        weatherData: forecast,
        movieArray: movieData
      })


    } catch (error) {

      this.setState({
        error:true,
        errorMessage:`An Error Occurred: ${error.response.status}`

      })

    }

    
  }
  handleCityInput = (e) => {
    this.setState({
      city: e.target.value
    })
  }





  // handleCitySubmit = async(e) => {
  //   e.preventDefault();
  //   let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;

  //   let cityInfo = await axios.get(url).catch(this.catch);

  //   let cityForecast = await axios.get(`${process.env.REACT_APP_SERVER}/weather?searchQueryCity=${this.state.city}`).catch(err => {
  //     console.log(err);
  //   });

  //   let forecast = [];
  //   if (!!cityForecast) {
  //     forecast = cityForecast.data;
  //   }

  //   console.log(forecast, 'forecast');
  //   if (!cityInfo) return
  //   this.setState({
  //     cityData: cityInfo.data[0],
  //     error: false,
  //     errorMessage: '',
  //     weatherData: forecast
  //   })

  // };

  //  catch = (error) => {
  //   console.log(error, 'here is an error')
  //   this.setState({
  //     error: true,
  //     // errorMessage: `An error occured: ${error.response.status}`,
  //     errorMessage: `ERROR ${error.response.status}: Could not find ${this.state.city}`,
  //     cityData: {}
  //   })

  // }

  // handleCityInput = (e) => {
  //   this.setState({
  //     city: e.target.value
  //   })

  // }

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
        {this.state.weatherData.length && 
          <Weather
            weatherData={this.state.weatherData}
            city={this.state.city}
          />
        }

        {this.state.movieArray.length &&
          <Movies
            movie={this.state.movieArray}
          />
        }
      </>
  
  );
}
};
export default App;
