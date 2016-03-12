var Reflux = require('reflux');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var ref = new Firebase("https://acedzndashboard.firebaseio.com");

module.exports = Reflux.createStore({
  login: function(){
    ref.authWithOAuthPopup("google", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated success:", authData);
        this.user = {
          id: authData.google.id,
          displayName: authData.google.displayName,
          gender: authData.google.cachedUserProfile.gender,
          given_name: authData.google.cachedUserProfile.given_name,
          link: authData.google.cachedUserProfile.link,
          locale: authData.google.cachedUserProfile.locale,
          name: authData.google.cachedUserProfile.name,
          picture: authData.google.cachedUserProfile.picture,
        }
        this.sendUsertoServer();

      }
    });
  },
  sendUsertoServer: function(){
    console.log(this.user,"this.user");
  }

});
