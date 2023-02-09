import Axios from "axios";
import React, { useState, useEffect, Redirect, Route} from 'react';
import Flashcard from "./Flashcard";
import "../styles/loginPage.css"


export default function CreateAndEdit(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("Hello");
  const [successfulLogin,setSuccessfulLogin] = useState(0);

  const updateUsername = event => {
    setUsername(event.target.value);
  };
  const updatePassword = event => {
    setPassword(event.target.value);
  };
  const updateUserId = (value) => {
    setUserId(value);
  }
  const validateLogin = (givenUsername,givenPassword) => {
    Axios.get(`http://localhost:3001/validateLogin/${givenUsername}/${givenPassword}`,
    ).then((response) => {
      const pulledData = response.data[0].userId;
      if(pulledData != null){
        window.location = `/${pulledData}`;
      }
    });
  };
  function handleValidateClick(typedUser,typedPass){
    validateLogin(typedUser,typedPass);

  }

  return (
    <>
    <input onChange={updateUsername} placeholder = "Enter Username" className='loginUsernameBox'></input>
    <input onChange={updatePassword} placeholder = "Enter Password" className='loginPasswordBox'></input>
    <button onClick ={() => handleValidateClick(username,password)} className = "validateLoginButton">Validate Button</button>
    <h1 className="checker" placeholder="Nothing yet">{userId}</h1>
    </>
  );
}