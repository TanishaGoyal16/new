import { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './Login.css';

const Login=()=>{
    const history=useNavigate();
    useEffect(() => {
      const  sessionManagement=()=>{
        if(sessionStorage.getItem("loginStatus")=="success")
        history("/dashboard")
        }
        sessionManagement();
    }, [])
    

   const loginHandler=async (event)=>{
    event.preventDefault();
        var data={
            email:event.target[0].value,
            password:event.target[1].value
        }
        console.log(data);
        
    const res=await fetch("http://localhost:8081/backend/login",{
        method:'POST',headers:{
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin":"*"
            // "Authorization" 
        },body:JSON.stringify(data)
    })
    console.log(res.status)
    if(res.status==200  ){
        sessionStorage.setItem("loginStatus","success")
        sessionStorage.setItem("email",event.target[0].value)
        history("/dashboard")
    }

    else if(res.status==401){
        alert("Invalid")
    }
        console.log(event.target[0].value)
    }

    return(
            <div className="login-container">
           
                <div className='login-main'>
                    
                <div className='login-sub-main'>

                <img src='./logo.png' width="200px"/>
                <form className='login-form-container' onSubmit={loginHandler}>
                <h2>Login Here</h2>
                    <div className='login-email'>
                    <input id='login-email-input' type="email" placeholder=' '/>
                    <label htmlFor="login-email-input">
                     Email
                    </label>
                    </div>
                    <div className='login-password'>
                    <input id='login-password-input' type="password" placeholder=' '/>
                    <label for="login-password-input">
                        Password
                    </label>
                    </div>
                    <div className='login-submit'>
                        <input className='login-submit-button' type="submit" value="Log In"/>
                        </div>
                </form>
                <div style={{ textAlign:"center"}}>
                <div  style={{padding:"10px"}}><Link to="/register">Forgot Password?</Link></div>
                <div>
                    OR
                    </div>
                </div>
                </div>
                <Link to="/register" className='login-register-main'>
                    Register Here
          </Link>
                </div>
            </div>
    )
}

export default Login;