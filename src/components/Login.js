import React, { Component, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("http://127.0.0.1:8000/api/user_login",
            {
                method: "post",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: username, password: password }),
            }

        )
        .then((res) => res.json())
        .then((json) => {
          //   dispatch(showAll());
          localStorage.setItem("token", JSON.stringify(json.data[0].id))
          navigate("/");

        })
        .catch((err) => {
          console.log(err);
        });
    }

    return (
        <div className="Login">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-4">
                        <form id="loginform" onSubmit={handleSubmit}>
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
