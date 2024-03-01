import React, { useState } from 'react'
import './SignIn.css'
import google from '../../Assets/google.png'
import TextField from '@mui/material/TextField';
 import { signin } from '../../Services/UserService';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const navigate=useNavigate();
    const UsrNameRegex = /^[a-z]{3,}(.[0-9a-z]*)?@([a-z]){2,}.[a-z]+(.in)*$/;
    const passRegex = /^.*(?=.{8,})(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).*$/;
    const [user,setuser]=useState({email : ' ', password :' '});
    const [errorobj,seterrorobj]=useState({
        emailError: false,
        emailErrorMsg: "",
        passwordError: false,
        passwordErrorMsg: " "
    })

    const setemail = (event) => {
        setuser({ ...user, email: event.target.value });
      };

    const setpassword = (event) =>{
        setuser({
            ...user,password:event.target.value
        })
    }

    const submithandlerforsignIn = async() =>
    {
    let emailresult = UsrNameRegex.test(user.email);
    let passwordresult = passRegex.test(user.password);
    // console.log(user.email+" "+emailresult);
    

    if (emailresult === false) {
        seterrorobj((prevState) => ({
          ...prevState,
          emailError: true,
          emailErrorMsg: "Enter correct Email",
        }));
      } else {
        seterrorobj((prevState) => ({
          ...prevState,
          emailError: false,
          emailErrorMsg: ""
        }));
      }

      if (passwordresult === false) {
        seterrorobj((prevState) => ({
          ...prevState,
          passwordError: true,
          passwordErrorMsg: "Enter correct password",
        }));
      } else {
        seterrorobj((prevState) => ({
          ...prevState,
          passwordError: false,
          passwordErrorMsg: "",
        }));
      }
  

        if(emailresult === true && passwordresult===true)
        {
            const signInobj = {
                email : user.email,
                password : user.password
            };
            // console.log(signInobj);
        let response = await signin(signInobj);

        localStorage.setItem('token',response.data.id);
        navigate("/dashboard")
        // console.log(response.data.id);
     }
    }
    
  return (
    <div className="header">
        <div className="google-logo">
            <img src={google} alt="" />
        </div> 

        <div className="signin">
            <h1>Sign In</h1>
        </div>

        <div className="google-account">
            with your Google Account
        </div>

        <div className="emailPass">
        <div className="emailPassone">
        <TextField id="outlined-basicthree" label="Email or Phone" variant="outlined" onChange={setemail} fullWidth error={errorobj.emailError}
            size='small'  helperText={errorobj.emailErrorMsg}/>
        <h1>Forgot Email?</h1>
        </div>
        <div className="emailPasstwo">
        <TextField id="outlined-basicthree" label="Password" variant="outlined" onChange={setpassword} fullWidth error={errorobj.passwordError}
             size='small' helperText={errorobj.passwordErrorMsg}/>
        <h1>Forgot Password?</h1>
        </div> 
        </div>

        <div className="twobutton">
            <button id='create'>
                Create
            </button>
            <button id='submit' onClick={submithandlerforsignIn}>Next</button>
        </div>
    </div>
  )
}

export default SignIn
