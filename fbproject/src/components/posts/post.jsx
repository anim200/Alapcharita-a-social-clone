import './post.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Users } from "../../dummyData"
import {format} from "timeago.js"
import {Link} from  "react-router-dom"


import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../../context/AuthContext';



export default function Post({post}) {

 
const [like,setLike]=useState(post.likes.length)
const [isliked,setIsLiked]=useState(false)
const {user:currentUser} = useContext(AuthContext)
useEffect(()=>{
  setIsLiked(post.likes.includes(currentUser._id))

},[currentUser._id,post.likes])

const likeHandler=()=>{
  try {
    axios.put("/posts/"+post._id+"/like",{userId:currentUser._id})
  } catch (error) {
    console.log(error)
    
  }
  setLike(isliked? like-1:like+1);
  setIsLiked(!isliked)
}
const [user,setUser]=useState({});
useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      console.log("Full response:", error.response);
    }
  };

  fetchUser();
}, [post.userId]);
 // const user=Users.filter(u=>u.id==1);
 // console.log(user);
 const PF=process.env.REACT_APP_PUBLIC_FOLDER
 console.log(PF+post.img)
  return (
    
  
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
            <img className="postProfileImg" src={user.profilePicture?PF+user.profilePicture:PF+"pf6.jpg"} alt="Profile" crossOrigin='anonymous' />
            </Link>
            
            <span className="postUserName">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
         <img className="postImage" src={PF+post.img} alt="Post" crossOrigin='anonymous' />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="/assets/like2.png" onClick={likeHandler} alt="Like" />
            <img className="heartIcon" src="/assets/heart.png" onClick={likeHandler} alt="Heart" />
            <div className="postLikeCounter">{like} people Like it</div>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
