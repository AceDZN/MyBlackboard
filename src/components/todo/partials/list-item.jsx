var React = require('react');
var Firebase = require('firebase');
var rootUrl = "https://blinding-torch-6580.firebaseio.com/";
var ToDoIcon = require('./icon');


module.exports = React.createClass({
  getInitialState: function(){
    return {
      text: this.props.item.text,
      done: this.props.item.done,
      textChanged: false
    }
  },
  componentWillMount: function(){
    this.fb = new Firebase(rootUrl + 'items/' + this.props.item.key);
  },
  render: function(){
    return <div className="input-group">
      <span className="input-group-addon">
        <input
          type="checkbox"
          checked={this.state.done}
          onChange={this.handleDoneChange}
          />
      </span>
      <input
        type="text"
        disabled={this.state.done}
        className="form-control"
        onChange={this.handleTextChange}
        value={this.state.text}
        />

      <span className="input-group-btn">
        {this.changesButtons()}
        <button
          onClick={this.handleDeleteClick}
          className="btn-default icon-btn">
          <ToDoIcon icon="delete" width="25px" height="25px" />
        </button>
      </span>
    </div>
  },

  handleDoneChange: function(){
    var update = {done: event.target.checked};
    this.setState(update);
    this.fb.update(update);
  },
  handleDeleteClick: function(){
    this.fb.remove();
  },
  handleTextChange: function(){
    this.setState({
      text: event.target.value,
      textChanged: true
    });
  },
  handleUndoClick: function(){
    this.setState({
      text: this.props.item.text,
      textChanged: false
    });
  },
  handleSaveClick: function(){
    this.fb.update({text: this.state.text});
    this.setState({
      textChanged: false
    });
  },
  changesButtons: function(){
    if(!this.state.textChanged){
      return null
    } else {
      return [
          <button
            className="btn-default icon-btn"
            onClick={this.handleSaveClick}
            >
            <ToDoIcon icon="save" width="25px" height="25px" />
          </button>,
          <button
            className="btn-default icon-btn"
            onClick={this.handleUndoClick}
            >
            <ToDoIcon icon="undo" width="25px" height="25px" />
          </button>
        ]
    }
  }
});
