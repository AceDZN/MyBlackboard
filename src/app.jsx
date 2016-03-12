var React = require('react');
var ReactDOM = require('react-dom');
var WeatherWidget = require('./components/weather/weather-widget');
var ClockWidget = require('./components/clock/clock-widget');
var ToDoWidget = require('./components/todo/todo-widget');
var GoogleLogin = require('./components/social-login/google');
var AceLogo = require('./components/ace-logo');

var App = React.createClass({
  getInitialState: function(){
    return {
      rel: ''
    }
  },
  render: function(){
    return (
      <div>
        <div className="blackboard_wrap">
          <div className="blackboard_bg">
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-3">
                <ClockWidget offset="2" />
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6">
                <h1 className="page-title">
                  My Blackboard
                </h1>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-3">
                <WeatherWidget />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-6">
                <GoogleLogin />
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6">
                <ToDoWidget />
              </div>
            </div>
          </div>
          <AceLogo />
        </div>
      </div>
    )
  }
});

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.main_wrap'));
