import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListItems from './ListItems'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

library.add(faTrash)
library.add(faToggleOn)
library.add(faToggleOff)

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items:[],
      currentItem:{
        text:'',
        key:'',
        completed: false
      }
    }
    this.addItem = this.addItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
    this.completeItem = this.completeItem.bind(this);
  }

  callAPI() {
    
    fetch("http://localhost:9000/testAPI")
        .then(res => res.text())
        .then(res => {
          let items = JSON.parse(res);
          console.log(items); 
          this.setState({
            items: items
          })

        })
        
        console.log(this.state.items);
}

componentWillMount() {
  this.callAPI();
}
  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentItem;
    if(newItem.text !==""){
      const items = [...this.state.items, newItem];
    this.setState({
      items: items,
      currentItem:{
        text:'',
        key:''
      }
    })

   
    axios
      .post('http://localhost:9000/testAPI/create', newItem)
      .then(() => console.log('To Do added'))
      .catch(err => {
        console.error(err);
      });
    }
  }
  handleInput(e){
    this.setState({
      currentItem:{
        text: e.target.value,
        key: Date.now()
      }
    })
  }

  completeItem(key){
    console.log("items:"+this.state.items);
    const items = this.state.items;
    items.map(item=>{      
      if(item.key===key){
        console.log(item.key +"    "+key)
        item.completed = true;
        axios
        .post('http://localhost:9000/testAPI/completed', item)
        .then(() => console.log('To Do completed'))
        .catch(err => {
        console.error(err);
      });
      }
    })
    this.setState({
      items: items
    })
  }
  deleteItem(key){
    const filteredItems= this.state.items.filter(item =>
      item.key!==key);
    this.setState({
      items: filteredItems
    })
    
    let deleteItem = {
      "key" : key
    }
    axios
      .post('http://localhost:9000/testAPI/delete', deleteItem)
      .then(() => console.log('To Do added'))
      .catch(err => {
        console.error(err);
      });
    
  }
  setUpdate(text,key){
    console.log("items:"+this.state.items);
    const items = this.state.items;
    items.map(item=>{      
      if(item.key===key){
        console.log(item.key +"    "+key)
        item.text= text;
        axios
        .post('http://localhost:9000/testAPI/update', item)
        .then(() => console.log('To Do updated'))
        .catch(err => {
        console.error(err);
      });
      }
    })
    this.setState({
      items: items
    })
    
    
   
  }
 render(){
  return (
    <div className="App">
      <header>
        <form id="to-do-form" onSubmit={this.addItem}>
          <input type="text" placeholder="Enter task" value= {this.state.currentItem.text} onChange={this.handleInput}></input>
          <button type="submit">Add</button>
        </form>
        <p>{this.state.items.text}</p>
        
          <ListItems items={this.state.items} completeItem={this.completeItem} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/>
        
      </header>
    </div>
  );
 }
}


export default App;