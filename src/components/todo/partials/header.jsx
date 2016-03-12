var React = require('react');
module.exports = React.createClass({
  render: function(){
    return <div>
      <div className="input-group">
        <input
          value={this.state.text}
          type="text"
          className="form-control"
          onChange={this.handleInputChange}
          />
        <span className="input-group-btn">
          <button className="btn btn-default" type="button" onClick={this.handleClick}>
            Add
          </button>
        </span>
      </div>
    </div>

  },
  handleClick: function(){
    //Send value of text input & send it to Firebase
    this.props.itemsStore.push({
      text:this.state.text,
      done:false
    });
    this.setState({text: ""});
  },
  handleInputChange: function(event){
    this.setState({text: event.target.value});
  },
  getInitialState: function(){
    return{
      text: ''
    }
  }
});
