import { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './Register.css';
import './Login.css';
import FileBase64 from 'react-file-base64';

const Register=()=>{
    const [files, setFiles] = useState();
    const history=useNavigate();
    useEffect(() => {
       const sessionManagement=()=>{
        if(sessionStorage.getItem("loginStatus")==="success")
        history("/dashboard")
        }
        sessionManagement();
    }, [])
    

   const registerHandler=async(event)=>{
    event.preventDefault();
   if(files)
    var data={
        email:event.target[0].value,
        name:event.target[1].value,
        password:event.target[2].value,
        image:files.slice(23, -1)
    }
    console.log(data);
const res=await fetch("http://localhost:8081/backend/register",{
    method:'POST',headers:{
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin":"*"
        // "Authorization" 
    },body:JSON.stringify(data)
})
console.log(res.status)
if(res.status==200){
    sessionStorage.setItem("loginStatus","success")
    alert("Register successfully")
    history("/dashboard")
}
else if(res.status==409)
alert("Already Exist")
else{
    alert("Error Occurred")
}
history("/register")
    console.log(event.target[0].value)

}

const getFiles=(event)=>{
    console.log(event[0].base64);
setFiles(event[0].base64);
}
    return(
        <div className="login-container">
            <div className='login-main'>
            <div className='login-sub-main'>
            <img src='./logo.png' width="200px"/>

            <form className='login-form-container' onSubmit={registerHandler}>
            <h2>Register Here</h2>

                <div className='login-email'>
                <input id='login-email-input' type="email" placeholder=' '/>
                <label for="login-email-input">
               Email
                </label>
                </div>
                <div className='login-email'>
                <input id='login-name-input'  placeholder=' '/>
                <label for="login-name-input">
                Full Name
                </label>
                </div>
                <div className='login-password'>
                <input id='login-password-input' type="password" placeholder=' '/>
                <label for="login-password-input">
                Password
                </label>
                </div>
                <div>
                <FileBase64
                  multiple={ true }
                  onDone={getFiles} />
                </div>
                <div className='login-submit'>
                    <input className='login-submit-button' type="submit" value="Sign up"/>
                    </div>
            </form>
            <div >
                OR
            </div>
            </div>
            <Link to="/" className='login-register-main'>
                    Login Here
           </Link>
        </div>
        </div>
    )
}

export default Register;