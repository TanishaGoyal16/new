import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import './Order.css'

const Order = () => {

  const [order, setOrder] = useState();
  const history=useNavigate();
  useEffect(() => {
   
      if(sessionStorage.getItem("loginStatus")!="success")
          history("/login")
      
  
  }, [])
  useEffect(() => {
   
    const fetchOrder= async()=>{
      const res= await fetch("http://localhost:8082/backend/getorder/?personId=1",{

      method:'GET',headers:{
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin":"*"
    }})
    console.log(res.status)
    if(res.status==200)
{    const data=await res.json();
    console.log(data);
    setOrder(data);
 } 
else
 setOrder(null)
}
    fetchOrder();
  }, []);
  return (
    <div>      
      <Navbar/>
   {order && <div className="order-container" style={{paddingTop:"100px",paddingLeft:"50px"}}>
      <div className="order-main">
        {/* {order && (!order.orderItems)?<div>No order</div> :order.orderItems.map(ele => (
          <div style={{border:"1px solid black",margin:"20px 0",width:"200px" }}>
          <p>Order Id : {ele.orderId}</p>
          <p>Total Quantity:{ele.quantity}</p>
          <p>Total Price:{ele.totalAmount}</p>
          </div>
        ))} */}
          {(order.length==0||order==null)?<img src="./order.jpeg"/>: <div > <h2>Orders</h2> <div className="product-sub-main" style={{gap:"30px"}}> {order.map(order=><div className="product-tile">
            <p>Order id:<strong>{order.orderId}</strong></p>
            <p>Total Price:<strong>{order.price}</strong></p>
            <p>Total Quantity <strong>{order.quantity}</strong></p>
            {/* <button className="product-button">View Details</button> */}

            </div>)}</div></div>}
      </div>
    </div>}
        </div>
  );
}

export default Order;