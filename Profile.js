import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import './Profile.css'

const Profile=()=>{
const [profile, setProfile] = useState();
 useEffect(() => {
    const fetchData=async()=>{

        const res=await fetch(`http://localhost:8081/backend/profile/?email=${sessionStorage.getItem("email")}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Access-Control-Allow-Origin":"*"
                // "Authorization" 
            
            }
        });
        console.log(res);
        const data=await res.json();
        console.log(data);
        setProfile(data);
        
    }
   fetchData();
 }, []);
    return(
        <div>
        <Navbar/>

           {profile&& <div className="profile-main">
            <div className="profile-image-main">
            <img className="profile-image" src={"data:image/jpeg;base64,"+profile.image}/>
        </div>
        <div className="profile-details">
            <div>
                <p>Name :</p>
            <p className="profile-name">{profile.name}</p>
            </div>
            <div>
                <p>Email :</p>
            <p className="profile-email">{profile.email}</p>
          </div>
         </div>
        </div>}
        </div>
    )
}
export default Profile;