import logo from '../logo.svg';
import '../App.css';
import { useState, useEffect } from "react";
import Login from './Login';


function ToDoItem(props) {


  //Added edit feature in editFeature branch
  //Added Delete feature in editFeature branch
  const [todoItems,setTodoItems]=useState([]);
  const [emptyToDoList,setEmptyToDoList]=useState(props.emptyToDoList);
  const [newItem,setNewItem]=useState();
  const [userId,setUserId]=useState(props.userId);
  const [disableItem,setDisableItem]=useState(true);

  const [showEditButton,setShowEditButton]=useState(true);
  const [showSaveChangesButton,setShowSaveChangesButton]=useState(false);
  const [showCancelButton,setShowCancelButton]=useState(false);
  

  let handleCancel =(todoId)=>{
          document.getElementById(todoId).setAttribute("disabled","true");
          document.getElementById('editButton_'+todoId).style.visibility='visible';
    document.getElementById('saveButton_'+todoId).style.visibility='hidden';
    document.getElementById('cancelButton_'+todoId).style.visibility='hidden';
          
  }

  let handleSave =(todoId)=>{

    const baseURL ="https://calm-lime-antelope-vest.cyclic.app";
  try {
    fetch(`${baseURL}/editTodoItem/${todoId}`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todoItem: document.getElementById(todoId).value
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.length != 0) {
          console.log(json);

          //document.getElementById(todoId).removeAttribute("disabled");
          document.getElementById(todoId).setAttribute("disabled","true");
          document.getElementById('editButton_'+todoId).style.visibility='visible';
    document.getElementById('saveButton_'+todoId).style.visibility='hidden';
    document.getElementById('cancelButton_'+todoId).style.visibility='hidden';
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
  let handleEdit=(todoId)=>
  {
    //setDisableItem(false);
    document.getElementById('editButton_'+todoId).style.visibility='hidden';
    document.getElementById('saveButton_'+todoId).style.visibility='visible';
    document.getElementById('cancelButton_'+todoId).style.visibility='visible';

    document.getElementById(todoId).removeAttribute("disabled");

    //document.getElementById(todoId).setAttribute("disabled","true");
  //const baseURL = "http://localhost:5000";
  // const baseURL ="https://calm-lime-antelope-vest.cyclic.app";
  // try {
  //   fetch(`${baseURL}/editTodoItem/${todoId}`, {
  //     method: "POST",
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       todoItem: "username"
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((json) => {
  //       if (json.length != 0) {
  //         console.log(json);

  //         // setCheckLoginStatus(true);
  //         // setTodoItems(json);
  //         // setProfileUserName(json[0].userName);

  //         // fetch(
  //         //   `${baseURL}/getAccount/${profileUserId}`)
  //         //   .then((res) => res.json())
  //         //   .then((json) => {
  //         //     setAccount(json);
  //         //   })
  //       }
  //     })
  // } catch (err) {
  //   alert("Login Fail")
  //   console.log(err);
  // }
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


// let handleNewTodo=(e)=>{
//   set
// }

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
  setUserId(props.userId);
  //alert(userId);
  
});

useEffect(()=>{
  if(userId!=null)
  {
    const baseURL ="https://calm-lime-antelope-vest.cyclic.app";
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
  }
  
},[userId])


let handleNewToDoItemChange=(id,value,index)=>{
  const newTodo = [...todoItems];
  newTodo[index].todoId=id;
  newTodo[index].todoItem=value
  newTodo[index].userId=userId
  setTodoItems(newTodo);
}


  return (
    <div>
      <div className="inputField">
      <input  type="text" value={newItem} placeholder="Enter Item" onChange={handleAddText}/>
      <button onClick={handleAdd}>+</button>


    </div>
      
      {emptyToDoList==false && todoItems.length!=0?<ul className="todoList">
    {todoItems.map(
      (todoItem,index) => <li className="todoField" key={todoItem.todoId}>
                          
                          <input id={todoItem.todoId} disabled={disableItem}  type="text" value={todoItem.todoItem} placeholder="Enter New Item" onChange={(e) => {
    handleNewToDoItemChange(todoItem.todoId,e.target.value,index)
  }} />

                          <button className='editButton' style={{visibility: "visible"}} id={"editButton_"+todoItem.todoId} onClick={()=>handleEdit(todoItem.todoId)}>E</button>
                          <button className='saveButton' style={{visibility: "hidden"}} id={"saveButton_"+todoItem.todoId} onClick={()=>handleSave(todoItem.todoId)} >S</button>
                          <button className='cancelButton' style={{visibility: "hidden"}} id={"cancelButton_"+todoItem.todoId} onClick={()=>handleCancel(todoItem.todoId)}>C</button>
                          <button className='deleteButton' style={{visibility: "visible"}} id={"deleteButton_"+todoItem.todoId} onClick={()=>handleDelete(todoItem.todoId)}>D</button>
                    </li>
                  )}
  </ul>:<h1>No Todo Item to show</h1>}

    </div>
    
  );
  
  
  
}
export default ToDoItem;
