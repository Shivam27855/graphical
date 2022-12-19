import '../App.css';
import { useState, useEffect } from "react";
import ToDoItem from './TodoItem';
function Login() {
    //const baseURL = "http://localhost:5000";
    const baseURL ="https://lime-alert-deer.cyclic.app/";
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [checkLoginStatus,setCheckLoginStatus]=useState(false);
  const [todoItems,setTodoItems]=useState([]);
  const [userId,setUserId]=useState();
  const [emptyToDoList,setEmptyToDoList]=useState(false);

  const [createAccountUi,setCreateAccountUi]=useState(false);
  const [create_username,setCreate_username]=useState("");
  const [create_password,setCreate_password]=useState("");
  const [createError,setCreateError]=useState("");

  let handleLogOut =(e)=>{
    e.preventDefault();
    setCheckLoginStatus(false);
  }
  let handleSubmit = (e) => {
    e.preventDefault();
    try {
      fetch(`${baseURL}/getUser`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password:password
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.length != 0) {
            console.log(json);
            setCheckLoginStatus(true);

            if(json.error=="No Todo Item")
            {
                setEmptyToDoList(true);
            }
            else{
                setTodoItems(json);
                setEmptyToDoList(false);
            }
            
            fetch(`${baseURL}/getUserId`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  username: username,
                  password:password
                }),
              })
                .then((res) => res.json())
                .then((json) => {
                  if (json.length != 0) {
                    //alert(json)
                    setUserId(json);
            
                  }
                })
          }
        })
    } catch (err) {
      alert("Login Fail")
      console.log(err);
    }
  };

  let handleUserNameChange=(e)=>{
    setUsername(e.target.value);
  }

  let handlePasswordChange=(e)=>{
    setPassword(e.target.value);
  }

  let handleCreateUserNameChange=(e)=>{
    setCreateError("");
    setCreate_username(e.target.value);
  }

  let handleCreatePasswordChange=(e)=>{
    setCreate_password(e.target.value);
  }

  let createAccount=(e)=>{
    setCreateAccountUi(true)
  }

  let goBackToLogin=(e)=>{
    setCreateAccountUi(false)
  }

  let handleAddUser = (e) => {
    e.preventDefault();
    try {
      fetch(`${baseURL}/addUser`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: create_username,
          password:create_password
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          if (json.length != 0) {
            

            if(json.error=="Username Already Exists")
            {
                //setEmptyToDoList(true);
                setCreateError("Username Already Exists");
                
            }
            else{
              setCreateError("");
              setCreateAccountUi(false);
            }
          
          }
        })
    } catch (err) {
      alert("Login Fail")
      console.log(err);
    }
  };


  return (checkLoginStatus==false && createAccountUi==false?
  <div><form onSubmit={handleSubmit}>
    <input className='inputField' type="text" value={username} placeholder="USERNAME" onChange={handleUserNameChange}/>
    <input className='inputField' type="password" value={password} placeholder="PASSWORD" onChange={handlePasswordChange}/>
    <button className='inputField' type="submit">LOGIN</button>
  </form><button className='inputField saveButton' onClick={createAccount}>CREATE ACCOUNT</button></div>:
  checkLoginStatus==false && createAccountUi==true?
  <div><form onSubmit={handleAddUser}>
    <input className='inputField' type="text" value={create_username} placeholder="CREATE USERNAME" onChange={handleCreateUserNameChange}/>
    <input className='inputField' type="password" value={create_password} placeholder="CREATE PASSWORD" onChange={handleCreatePasswordChange}/>
    <button className='inputField' type="submit">CREATE ACCOUNT</button>
  </form><button className='inputField cancelButton' onClick={goBackToLogin}>BACK</button><h4 className='logOutButton'>{createError}</h4></div>:
  <div>{<ToDoItem emptyToDoList={emptyToDoList} item={todoItems} userId={userId} />}<button className='footer logOutButton'onClick={handleLogOut}>LOG OUT</button></div>);
}
export default Login;
