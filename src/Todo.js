import React, { Component } from 'react';
import Atodo from'./Atodo';
import './App.css';



const TodoForm = ({id, addTodo, handletotalitem, gettotalitem}) => {
  // Input Tracker
  let input;
  // Return JSX
  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
      <button onClick={() => {
        if(input.value !=='' ){
        addTodo(input.value);
        handletotalitem(id, gettotalitem());
        input.value = '';
        }
      }}>
        +
      </button>
    </div>
  );
};


// const TodoList = ({todos, remove, changestyle}) => {
//   // Map through the todos
//   const todoNode = todos.map((todo) => {
//     return (<Todo todo={todo} key={todo.id} remove={remove} changestyle={changestyle}/>)
//   });
//   return (<ul>{todoNode}</ul>);
// }



// Contaner Component
// Todo Id
window.id = 0;
class Todo extends React.Component{
  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: [],
      title: 'Title',
      titlediv: 'display',
      titleinput: 'nodisplay'
    }
    this.changestyle = this.changestyle.bind(this);
    this.gettotalitem = this.gettotalitem.bind(this);
    this.getcompleteitem = this.getcompleteitem.bind(this);
  }
  // Add todo handler
  addTodo(val){
    // Assemble data
    var todo = {text: val, id: window.id++, complete: 'default'}
    // Update data
    this.state.data.push(todo);
    // Update state
    this.setState({data: this.state.data});
  }
  // Handle remove
  handleRemove(id){
    // Filter all todos except the one to be removed
    const remainder = this.state.data.filter((todo) => {
      if(todo.id !== id) return todo;
    });
    // Update state with filter
    this.setState({data: remainder});
  }
  changestyle(id){
    for(var i = 0; i < this.state.data.length; i++){
      if(this.state.data[i].id === id) {
        if(this.state.data[i].complete === 'default') this.state.data[i].complete = 'complete';
        else this.state.data[i].complete = 'default';
      }
    }
    this.setState(this.state);
  }
  gettotalitem(){
    return this.state.data.length;
  }
  getcompleteitem(){
    let count = 0;
    for(var i = 0; i < this.state.data.length; i++){
      if(this.state.data[i].complete === 'complete') count += 1;
    }
    return count;
  }
  handletitlechange(e){
    this.state.title = e.target.value;
    this.setState(this.state);
  }
  handletitledisplay(){
    if(this.state.titlediv === 'display'){
      this.state.titlediv = 'nodisplay';
      this.state.titleinput = 'display';
    }
    else{
      this.state.titlediv = 'display';
      this.state.titleinput = 'nodisplay';
    }
    this.setState(this.state);
  }
  
  render(){
      const todoNode = this.state.data.map((todo,index) => {
    return (<Atodo appid={this.props.id} handlecompleteitem={this.props.handlecompleteitem} getcompleteitem={this.getcompleteitem} handletotalitem={this.props.handletotalitem} gettotalitem={this.gettotalitem} todo={todo} id={todo.id} complete={todo.complete} key={index} remove={this.handleRemove.bind(this)} changestyle={this.changestyle}/>)
  });
    // Render JSX
    return (
      <div className="todo">
        <div className={this.state.titlediv}>{this.state.title}</div>
        <input className={this.state.titleinput} onChange={(e) => {this.handletitlechange(e)}} />
        <button onClick={() => {this.handletitledisplay()}}>edit</button>
        <div>{this.gettotalitem()} todos , {this.getcompleteitem()} complete </div>
        <TodoForm id={this.props.id} gettotalitem={this.gettotalitem} handletotalitem={this.props.handletotalitem} addTodo={this.addTodo.bind(this)} />
        <ul>{todoNode}</ul>
        <button onClick={() => {this.props.deletetodolist(this.props.id); this.props.handlecompleteitem(this.props.id, this.props.getcompleteitem());}}>delete list</button>
      </div>
    );
  }
}


export default Todo;