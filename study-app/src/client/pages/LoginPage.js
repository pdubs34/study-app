import axios from "axios";
import React, { useState, useEffect, useRef } from 'react';
import Flashcard from "./Flashcard";
import openEye from '../show.png';
import closedEye from '../hide.png';
import "../styles/loginPage.css";
import { useNavigate } from "react-router-dom";

export default function CreateAndEdit() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [loginState, setLoginState] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [creatingEmail, setCreatingEmail] = useState("");
  const [creatingPassword, setCreatingPassword] = useState("");
  const [creatingUsername, setCreatingUsername] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const updateUsername = event => {
    setUsername(event.target.value);
  };

  const updatePassword = event => {
    setPassword(event.target.value);
  };

  const updateUserId = value => {
    setUserId(value);
  };

  const updateCreatingEmail = value => {
    setCreatingEmail(value);
  }

  const updateCreatingPassword = value => {
    setCreatingPassword(value);
  }
  const updateCreatingUsername = value => {
    setCreatingUsername(value);
  }

  useEffect(() => {
    setUserId(localStorage.getItem('id'));
    setLoginState(localStorage.getItem('loginState'));
    setIsLoggedIn(localStorage.getItem('loginState') === "1");
    setIsCreatingUser(localStorage.getItem('loginState') === "2");
    setIsLoading(false);
    setUsername(localStorage.getItem('username'));
  }, []);

  const validateLogin = (givenUsername, givenPassword) => {
    axios.get(`http://localhost:3001/validateLogin/${givenUsername}/${givenPassword}`).then((response) => {
      let pulledData = response.data[0];
      let userNameData = pulledData["username"];
      let id = pulledData['userId'];
      console.log(id);
      if (pulledData !== null) {
        localStorage.setItem('username', userNameData);
        localStorage.setItem('loginState', 1);
        localStorage.setItem('id', id);
        setUserId(localStorage.getItem('id'));
        setLoginState(localStorage.getItem('loginState'));
        setIsLoggedIn(true);
      }
    });
  };

  function handleValidateClick(typedUser, typedPass) {
    validateLogin(typedUser, typedPass);
  }

  function handleCreateClick() {
    setIsCreatingUser(true);
  }

  function handleSignout() {
    localStorage.removeItem('loginState');
    setLoginState(0);
    setIsCreatingUser(false);
    setIsLoggedIn(false);
  }

  const seePassword = () => {
    setIsPasswordVisible((prevState) => !prevState);
  }

  const LoggedInController = () => {
    return (
      <>
        <h1 className="correctLogin">Successful Login, Welcome "{username}"</h1>
        <button onClick={() => handleSignout()} className="logoutButton">Logout button</button>
      </>
    );
  };

  const CreateUserController = () => {
    return (
      <>
        <div className="loginContainer">
          <input
            value={creatingUsername}
            onChange={(event) => updateCreatingUsername(event.target.value)}
            placeholder="Enter a username"
            className="loginUsernameBox"
          />
          <input
            value={creatingPassword}
            onChange={(event) => updateCreatingPassword(event.target.value)}
            placeholder="Enter a password"
            className="loginPasswordBox"
          />
           <input
            value={creatingEmail}
            onChange={(event) => updateCreatingEmail(event.target.value)}
            placeholder="Enter an email"
            className="loginEmailBox"
          />
          <button className="verifyButton" onClick={() => handleCreateUser()}>Create User</button>
          <button className="returnToLoginButton" onClick={() => handleSignout()}>Meant to log-in? Click here</button>
        </div>
      </>
    );
  };

  function handleCreateUser(){
    if(creatingUsername.length < 8 || creatingUsername.includes(';')){
      alert("username is invalid");
    }
    else if(creatingPassword.length < 8 || creatingPassword.includes(';')){
      alert("password is invalid");
    }
    else{
      localStorage.setItem('creatingUser',creatingUsername);
      localStorage.setItem('creatingPass',creatingPassword);
      localStorage.setItem('creatingEmail',creatingEmail);
      handleSendConfirmationEmail();

    }
  }

  const DefaultState = () => {
    return (
      <div className="loginContainer">
        <input
          ref={usernameRef}
          value={username}
          onChange={updateUsername}
          placeholder="Enter Username"
          className="loginUsernameBox"
        />
        <input
          ref={passwordRef}
          value={password}
          onChange={updatePassword}
          type={isPasswordVisible ? "text" : "password"}
          placeholder="Enter Password"
          className="loginPasswordBox"
        />
        <img className="viewPasswordButton" id="showHide" alt="showOrHideButton" src={isPasswordVisible ? closedEye : openEye} onClick={seePassword}/>
        <button onClick={() => handleValidateClick(username, password)} className="validateLoginButton">Log In</button>
        <button onClick={() => handleCreateClick()} className="createNewUserButton">New Here? Click to Create User</button>
      </div>
    );
  };

  const handleSendConfirmationEmail = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/send-confirmation-email`, {
        email : creatingEmail,
        confirmationLink : `http://localhost:3001/confirm/${"hello"}/${creatingUsername}/${creatingPassword}/${creatingEmail}`
      });
      console.log(response.data.message);
      setSuccessfulCreation(true);
      setIsCreatingUser(false);
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    }
  };

  const emailSent = () => {
    return(
      <>
      <h1 className="emailOpener">Email has been sent, waiting for confirmation. For now, refresh page after verification</h1>
      </>
    );
  }

  return (
    <>
      {(() => {
        if (isLoggedIn) {
          return LoggedInController();
        } else if (isCreatingUser) {
          return CreateUserController();
        } else if(successfulCreation){
          return emailSent();
        }else{
          return DefaultState();
        }
      })()}
    </>
  );
}
