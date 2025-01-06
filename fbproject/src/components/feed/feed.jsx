import { useContext, useEffect, useState } from "react";
import { Posts } from "../../dummyData"
import Post from "../posts/post"
import Share from "../share/share"
import "./feed.css"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext";




export default function Feed({username}) {
  const [post,setPosts]=useState([]);
  const [text,setText]=useState("");
  const {user}=useContext(AuthContext)
  console.log(username)
  console.log(user._id);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res =username?await axios.get("/posts/profile/"+username): await axios.get("/posts/timeline/"+user._id);
        setPosts(res.data.sort((p1,p2)=>{
          return new Date(p2.createdAt) - new Date(p1.createdAt)
        }));
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        console.log("Full response:", error.response);
      }
    };

    fetchPosts();
  }, [username,user._id]);
  console.log(post);
  return (
    <div className="feed">
      <div className="feedWrapper">
      {(!username || username === user.username) && <Share />}
          {post.map(p => (
  <Post key={p._id} post={p} />
          ))}

          
         
          
      </div>
    </div>
  )
}
