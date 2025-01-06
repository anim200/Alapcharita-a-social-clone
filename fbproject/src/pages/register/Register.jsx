import { useRef } from "react";
import "./register.css"
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // Replace useHistory with useNavigate

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("passwords don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/"); // Use navigate instead of history.push
      } catch (err) {
        console.log(err);
      }
    }
  };

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
                <input placeholder="UserName" required ref={username} className="loginInput" />
                <input placeholder="Email"type="email" ref={email} required className="loginInput" />
                <input placeholder="Password"type="password" ref={password} minlength="6" required className="loginInput" />
                <input placeholder="Password Again" type="password" required ref={passwordAgain} className="loginInput" />
                <button className="loginButton"type="submit">Sign Up</button>
                <span className="loginForgot">Forgot Password?</span>
                <button className="loginRegisterButton">Log into Account</button>
            </form>
        </div>
      </div>
    </div>
  )
}
