import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Category from './Category';
import './Dashboard.css'
import Product from './Product';
import ProductList from './ProductList';
const  Dashboard=()=>{
   const history= useNavigate();
    const {searchBox}=useSelector((state)=>state.search);
    const [showImage, setShowImage] = useState(true);
useEffect(() => {
 
    if(sessionStorage.getItem("loginStatus")!="success")
        history("/login")
    if(searchBox=="")
   {
    setShowImage(true)
   }
   else
   setShowImage(false)



}, [searchBox])

    return(
    <div >
       
       {showImage&&<div className='dashboard-container'>
        <img style={{width:"70%",padding:"30px",marginTop:"40px"}} src="./main.jpg"/>
        <Category/>
        </div>}
        <ProductList/>
    </div>
    )
}

export default Dashboard;