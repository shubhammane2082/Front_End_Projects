import React, { useState } from "react";
import "./SignUp.css";
import logo from "../../Assets/google.png";
import TextField from "@mui/material/TextField";
import profile from "../../Assets/img-removebg-preview.png";
// import { InputAdornment } from "@mui/material";
// import { Link } from "react-router-dom";
import { signup } from "../../Services/UserService";
// import axios from "axios";

function Signup() {
  const NameRegex = /^[A-Z]{1}[a-z]{1,}$/;
  const UsrNameRegex = /^[a-z]{3,}(.[0-9a-z]*)?@([a-z]){2,}.[a-z]+(.in)*$/;
  const passRegex = /^.*(?=.{8,})(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).*$/;

  const [user, setuser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errorobj, seterrorobj] = useState({
    firstNameError: false,
    firstNameErrorMsg: "",
    lastNameError: false,
    lastNameErrorMsg: " ",
    emailError: false,
    emailErrorMsg: "",
    passwordError: false,
    passwordErrorMsg: " ",
    confirmPasswordError: false,
    confirmPasswordErrorMsg: "",
  });

  const setfirstName = (event) => {
    setuser({ ...user, firstName: event.target.value });
  };

  // https://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp
  const setlastName = (event) => {
    setuser({ ...user, lastName: event.target.value });
  };
  const setpassword = (event) => {
    setuser({ ...user, password: event.target.value });
  };

  const confirmPassword = (event) => {
    setuser({ ...user, confirmPassword: event.target.value });
  };
  const setemail = (event) => {
    setuser({ ...user, email: event.target.value });
  };

  const submithandler = async () => {
    let firstnameresult = NameRegex.test(user.firstName);
    let lnameresult = NameRegex.test(user.lastName);
    let emailresult = UsrNameRegex.test(user.email);
    let passwordresult = passRegex.test(user.password);

    if (firstnameresult === false) {
      seterrorobj((prevState) => ({
        ...prevState,
        firstNameError: true,
        firstNameErrorMsg: "Enter correct FirstName",
      }));
    } else {
      seterrorobj((prevState) => ({
        ...prevState,
        firstNameError: false,
        firstNameErrorMsg: "",
      }));
    }

    if (lnameresult === false) {
      seterrorobj((prevState) => ({
        ...prevState,
        lastNameError: true,
        lastNameErrorMsg: "Enter correct lastname",
      }));
    } else {
      seterrorobj((prevState) => ({
        ...prevState,
        lastNameError: false,
        lastNameErrorMsg: "",
      }));
    }

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

    if (user.password !== user.confirmPassword) {
      seterrorobj((prevState) => ({
        ...prevState,
        confirmPasswordError: true,
        confirmPasswordErrorMsg: "Password does not match",
      }));
    } else {
      seterrorobj((prevState) => ({
        ...prevState,
        confirmPasswordError: false,
        confirmPasswordErrorMsg: "",
      }));
    }

    if (
      firstnameresult === true &&
      lnameresult === true &&
      emailresult === true &&
      passwordresult === true
    ) {
      const data = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        service: "advance",
      };

      let response=await signup(data);
      console.log(response);
    }

    
  };
  return (
    <div className="All">
      <div className="main">
        <div className="left-side">
          <div className="logo">
            <img src={logo} alt="" />
          </div>

          <div className="account">
            <h1>Create to your Google Account</h1>
          </div>

          <div className="continue">to continue to Gmail</div>

          <div className="names">
            <TextField
              id="outlined-basic"
              label="Firstname"
              variant="outlined"
              size="small"
              className="simpleinput"
              onChange={setfirstName}
              value={user.firstName}
              error={errorobj.firstNameError}
              helperText={errorobj.firstNameErrorMsg}
            />
            <TextField
              id="outlined-basic"
              label="Lastname"
              variant="outlined"
              size="small"
              className="simpleinput"
              onChange={setlastName}
              value={user.lastName}
              error={errorobj.lastNameError}
              helperText={errorobj.lastNameErrorMsg}
            />
          </div>

          <div className="user">
            <TextField
             id="outlined-basic1"
             label="Email"
             variant="outlined"
             size="small"
             fullWidth
              value={user.email}
              onChange={setemail}
              error={errorobj.emailError}
              helperText={errorobj.emailErrorMsg}
            />
          </div>

          <div className="state">
            <p>You can use letters,numbers & periods</p>
          </div>

          <div className="password">
            <TextField
              id="outlined-basic2"
              label="Password"
              variant="outlined"
              size="small"
              className="secondary"
              value={user.password}
              onChange={setpassword}
              error={errorobj.passwordError}
              helperText={errorobj.passwordErrorMsg}
            />
            <TextField
              id="outlined-basic2"
              label="Confirm"
              variant="outlined"
              size="small"
              className="secondary"
              value={user.confirmPassword}
              onChange={confirmPassword}
              error={errorobj.confirmPasswordError}
              helperText={errorobj.confirmPasswordErrorMsg}
            />
          </div>

          <div className="symbol">
            <p>Use 8 or more charaters with mix of letters,numbers & symbols</p>
          </div>

          <div className="last">
            <button id="sign">Sign in instead</button>

            <button id="next" onClick={submithandler}>
              Next
            </button>
          </div>
        </div>
        <div className="right-side">
          <img src={profile} alt="" />
          <br />
          <p>One account. All of Google working for you.</p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
