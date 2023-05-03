import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link ,useLocation} from "react-router-dom";
import "./Navbar.css"
import { search } from "./searchSilce";
// import logo from '../public/logo.jpeg'
const Navbar=()=>{
   const dispatch= useDispatch();
    const location=useLocation();
const [showSearch, setShowSearch] = useState(false); 
    
    useEffect(() => {
        if(location.pathname=="/"||location.pathname=="/category")
        setShowSearch(true);
        else{
            setShowSearch(false)
        }
        
    }, [location.pathname]);

   const searchHandler=(e)=>{
        dispatch(search(e.target.value))
   }
    return(
        <div className="navbar-container">
            <div className="navbar-div-logo">
                <Link to="/"><img className="navbar-logo" src="/logo.png"/></Link>
            </div>
            {showSearch &&  <div className="search-box-div">
             <input className="search-bar" type="text" onChange={searchHandler}/>
                <img src="https://cdn-icons-png.flaticon.com/512/61/61088.png" style={{height:"20px"}}/>
       
            </div>}
            <div className="navbar-link">
            <Link to="/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Home-icon.svg/2048px-Home-icon.svg.png"/>HOME</Link>
            <Link to="/profile"><img src="https://icon-library.com/images/profile-png-icon/profile-png-icon-2.jpg"/>PROFILE</Link>
            <Link to="/cart"><img  src="https://cdn-icons-png.flaticon.com/512/126/126083.png"/>CART</Link>
            <Link to="/order"><img src="https://www.seekpng.com/png/full/230-2303331_complete-order-comments-order-icon-png.png"/>ORDER</Link>
            <Link to="/" onClick={()=>{sessionStorage.clear()}}><img src="http://cdn.onlinewebfonts.com/svg/img_90902.png"/>LOG OUT</Link>
        </div>
        </div>
    )
}


export default Navbar;