
import "./online.css";


export default function Online({user}) {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  return (
    
    <li className="rightBarFriend">
    <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" src={PF+user.profilePicture}   crossOrigin="anonymous"/>
        <span className="rightbarOnline"></span>
    </div>
    <span className="rightbarUsername">{user.username}</span>
    
    

    

  </li>
    
  )
}
