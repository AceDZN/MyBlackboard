var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Header = require('./partials/header');
var List = require('./partials/list');
var rootUrl = "https://blinding-torch-6580.firebaseio.com/";


module.exports = React.createClass({
  mixins: [ReactFire],
  getInitialState: function(){
    return {
      items: {}
    }
  },
  componentWillMount: function(){
    // componentWillMount is a function that will run only once - when the app loaded for first time
    this.fb = new Firebase(rootUrl + 'items/');
    this.bindAsObject(this.fb, 'items');
    // this.bindAsObject is a function that we got from ReactFire - that's why we need the mixins: [ReactFire] var
    this.fb.on('value',this.handleDataLoaded);
  },
  handleDataLoaded: function(){
    this.setState({loaded:true});
  },
  onDeleteDoneClick: function(){
    for(var key in this.state.items){
      if(this.state.items[key].done === true){
        this.fb.child(key).remove();
      }
    }
  },
  render: function() {
    return (
      <div className="todo_wrapper">
        <h5 className="text-left">
          things To Do
        </h5>
        <Header itemsStore={this.firebaseRefs.items} />
        <hr />
        <div className={"content " + (this.state.loaded ? 'loaded' : '')}>
          <List  items={this.state.items} />
          {this.deleteButton()}
        </div>
      </div>
    );
  },
  deleteButton: function(){
    if(!this.state.loaded){
      return
    } else {
      return <div className="text-center clear-complete">
        <hr />
        <button
          type="button"
          onClick={this.onDeleteDoneClick}
          className="btn btn-default">
          Clear Completed
        </button>
        <br /><br />
      </div>
    }
  }
});
