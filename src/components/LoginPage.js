import React, { Component, useState, useContext } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {

    // let history = useHistory();
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [usernameError, setUsernameError] = useState("");
  
    const dispatch = useDispatch();
    // const handleValidation = (event) => {
    //     let formIsValid = true;
    
    //     if (!username.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
    //       formIsValid = false;
    //       setUsernameError("Username Not Valid");
    //       return false;
    //     } else {
    //         setUsernameError("");
    //       formIsValid = true;
    //     }
    
    //     if (!password.match(/^[a-zA-Z]{8,22}$/)) {
    //       formIsValid = false;
    //       setPasswordError(
    //         "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
    //       );
    //       return false;
    //     } else {
    //       setPasswordError("");
    //       formIsValid = true;
    //     }
    
    //     return formIsValid;
    //   };
    
      const loginSubmit = (e) => {
        e.preventDefault();
        // handleValidation();
      };
      return (
        <div className="Login">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-md-4">
                <form id="loginform" >
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      placeholder=""
                      onChange={(event) => setUsername(event.target.value)}
                    />
                    <small id="emailHelp" className="text-danger form-text">
                      {setUsernameError}
                    </small>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <small id="passworderror" className="text-danger form-text">
                      {setPasswordError}
                    </small>
                  </div>
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    />
                    <label className="form-check-label">Check me out</label>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );

}
export default LoginPage;