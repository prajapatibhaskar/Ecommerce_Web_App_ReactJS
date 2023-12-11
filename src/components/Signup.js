import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate  } from "react-router-dom";
import '../styles/common.css';

export const Signup = ({}) => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const navigate = useNavigate();

  return (
    <>
      <div className="signup-page"> <div className="signup-page-header">Signup Page</div>
      <div className="username">
      <TextField id="outlined-basic" label="Username" variant="outlined" onChange={(event) => updateState(setUsername, event)}/>
      </div>
      <div className="password">
      <TextField id="outlined-basic" label="Password" variant="outlined" type="password" onChange={(event) => updateState(setPassword, event)}/>
      </div>
      <div className="signup-button">
      <Button variant="contained" onClick={() => signup(username, password, navigate)}>Signup</Button>
      </div>
      <div className="signup-to-login-link"> <div>Already have an account? </div><div className="login-link"><a href="/login">Login</a></div> </div>
      </div>
    </>
  );
};

const signup = (username, password, navigate) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, password: password }),
  };
  fetch('http://localhost:8080/signup', requestOptions)
  .then(response => response.json())
  .then(response => {
    if(response === true){
      console.log("User Created");
      sessionStorage.setItem("username", username)
      navigate("/");
    }
    else{
      console.log("User Already Exists")
    }
  })
  .catch(error => console.error("Some error occured"))
};

const updateState = (setter, event) => {
    setter(event.target.value);
}