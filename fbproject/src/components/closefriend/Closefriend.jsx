import "./closefriend.css"



export default function Closefriend({user}) {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <li className="sidebarFriend">
        <img className="sidebarFriendImg" src={PF+user.profilePicture} crossOrigin="anonymous"></img>
        <span className="sidebarFriendName">{user.username}</span>
    </li>
  )
}
