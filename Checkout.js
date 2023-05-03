import './Checkout.css'
import Navbar from './Navbar'
const CheckOut = () => {
    return ( 
<div>
    <Navbar/>
        <div className="check-out-container">
            
            <img style={{height:"200px"}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/2048px-Eo_circle_green_checkmark.svg.png" />
        <h2>Order Placed Successfully</h2>
        </div>
        </div>
     );
}
 
export default CheckOut;