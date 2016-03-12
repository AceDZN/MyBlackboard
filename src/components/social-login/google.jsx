var React = require('react');
var UserStore = require('../../stores/user-store');


module.exports = React.createClass({
  render: function(){
    return (
      <div>
        <h1 onClick={UserStore.login}>Login with Google</h1>
      </div>
    )
  },




});
