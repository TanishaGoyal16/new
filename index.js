import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Product from './Product';
import ProductDetails from './ProductDetails';
import { store } from '../../myapp/src/store';
import { Provider } from 'react-redux';
import Cart from './Cart';
import Login from './Login';
import CheckOut from './Checkout';
import ProductList from './ProductList';
import Order from './Order';
import Register from './Register';



const root = ReactDOM.createRoot(document.getElementById('roots'));

root.render(
<Provider store={store}>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path="order" element={<Order/>}/>
    <Route path="checkout" element={<CheckOut/>}/>
    <Route path="register" element={<Register/>}/>
    <Route path="profile" element={<Profile/>}/>
    <Route path="products" element={<ProductDetails/>}/>
    <Route path='cart' element={<Cart/>}/>
    <Route path="dashboard" element={<App/>}/>
    <Route path="category" element={<ProductList/>}/>
  </Routes>
  </BrowserRouter>
    </Provider>
  );
  
 reportWebVitals();
