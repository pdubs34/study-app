import Axios from "axios";
import React, {useEffect} from 'react';
import {Link} from "react-router-dom";

export default function Confirm(){

    const addUserToDB = () => {
        Axios.post("http://localhost:3001/addUser", {
          name : "blank",
          username : localStorage.getItem('creatingUser'),
          userPassword : localStorage.getItem('creatingPass'),
          email: localStorage.getItem('creatingEmail')
      });
    }

    function handleVerification(){
      addUserToDB()
      localStorage.removeItem('creatingUser');
      localStorage.removeItem('creatingPass');
      localStorage.removeItem('creatingEmail');
    }

    useEffect(() => {
        handleVerification();
    }, []);
    
    return (
        <>
        <Link path="/loginPage" clasname="returnButton">Return to log in</Link>
        </>
    );
}