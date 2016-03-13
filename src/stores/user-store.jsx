var Reflux = require('reflux');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var ref = new Firebase("https://acedzndashboard.firebaseio.com");

module.exports = Reflux.createStore({
  authDataCallback: function(authData) {
    if (authData) {
      this.user = authData;
      console.log("User " + authData.uid + " is logged in with " + authData.provider);
    } else {
      console.log("User is logged out");
    }
  },
  googleLogin: function(e){
    console.log(e);
    ref.authWithOAuthPopup("google", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated success:", authData);
        this.user = {
          id: authData.google.id,
          displayName: authData.google.displayName,
          gender: authData.google.cachedUserProfile.gender,
          last_name: authData.google.cachedUserProfile.given_name,
          link: authData.google.cachedUserProfile.link,
          locale: authData.google.cachedUserProfile.locale,
          first_name: authData.google.cachedUserProfile.name,
          picture: authData.google.cachedUserProfile.picture,
        }
        console.log(this,"this");
        this.sendUsertoServer();

      }
    }.bind(this));
  },
  sendUsertoServer: function(){
    console.log(this.user,"this.user");

  },
  getUser: function(){
    if(this.user){
      console.log("USER ALREADY CONNECTED",this.user);
    } else {
      ref.onAuth(this.authDataCallback)
      console.log(this.user,"this.USER");
    }
    return this.user
  },
  logout: function(){
    ref.unauth();
  }
});
