import React, { Component } from 'react';

class Atodo extends React.Component{
  constructor(props){
    // Pass props to parent class
    super(props);
  }

  render(){
      return (<div><li onClick={() => {var x = this.props.id; this.props.changestyle(x); this.props.handlecompleteitem(this.props.appid, this.props.getcompleteitem());}} className={this.props.todo.complete}>
      {this.props.todo.text}</li>
      <button onClick={() => {this.props.remove(this.props.id); this.props.handletotalitem(this.props.appid, this.props.gettotalitem() - 1); this.props.handlecompleteitem(this.props.appid, this.props.getcompleteitem() - 1);}}>
      delete</button></div>);
  }
}


export default Atodo;