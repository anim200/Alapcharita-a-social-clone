import React from './profile.css'

import Topbar from "../../components/topbar/topbar";
import Rightbar from "../../components/rightbar/rightbar";
import Sidebar from "../../components/sidebar/sidebar";
import Feed from "../../components/feed/feed";

import axios from 'axios';
import { useEffect, useState } from "react";
import {useParams} from "react-router"



export default function Profile() {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  const [user,setUser]=useState({});
  const username=useParams().username;
  
  useEffect(() => {
    const fetchUser = async () => {
    
        const res =await axios.get(`/users?username=${username}`)
        setUser(res.data);
        
      
    };

    fetchUser();
  }, [username]);
  console.log(user.profilePicture)

  return (
    <>
    <Topbar/>
    <div className="profile">
           <Sidebar />
              <div className="profileRight">
                <div className="profileRightTop"></div>
                <div className="profileCover">
                    <img className="profileCoverImg" src= {user.coverPicture? PF+`${user.coverPicture}` : "/assets/cover.png"} crossOrigin='anonymous'></img>
                    <img className="profileUserImg" src= {user.profilePicture? PF+`${user.profilePicture}` : "/assets/noimage.png"} crossOrigin='anonymous'></img>
                  </div>
                  <div className="profileInfo">
                    <h4 className="profileInfoName">
                      {user.username}
                    </h4>
                    <span className="profileInfoDesc">{user.desc}</span>
                  </div>
                <div className="profileRightBottom">
                <Feed username={username}/>
                <Rightbar user={user}/>
                </div>
              

               
              </div>
    </div>
   
    
</>
  )
}
