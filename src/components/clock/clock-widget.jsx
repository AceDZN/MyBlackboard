var React = require('react');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      offset:this.props.offset || '0',
      hours: '',
      minutes:'',
      seconds:''
    }

  },
  componentWillMount: function(){
      this.startTime();
    },
    componentDidMount: function(){
       window.setInterval(function () {
        this.startTime();
      }.bind(this), 1000);
    },

  render: function(){
    return(
    <div className="clock_wrapper">
      {this.state.hours}:{this.state.minutes}:{this.state.seconds}
    </div>
    )
  },

  startTime: function() {
    var currentdate = new Date();
    var hours = currentdate.getUTCHours()
    if (this.state.offset){
      hours += parseInt(this.state.offset);
    }

      // correct for number over 24, and negatives
      if( hours >= 24 ){ hours -= 24; }
      if( hours < 0   ){ hours += 12; }
      // add leading zero, first convert hours to string
      hours = hours + "";
      if( hours.length == 1 ){ hours = "0" + hours; }

      // minutes are the same on every time zone
      var minutes = currentdate.getUTCMinutes();

      // add leading zero, first convert hours to string
      minutes = minutes + "";
      if( minutes.length == 1 ){ minutes = "0" + minutes; }

      seconds = currentdate.getUTCSeconds();

      this.setState({
        hours: hours,
        minutes: minutes,
        seconds: seconds
      });
  },

});
