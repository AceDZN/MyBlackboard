var React = require('react');
var UserStore = require('../../../stores/user-store');


module.exports = React.createClass({
  render: function(){
    return (
      <h1 onClick={this.handleLogin}>
      Login with Google
      </h1>
    );
  },
  handleLogin: function(){
    UserStore.googleLogin();
    this.handleSuccess();

  },
  handleSuccess: function(){
    if (this.props.onLogin && this.props.onLogin !='' ){
      this.props.onLogin();
      console.log("this.ONLOGIN");
    } else {
      console.log("no callback");
    }
  }
});
