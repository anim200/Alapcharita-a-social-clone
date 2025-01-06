import "./topbar.css"
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import SmsIcon from '@mui/icons-material/Sms';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Link} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function Topbar(){
    const {user}=useContext(AuthContext);
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;

return(
    <div className="topbar-container">
        <div className="topbarLeft">
            <Link to="/" style={{textDecoration:"none"}}>
            
            <span className="logo">Alapcharita</span>
            </Link>
        </div>
        <div className="topbarCenter">
            <div className="searchbar">
            <SearchIcon className="searchIcon"/>
            <input placeholder="search for friend,post or videos" className="searchInput" />
            </div>
           
        </div>
        <div className="topbarRight">
            <div className="topbarLinks">
                <span className="topbarLink">Homepage</span>
                <span className="topbarLink">TimeLine</span>
                

            </div>
            <div className="topbarIcon">
                <div className="topbarIconItem">
                    <PersonIcon/>
                    <span className="topbarIconBadge">1</span>

                </div>
                <div className="topbarIconItem">
                    <SmsIcon/>
                    <span className="topbarIconBadge">2</span>

                </div>
                <div className="topbarIconItem">
                    <NotificationsIcon/>
                    <span className="topbarIconBadge">1</span>

                </div>
            </div>
            <Link  to={"/profile/" + user.username}>
            <img src={user.profilePicture?PF+user.profilePicture:PF+"noimage.png"} alt="" className="topbarImg" crossOrigin="anonymous" />
            
            </Link>
        </div>
        
    
    </div>
)


}