import Home from "./pages/home/Home";
import Profile from "./pages/profile/profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";


function App() {
const { user } = useContext(AuthContext);
















  

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Login />}
        />
         <Route
          path="/register"
          element={user ? <Home /> : < Register />}
        />
         <Route
          path="/success"
          element={user ? <Home /> : <Register />}
        />
        <Route path="/" element={user ? <Home/> : <Login />} />
        <Route path="register" element={user ? <Home/> : <Register />} />
        <Route path="profile/:username" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
