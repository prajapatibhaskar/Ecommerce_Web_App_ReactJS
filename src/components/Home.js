import React, { useReducer } from "react";
import Button from '@mui/material/Button';
import { useNavigate  } from "react-router-dom";
import { Shop } from "./Shop";
import '../styles/shop.css';
import '../styles/common.css';

export const Home = ({}) => {

    const navigate = useNavigate();
    const user = sessionStorage.getItem("username");

    return (
        <>
            {UserFragment(user, navigate)}
        </>
    );
};

const UserFragment = (user, navigate) => {
    if(user){
        return (
            <>
                <Shop />
            </>
        );
    }
    return(
        <>
            <div className="login-page">
                <div className="greeting">Welcome To Shop!</div>
                <div className="login-button">
                    <Button variant="contained" onClick={() => navigate("/login")}>Login</Button>
                </div>
            </div>
        </>
    );
};
