import "./login.css"
import {useRef} from "react"
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import CircularProgress from '@mui/material-next/CircularProgress';

export default function Login() {
  const email=useRef();
  const password=useRef();
  const {user,isFetching,error,dispatch}=useContext(AuthContext)
  const handleClick=(e)=>{
    e.preventDefault();
    loginCall({email:email.current.value,password:password.current.value},dispatch)
  }
  console.log(user)
  return (
    <div className="login">
      <div className="loginWrapper">
            <div className="loginLeft">
            <h3 className="loginLogo">
                Alapcharita
                </h3>
                  <span className="loginDesc">
                    Connect with friends and the world<br></br>
                    around you on Alapcharita 
                 </span>

            </div>
        <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
                <input placeholder="Email" type="email" className="loginInput" ref={email} />
                <input placeholder="Password"type="password" ref={password} minlength="6" required className="loginInput" />
                <button className="loginButton" type="submit" disabled={isFetching}>
  {isFetching ? <CircularProgress color="inherit" size="20px"/> : "Log In"}
</button>

                <span className="loginForgot">Forgot Password?</span>
                <button className="loginRegisterButton">  {isFetching ? <CircularProgress color="inherit" size="20px"/> : "Create New Account"}</button>
            </form>
        </div>
      </div>
    </div>
  )
}
