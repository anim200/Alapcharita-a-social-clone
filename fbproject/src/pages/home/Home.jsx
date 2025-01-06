
import Topbar from "../../components/topbar/topbar";
import Rightbar from "../../components/rightbar/rightbar";
import Sidebar from "../../components/sidebar/sidebar";
import Feed from "../../components/feed/feed";
import "./home.css"


export default function Home(){
    return (
        <>
             <Topbar/>
             <div className="homecontainer">
             <Sidebar />
             <Feed/>
             <Rightbar/>
             </div>
            
             
        </>
);
}