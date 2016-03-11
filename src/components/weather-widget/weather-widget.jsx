var React = require('react');
var superagent = require('superagent');
var jsonp = require('superagent-jsonp');

module.exports = React.createClass({
  config: {
    "api_key": "806a11197dbdfbd7f81f86ffb1fbb565"
  },
  getInitialState: function(){
    return {
      lon: this.props.lon || "-0.13",
      lat: this.props.lat || "51.51",
      location: "Montreuil-sous-Pérouse, France"
    }
  },
  render: function(){
    return (
      <div className="weather_widget_wrap">
        {this.getWeather()}
      </div>
    )
  },
  getWeather: function(){
    var uri = 'http://api.openweathermap.org/data/2.5/weather?appid=' + this.config.api_key + '&lat='+this.state.lat+'&lon='+this.state.lon;
    superagent.get(uri).use(jsonp).end(function(err, res){
      var weather = res.body;
      this.setWeather(weather);
    }.bind(this));
  },
  setWeather: function(weather){
    console.log(weather,"res");
    return (
      <div>
        {weather.name}
      </div>
    );
  },
  renderWeather: function(){
    return (
      <div>
        {weather.name}
      </div>
    );
  }
});
