import React,  { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate  } from "react-router-dom";

export const Login = ({}) => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const navigate = useNavigate();

    

  return (
    <>
      <div className="login-page"> <div className="login-page-header">Login Page</div>
      <div className="username">
      <TextField id="outlined-basic" label="Username" variant="outlined" onChange={(event) => updateState(setUsername, event)}/>
      </div>
      <div className="password">
      <TextField id="outlined-basic" label="Password" variant="outlined" type="password" onChange={(event) => updateState(setPassword, event)}/>
      </div>
      <div className="login-button">
      <Button variant="contained" onClick={() => login(username, password, navigate)}>Login</Button>
      </div>
      <div className="login-to-signup-link"> <div>Don't have an account? </div><div className="signup-link"><a href="/signup">Signup</a></div> </div>
      </div>
    </>
  );
};

const login = (username, password, navigate) => {

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, password: password }),
  };
  fetch('http://localhost:8080/login', requestOptions)
  .then(response => response.json())
  .then(response => {
    if(response === true){
      console.log("Logged in");
      sessionStorage.setItem("username", username)
      navigate("/");
    }
    else{
      console.log("User does not exist")
    }
  })
  .catch(error => console.error("Some error occured"))
};

const updateState = (setter, event) => {
    setter(event.target.value);
}


