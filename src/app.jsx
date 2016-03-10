var React = require('react');
var ReactDOM = require('react-dom');


var App = React.createClass({
  getInitialState: function(){
    return {

    }
  },
  render: function() {
    return (
      <div>
        <div className="blackboard_wrap">
          BLACKBOARD CONTENT WILL BE HERE
        </div>

      </div>

    );
  }
});

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.main_wrap'));
