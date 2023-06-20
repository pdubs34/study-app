import Axios from "axios";
import React, { useState, useEffect, Redirect, Route} from 'react';
import Flashcard from "./Flashcard";
import openEye from '../show.png';
import closedEye from '../hide.png';
import "../styles/loginPage.css";
import { useNavigate } from "react-router-dom";


export default function CreateAndEdit(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [successfulLogin,setSuccessfulLogin] = useState(0);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  
  const updateUsername = event => {
    setUsername(event.target.value);
  };

  const updatePassword = event => {
    setPassword(event.target.value);
  };

  const updateUserId = (value) => {
    setUserId(value);
  }

  useEffect(() => {
    setUserId(localStorage.getItem('userID'));
    setSuccessfulLogin(localStorage.getItem('loginState'));
    setIsLoading(false);
  }, []);

  const validateLogin = (givenUsername,givenPassword) => {
    Axios.get(`http://localhost:3001/validateLogin/${givenUsername}/${givenPassword}`,
    ).then((response) => {
      let pulledData = response.data[0];
      let userNameData = pulledData["username"];
      let id = pulledData['userId'];
      console.log(id);
      if(pulledData != null){
        localStorage.setItem('userID', userNameData);
        localStorage.setItem('loginState', 1);
        localStorage.setItem('id', id);
        setUserId(localStorage.getItem('userID'));
        setSuccessfulLogin(localStorage.getItem('loginState'));
      }
    });
  };

  function handleValidateClick(typedUser,typedPass){
    validateLogin(typedUser,typedPass);
  }
  
  function handleSignout(){
    setSuccessfulLogin(0);
    localStorage.removeItem('loginState');
  }

  function seePassword(){
    var element = document.getElementById("passwordBox1");
    var showHide = document.getElementById("showHide");
    if(element.type === "password"){
      element.type = "text";
      showHide.src = closedEye;
    }
    else{
      element.type = "password";
      showHide.src = openEye;
    }
  }
  const RenderController = () => {
    return(
     <>
     <h1 className="correctLogin">Successful Login, Welcome "{username}"</h1>
     <button onClick={() => handleSignout()} className="logoutButton"> Logout button </button>
     </>
    )
  };

  return (
    <>
    <div className= 'bodyWrapper'>
      {isLoading ? ( 
        <div>Loading...</div>
      ) : successfulLogin === "1" ? ( 
        <RenderController />
      ) : (
        <div className="loginContainer">
          <input onChange={updateUsername} placeholder="Enter Username" className='loginUsernameBox'></input>
          <input onChange={updatePassword} id= "passwordBox1" type="password" placeholder="Enter Password" className='loginPasswordBox'></input>
          <img className= "viewPasswordButton" id="showHide" alt="showOrHideButton" src = {openEye} onClick={() => seePassword()}></img>
          <button onClick={() => handleValidateClick(username, password)} className="validateLoginButton">Log In</button>
        </div>
      )}
    </div>
    </>
  );
}