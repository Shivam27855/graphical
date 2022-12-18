import '../App.css';
import { useState, useEffect } from "react";
import ToDoItem from './TodoItem';
function Login() {
    //const baseURL = "http://localhost:5000";
    const baseURL ="https://calm-lime-antelope-vest.cyclic.app";
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [checkLoginStatus,setCheckLoginStatus]=useState(false);
  const [todoItems,setTodoItems]=useState([]);
  const [userId,setUserId]=useState();
  const [emptyToDoList,setEmptyToDoList]=useState(false);
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



  return (checkLoginStatus==false?<form onSubmit={handleSubmit}>
    <input className='inputField' type="text" value={username} placeholder="USERNAME" onChange={handleUserNameChange}/>
    <input className='inputField' type="password" value={password} placeholder="PASSWORD" onChange={handlePasswordChange}/>
    <button className='inputField' type="submit">LOGIN</button>
  </form>:<div>{<ToDoItem emptyToDoList={emptyToDoList} item={todoItems} userId={userId} />}<button className='footer logOutButton'onClick={handleLogOut}>LOG OUT</button></div>);
}
export default Login;
