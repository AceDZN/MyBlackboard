var React = require('react');
var UserStore = require('../../stores/user-store');
var GoogleLogin = require('./partials/google-login');

module.exports = React.createClass({
  mixins: [
    "UserStore"
  ],
  getInitialState: function(){
    return({
      user: UserStore.getUser()
    })
  },
  render: function(){
    var user = UserStore.getUser();
    return (
      <div className="profile_wrapper">
        {this.renderProfile()}
      </div>
    )
  },
  renderProfile: function(){
    if(this.state.user && this.state.user != ''){
      console.log(this.state.user, "this.state.user");
      return this.renderUser();
    } else {
      console.log("NO User");
      return this.LoginButtons();
    }
  },
  renderUser: function(){
    return (
      <div className="row user_wrapper">
        <div className="col-xs-2">
          <img className="profile_pic" src={this.state.user.picture} />
        </div>
        <div className="col-xs-10">
          <h1>
          {this.state.user.displayName}
          </h1>
        </div>
        <div className="col-xs-10">
          <h1 onClick={UserStore.logout}>
          logout
          </h1>
        </div>

      </div>
    );
  },
  LoginButtons: function(){
    return (
      <div>
        <GoogleLogin onLogin={this.handleLogin} />
      </div>
    );
  },
  handleLogin: function(u){
    this.setState({
      user:u
    });
  }




});
