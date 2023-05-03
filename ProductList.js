import { createContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Product.css';
import { useLocation } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductList=()=>{
    const  {cartItems, totalAmount, quantity}  = useSelector((state) => state.cart)
    const query = new URLSearchParams(useLocation().search);
    const category = query.get("category");
    const dispatch = useDispatch();
    const [loading,setLoading]=useState(true);
    const [active, setActive] = useState()
    const [productList, setproductList] = useState();
    const [listView, setListView] = useState("List View");
    const [listImage,setListImage]=useState("https://static.thenounproject.com/png/1055380-200.png");  
    const {searchBox}=useSelector((state)=>state.search)
    const [filteredData, setFilteredData] = useState();
    const history=useNavigate();
useEffect(() => {
 
    if(sessionStorage.getItem("loginStatus")!="success")
        history("/login")
    

}, [])
useEffect(()=>{
    const callApi= async()=>{
    const res=await fetch('https://api.escuelajs.co/api/v1/products');
    const data=await res.json();
    console.log(category)
    if(category)
  {  setproductList(data.filter(ele=>ele.category.name===category));
    setFilteredData(data.filter(ele=>ele.category.name===category));
  }  
  else{
setproductList(data);
setFilteredData(data);
  }
  console.log(data);
    setLoading(false);
}
callApi();
},[])

useEffect(() => {
 
    if(searchBox=="" && productList)
    {setFilteredData(productList)}
 if(productList && searchBox!=""){
     setFilteredData(productList.filter(ele=>ele.title.toUpperCase().includes(searchBox.toUpperCase())));
     console.log(filteredData)
    }
}, [searchBox])

const addToCartHandler=(data)=>{
    let id=data.id;
    let image=data.images
    let title=data.title
    let price=data.price
    console.log(id)
    dispatch(addToCart({ id, image, title, price }))
    console.log(cartItems)
    console.log(quantity)

}
const listHandler=()=>{
    setActive(!active);
    if(listView=="List View")
   {
setListImage("https://static.thenounproject.com/png/110306-200.png");
setListView("Grid View");
}    else{
        setListView("List View")
        setListImage("https://static.thenounproject.com/png/1055380-200.png")
    }
}

const changeImage=(images)=>{
    let x;
    
 
    
}

return(
    <div className="product-container">

    {loading ? <img style={{ margin: "100px auto", height: "100px" }} src="/loading.gif" /> :
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }} >
            {productList && filteredData.length > 0 ?
                <div style={{ width: "100%" }} >
                    <button onClick={listHandler} className="list-view">
                        <img style={{ height: "20px" }} src={listImage} />{listView}
                    </button>
                    <h1>Products</h1>
                    <div className={!active ? "product-main" : "list-product-main"}>
                        {filteredData.map(data => (

                            <Link to={`/products?id=${data.id}`} >
                                <div className={!active ? `product-tile` : `list-product-tile`} >
                                    <img src={data.images} />
                                    <div className="product-sub-main">
                                        <p className={!active ? `product-title` : `list-product-title`}>{data.title}</p>
                                        <h3 className={!active ? `product-price` : `list-product-price`}>${data.price}</h3>
                                        {/* <p className={!active?`product-description`:`list-product-description`}>{data.description}</p> */}
                                        <button type="button" className={!active ? "product-button" : "list-product-button"} onClick={(event) => {
                                            event.preventDefault();
                                            addToCartHandler(data);
                                            toast(data.title + " added to Cart");
                                        }}>Add to Cart</button>
                                    </div>
                                </div>
                            </Link>
                        ))
                        }</div></div> : <div><img style={{ width: "1000px" }} src="http://tahzeebstores.com/images/NoProduct.jpg" /></div>}</div>}
    <ToastContainer position="bottom-right" />
</div>
    )
}

export default ProductList;