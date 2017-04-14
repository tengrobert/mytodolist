import React, { Component } from 'react';
import Todo from './Todo';

let windowid = 0;
class TodoApp extends React.Component{
  constructor(props){
    // Pass props to parent class
    super(props);
    this.state = { todoapp: [] }
  }
  addtodolist(){
      this.state.todoapp.push({id: windowid++, totalitem: 0, completeitem:0 });
      this.setState(this.state);
  }
 deletetodolist(id){
    // Filter all todos except the one to be removed
    const remainder = this.state.todoapp.filter((todo) => {if(todo.id !== id) return todo; });
     this.setState({todoapp: remainder});
 }
 handletotalitem(id, num){
     for(var i = 0; i < this.state.todoapp.length; i++){
         if(this.state.todoapp[i].id === id) this.state.todoapp[i].totalitem = num;
     }
     this.setState(this.state);
 }
 showtotalitem(){
     let sum = 0;
     for(var i = 0; i < this.state.todoapp.length; i++){
         sum += this.state.todoapp[i].totalitem;
     }
     return sum;
 }
  handlecompleteitem(id, num){
     for(var i = 0; i < this.state.todoapp.length; i++){
         if(this.state.todoapp[i].id === id) this.state.todoapp[i].completeitem = num;
     }
     this.setState(this.state);
 }
  showcompleteitem(){
     let sum = 0;
     for(var i = 0; i < this.state.todoapp.length; i++){
         sum += this.state.todoapp[i].completeitem;
     }
     if(sum < 0) sum = 0;
     return sum;
 }
  render(){
  const App = this.state.todoapp.map((item,index) => {return (<Todo
      key={item.id} id={item.id} totalitem={item.completeitem} deletetodolist={this.deletetodolist.bind(this)} handletotalitem={this.handletotalitem.bind(this)} handlecompleteitem={this.handlecompleteitem.bind(this)}/>);});   
      return (
      <div>
          <h1>Todos</h1>
          <h1>{this.showtotalitem()} item(s) , {this.showcompleteitem()} complete</h1>
          <button onClick={() => {this.addtodolist()}}>Add todolist</button>
          <div>{App}</div>
      </div>);
  }
}


export default TodoApp;