var Reflux = require('reflux');
var superagent = require('superagent');
var jsonp = require('superagent-jsonp');

module.exports = Reflux.createStore({
  config: {
    "lon": "-0.13",
    "lat": "51.51",
    "api_key": "806a11197dbdfbd7f81f86ffb1fbb565"
  },
  getWeather: function(lat,lon,callback){
    var uri = 'http://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + this.config.api_key + '&lat='+lat+'&lon='+lon;
    superagent.get(uri).use(jsonp).end(function(err, res){
      this.weather = res.body;
      callback(res);
      console.log(res);
    }.bind(this));
  },
  getLocationWeather: function(q,callback){
    var uri = 'http://api.openweathermap.org/data/2.5/weather?format=json&units=metric&appid=' + this.config.api_key + '&q='+q;
    superagent.get(uri).use(jsonp).end(function(err, res){
      this.weather = res.body;
      callback(res);
    }.bind(this));
  },
  getCurrentLocationWeather: function(callback){
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(function(position){
        this.position = position.coords;
        this.getWeather(this.position.latitude,this.position.longitude,callback);
      }.bind(this),function(err) {
        this.getWeather(this.config.lat,this.config.lon,callback);
      }.bind(this));
    } else {
      this.getWeather(this.config.lat,this.config.lon,callback);
    }
  }
});
