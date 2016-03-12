var React = require('react');

var WeatherStore = require('../weather-store');

module.exports = React.createClass({

  getInitialState: function(){
    return {
      inputLocation: this.props.location,
      visibility: this.props.visibility || "hide"
    }
  },
  componentWillReceiveProps: function(){
    this.setState({
      visibility: this.props.visibility
    });
  },
  handleInputChange: function(e){
    this.setState({
      inputLocation: e.target.value
    });
  },
  render: function(){
    return (
        <form autocomplete="off" className={"location_form "+ this.props.className} onSubmit={this.getLocationWeather}>
          <h5 className="text-center">Please select a location</h5>
          <div className="row">
            <div className="col-xs-12">
              <div className="inputs">
                <svg className="location_mark" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 466.583 466.582"><g><path d="M233.292,0c-85.1,0-154.334,69.234-154.334,154.333c0,34.275,21.887,90.155,66.908,170.834   c31.846,57.063,63.168,104.643,64.484,106.64l22.942,34.775l22.941-34.774c1.317-1.998,32.641-49.577,64.483-106.64   c45.023-80.68,66.908-136.559,66.908-170.834C387.625,69.234,318.391,0,233.292,0z M233.292,233.291c-44.182,0-80-35.817-80-80   s35.818-80,80-80c44.182,0,80,35.817,80,80S277.473,233.291,233.292,233.291z" fill="#fff"/></g></svg>
                <input
                  autocomplete="off"
                  id="location_add"
                  value={this.state.inputLocation}
                  type="text"
                  className="form-control"
                  onChange={this.handleInputChange}
                  type="text"
                  placeholder="Location" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-6">
              <button type="submit" className="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 485.213 485.213"><g><path d="M471.882,407.567L360.567,296.243c-16.586,25.795-38.536,47.734-64.331,64.321l111.324,111.324    c17.772,17.768,46.587,17.768,64.321,0C489.654,454.149,489.654,425.334,471.882,407.567z" fill="#FFFFFF"/><path d="M363.909,181.955C363.909,81.473,282.44,0,181.956,0C81.474,0,0.001,81.473,0.001,181.955s81.473,181.951,181.955,181.951    C282.44,363.906,363.909,282.437,363.909,181.955z M181.956,318.416c-75.252,0-136.465-61.208-136.465-136.46    c0-75.252,61.213-136.465,136.465-136.465c75.25,0,136.468,61.213,136.468,136.465    C318.424,257.208,257.206,318.416,181.956,318.416z" fill="#FFFFFF"/><path d="M75.817,181.955h30.322c0-41.803,34.014-75.814,75.816-75.814V75.816C123.438,75.816,75.817,123.437,75.817,181.955z" fill="#FFFFFF"/></g></svg>
                Search
              </button>
            </div>
            <div className="col-xs-6">
              <span className="btn btn-primary" onClick={this.getMyWeather}>
                GPS
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25px" height="20px" viewBox="0 0 561 561"><g id="gps-fixed"><path d="M280.5,178.5c-56.1,0-102,45.9-102,102c0,56.1,45.9,102,102,102c56.1,0,102-45.9,102-102 C382.5,224.4,336.6,178.5,280.5,178.5z M507.45,255C494.7,147.9,410.55,63.75,306,53.55V0h-51v53.55 C147.9,63.75,63.75,147.9,53.55,255H0v51h53.55C66.3,413.1,150.45,497.25,255,507.45V561h51v-53.55 C413.1,494.7,497.25,410.55,507.45,306H561v-51H507.45z M280.5,459C181.05,459,102,379.95,102,280.5S181.05,102,280.5,102 S459,181.05,459,280.5S379.95,459,280.5,459z" fill="#FFFFFF"/></g></svg>
              </span>
            </div>
          </div>
        </form>
    )
  },
  toggleVisibility: function(){
    if(this.state.visibility == "hide"){
      this.setState({visibility: "show"});
    } else {
      this.setState({visibility: "hide"});
      this.props.onHide();
    }
  },
  getMyWeather(){
    WeatherStore.getCurrentLocationWeather(this.handleLocation);

  },
  getLocationWeather(e){
    e.preventDefault();
    WeatherStore.getLocationWeather(this.state.inputLocation,this.handleLocation);
  },
  handleLocation: function(res){
      this.setState({
        inputLocation: res.body.name,
      });
      this.toggleVisibility();
    this.props.handleLocation(res);
  }


});
