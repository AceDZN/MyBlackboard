var React = require('react');
var ReactDOM = require('react-dom');

var AceLogo = require('./components/ace-logo');

var App = React.createClass({
  getInitialState: function(){
    return {

    }
  },
  render: function() {
    return (
      <div>
        <div className="blackboard_wrap">
          <div className="blackboard_bg">
            BLACKBOARD CONTENT WILL BE HERE
          </div>
        </div>
        <AceLogo />
      </div>

    );
  }
});

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.main_wrap'));
