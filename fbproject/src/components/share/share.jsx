import "./share.css"
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import RoomIcon from '@mui/icons-material/Room';
import MoodIcon from '@mui/icons-material/Mood';
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';


export default function Share() {
  const { user } = useContext(AuthContext);
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  
  const desc=useRef();
  const [file,setFile]=useState(null)
  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = file.name;
      data.append("file", file);
      data.append("name", fileName); // Ensure this is included
      newPost.img = fileName;
    
      try {
        await axios.post("upload", data);
      } catch (error) {
        console.error("File upload failed:", error);
      }
    }

    try {
      if (file!==null) {
        await axios.post("/posts", newPost);
        window.location.reload()
        
      }
    
      // Reset input and file state after successful post submission
      desc.current.value = '';
      setFile(null);
    } catch (error) {
      console.error("Post creation failed:", error);
    }
};

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareprofileImg" src={user.profilePicture?PF+user.profilePicture:PF+"noimage.png" } crossOrigin="anonymous"></img>
          <input placeholder={"What's in your mind "+user.username + "?"} className="shareInput" ref={desc}/>
        </div>
          <hr className="shareHr"/>
          {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <CloseIcon className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
          <form className="shareBottom" onSubmit={submitHandler}>
            
            <div className="shareOptions">
              <label htmlFor="file" className="shareOption">
                  <PermMediaIcon htmlColor="tomato"className="shareIcon"/>
                   <span className="shareOptionText">
                      Photo or Video
                    </span>
                    <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])}></input>
              </label>
              <div className="shareOption">
                  <LabelIcon htmlColor="blue"className="shareIcon"/>
                   <span className="shareOptionText">
                      Tag
                    </span>
              </div>
              <div className="shareOption">
                  <RoomIcon htmlColor="green" className="shareIcon"/>
                   <span className="shareOptionText">
                      Location
                    </span>
              </div>
              <div className="shareOption">
                  <MoodIcon htmlColor="goldenrod" className="shareIcon"/>
                   <span className="shareOptionText">
                      Feelings
                    </span>
              </div>
            
            </div>
          <button className="shareButton" type="submit">Share</button>
          </form>
        

      </div>
      
    </div>
  )
}
