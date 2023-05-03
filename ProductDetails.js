import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { addToCart } from "./cartSlice";
import Navbar from "./Navbar";
import './ProductDetails.css'

const ProductDetails=(props)=>{
    const query = new URLSearchParams(useLocation().search);
  const id = query.get("id");
  const [product, setProduct] = useState();
const [loading,setLoading]=useState(true);
const dispatch=useDispatch();

  console.log(id);

  useEffect(() => {
    const fetchData=async ()=>{
    const res=await fetch(`https://api.escuelajs.co/api/v1/products/${id}`,{method:"GET",headers:{
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json'
    }});
    const data=await res.json();
    console.log(data);
    setProduct(data);
    setLoading(false);
    }
    fetchData();
  }, [])

  const addToCartHandler=(data)=>{
    let id=data.id;
    let image=data.images
    let title=data.title
    let price=data.price
    console.log(id)
    dispatch(addToCart({ id, image, title, price }))
    toast(data.title+" added to Cart Successfully")
  

}

  
return(
  <div>
          <Navbar/>

    <div className="product-details-container">
        {loading?<img style={{margin:"100px auto",height:"100px"}} src="/loading.gif"/>:product && 
        <div className="product-details-main">
        <div className="product-image">
            <img src={product.images}/>
        </div>
        <div className="product-details">
            <p className="product-details-title">{product.title}</p>
            <p className="product-details-price">${product.price}</p>
            <p className="product-details-description">{product.description}</p>
            {/* <p className="product-details-rating">{product.price.rate}</p>
             <div>{[...Array(parseInt(product.rating.rate))].map((e) =><img style={{height:"30px"}} src="/star.png"/> )}</div> */}
        <button onClick={()=>addToCartHandler(product)} className="product-button" style={{margin:"20px 0"}}>Add to Cart</button>
       
        <ToastContainer position="bottom-right"/>
         </div>
        </div>
}
    </div>
             </div>
)
}

export default ProductDetails