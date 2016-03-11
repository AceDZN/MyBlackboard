var React = require('react');

var WeatherStore = require('./weather-store');
var ConfigForm = require('./partials/configuration-form');
var WeatherIcon = require('./partials/icon');

module.exports = React.createClass({

  getInitialState: function(){
    return {
      lon: this.props.lon || "-0.13",
      lat: this.props.lat || "51.51",
      location: this.props.location || "London",
      inputLocation:"",
      weather:[],
      main:[],
      config_visibility: "hide",
      config_icon: "config"
    }
  },
  handleInputChange: function(e){
    this.setState({
      inputLocation: e.target.value
    });
  },
  handleConfigDisplay: function(){
    if(this.state.config_visibility == "animated fadeOut" || this.state.config_visibility == "hide"){
      this.setState({config_visibility: "animated fadeIn",config_icon: "close"});
    } else {
      this.setState({config_visibility: "animated fadeOut",config_icon: "config"});
    }
  },
  getConfigDisplay(){
    console.log(this.state.config_visibility,'getConfigDisplay');
  },
  componentWillMount: function(){
    WeatherStore.getWeather(this.state.lat,this.state.lon,this.handleLocation);
  },
  handleLocation: function(res){

    res = res.body;
    if(res.cod == "200"){
      this.setState({
          location: res.name,
          lon: res.coord.lon,
          lat: res.coord.lat,
          weather: res.weather[0],
          main: res.main
      });
    } else {
      console.log("OOPS - Error ");
    }
  },
  render: function(){
    return (
      <div className="weather_widget_wrap">
        <div onClick={this.handleConfigDisplay} className="settings-btn">
          <WeatherIcon width="20px" height="20px" icon={this.state.config_icon}  />
        </div>
        {this.renderWeather()}
        <ConfigForm className={this.state.config_visibility} location={this.state.location} onHide={this.handleConfigDisplay} handleLocation={this.handleLocation}/>

      </div>
    )
  },
  getMyWeather(){
    WeatherStore.getCurrentLocationWeather(this.handleLocation);
  },
  getLocationWeather(e){
    e.preventDefault();
    WeatherStore.getLocationWeather(this.state.inputLocation,this.handleLocation);
  },
  renderWeather: function(){
    if(this.state.weather && Object.keys(this.state.weather).length === 0){
      return (
        <h2>
          No weather Info
        </h2>
      );
    } else {
      return (
        <div className="weather_wrap row">
          <div className="col-xs-12">
            <div className="row">
              <div className="col-xs-12 text-center">
                <h3>{this.state.location}</h3>
                <WeatherIcon icon={this.state.weather.icon} /><br />

              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 text-center">
                {this.state.weather.description}
              </div>
            </div>
            <div className="row">
              <div className="col-xs-4">
                <h5 className="text-center">{parseInt(this.state.main.temp_min)}°</h5>
              </div>
              <div className="col-xs-4">
                <h3 className="text-center">{parseInt(this.state.main.temp)}°</h3>
              </div>
              <div className="col-xs-4">
                <h5 className="text-center">{parseInt(this.state.main.temp_max)}°</h5>
              </div>
            </div>
          </div>
        </div>
      );
    }

  }
});
