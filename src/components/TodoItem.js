import logo from '../logo.svg';
import '../App.css';
import { useState, useEffect } from "react";
import Login from './Login';


function ToDoItem(props) {


  //Added edit feature in editFeature branch
  //Added Delete feature in editFeature branch
  const [todoItems,setTodoItems]=useState(props.item);
  const [emptyToDoList,setEmptyToDoList]=useState(props.emptyToDoList);
  const [newItem,setNewItem]=useState();
  let handleEdit=(todoId)=>
  {
  //const baseURL = "http://localhost:5000";
  const baseURL ="https://calm-lime-antelope-vest.cyclic.app";
  try {
    fetch(`${baseURL}/editTodoItem/${todoId}`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todoItem: "username"
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.length != 0) {
          console.log(json);

          // setCheckLoginStatus(true);
          // setTodoItems(json);
          // setProfileUserName(json[0].userName);

          // fetch(
          //   `${baseURL}/getAccount/${profileUserId}`)
          //   .then((res) => res.json())
          //   .then((json) => {
          //     setAccount(json);
          //   })
        }
      })
  } catch (err) {
    alert("Login Fail")
    console.log(err);
  }
}

useEffect(() => {}, [emptyToDoList]); // <- add the count variable here



let handleDelete=(todoId)=>
{
//const baseURL = "http://localhost:5000";
const baseURL ="https://calm-lime-antelope-vest.cyclic.app";
//alert(props.userId);

try {
  fetch(`${baseURL}/deleteTodoItem/${todoId}`, {
    method: "GET",
    headers: { 'Content-Type': 'application/json' }
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);

      //alert(currentUserId);

      try {
        fetch(`${baseURL}/getToDoItems`, {
          method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId:parseInt(props.userId)
        }),
        })
          .then((res) => res.json())
          .then((json) => {

            if(json.error=="No Todo Item")
            {
              console.log(json);
                setEmptyToDoList(true);
                console.log(emptyToDoList);
                //alert(emptyToDoList);
                
            }
            else{
                setTodoItems(json);
                console.log(emptyToDoList);
                //setEmptyToDoList(false);
            }

            //setTodoItems(json);
            console.log(todoItems)
          })
      } catch (err) {
        alert("Delete Fail")
        console.log(err);
      }






    })
} catch (err) {
  alert("Delete Fail")
  console.log(err);
}
}


let handleAddText=(e)=>{
  setNewItem(e.target.value);
}

let handleAdd=()=>
{
//const baseURL = "http://localhost:5000";
const baseURL ="https://calm-lime-antelope-vest.cyclic.app";
//alert(props.userId);

try {
  fetch(`${baseURL}/addTodoItem`, {
    method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          todoItem: newItem
        }),
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);

      //alert(currentUserId);

      try {
        fetch(`${baseURL}/getToDoItems`, {
          method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId:parseInt(props.userId)
        }),
        })
          .then((res) => res.json())
          .then((json) => {

            if(json.error=="No Todo Item")
            {
              console.log(json);
                setEmptyToDoList(true);
                console.log(emptyToDoList);
                //alert(emptyToDoList);
                
            }
            else{
                setTodoItems(json);
                console.log(emptyToDoList);
                setEmptyToDoList(false);
            }

            //setTodoItems(json);
            console.log(todoItems)
          })
      } catch (err) {
        alert("Delete Fail")
        console.log(err);
      }






    })
} catch (err) {
  alert("Delete Fail")
  console.log(err);
}
}

useEffect(() => {
  console.log(todoItems)
}, [todoItems])



  return (
    <div>
      <h1>adfas {props.userId}</h1>
      <input type="text" value={newItem} placeholder="Enter Item" onChange={handleAddText}/><button onClick={handleAdd}>Create Item</button>
     <h1>List is {todoItems}</h1>
      {emptyToDoList==false?<ul>
    {todoItems.map(
      (todoItem) => <li key={todoItem.todoId}>
                          {todoItem.todoItem}
                          <button onClick={()=>handleEdit(todoItem.todoId)}>Edit</button>
                          <button onClick={()=>handleDelete(todoItem.todoId)}>Delete</button>
                    </li>
                  )};
  </ul>:<h1>No Todo Item to show</h1>}

    </div>
    
  );
  
  
  
}
export default ToDoItem;
