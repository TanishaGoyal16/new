import { useSelector } from "react-redux";
import {useEffect, useState} from 'react';
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom'
import { addToCart, clearItems, removeFromCart, subtractItemQuantity } from "./cartSlice";
import './Cart.css'
import { showList } from "./orderSlice";
import Navbar from "./Navbar";
const Cart=()=>{
    const  {cartItems, totalAmount, quantity}  = useSelector((state) => state.cart);
    const history=useNavigate();
    const dispatch=useDispatch();
    useEffect(() => {
     
        if(sessionStorage.getItem("loginStatus")!="success")
            history("/login")
        
    
    }, [])

 
    const addToCartHandler=(id)=>{
        dispatch(addToCart(id))
    }

    const removeFromCartHandler=(id)=>{
        dispatch(subtractItemQuantity(id))

    }
    const checkOutHandler=()=>{
        dispatch(showList({cartItems,totalAmount,quantity}))
        dispatch(clearItems());
        let datas={
            orderItems:cartItems,
            quantity:quantity,
            price:totalAmount,
            personId:1
        
          }
        fetch("http://localhost:8082/backend/order",{
            method:'POST',headers:{
                "Content-Type":"application/json",
                "Access-Control-Allow-Origin":"*"
                // "Authorization" 
            },body:JSON.stringify(datas)});
    
        history('/checkout')
    }

    return(
        <>
              <Navbar/>

        <div className="cart-container" style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        {totalAmount==0?<img style={{width:"900px"}} src="https://www.ashokdigital.com/images/empty-cart.jpg" onClick={()=>{history("/dashboard")}}/>:
        <div>
            {
            cartItems.map(data=>(

        <div className="cart-main">
        <img src={data.image}/>
        <div className="cart-sub-main">
        <p >{data.title}</p>
        <h3 >${data.price}</h3>
      <div className="button-cart"> 
      <button onClick={()=>removeFromCartHandler(data)}>-</button>
       <h2>{data.quantity}</h2>
       <button onClick={()=>addToCartHandler(data)}>+</button>  
</div></div></div>))
}
<p>Total Amount: <strong>${Math.abs(parseFloat(totalAmount).toFixed(2))}</strong></p>
<p>Total quantity:<strong>{quantity}</strong></p>
<button className="product-button" onClick={checkOutHandler}>Check Out</button>
</div>
}

</div>
        </>
    )
}
export default Cart;