import { createContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Product.css';
import 'react-toastify/dist/ReactToastify.css';
import './Category.css'
const Category=()=>{
    const [loading,setLoading]=useState(true);
    const [productList, setproductList] = useState();
    
useEffect(()=>{
    const callApi= async()=>{
    const res=await fetch('https://api.escuelajs.co/api/v1/categories');
    const data=await res.json();
    setproductList(data);
    console.log(data);
    setLoading(false);
}
callApi();
},[])



return(
    <div className="product-container">
        {loading?<img  style={{margin:"100px auto",height:"100px"}} src="/loading.gif"/>:
       <div style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}} >
         <div style={{width:"100%"}} >
            <h1>Categories</h1>
        <div className="product-main">
        {productList.map(data=>(

           <Link to={`/category?category=${data.name}`} >
           <div className="product-tile" >
                <img  src={data.image}/>
                <div className="product-sub-main">
                <p className="product-title">{data.name}</p>
                {/* <p className={!active?`product-description`:`product-description`}>{data.description}</p> */}
               
            </div>
            </div>
            </Link>
        ))}</div>
        </div>
        </div>}
    </div>
    )
}

export default Category;