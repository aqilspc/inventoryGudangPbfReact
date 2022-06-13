import React, { Component, useState, useContext } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
const Login = () => {

    let history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrors] = useState("");
    const dispatch = useDispatch();
    const handleForm = (e) => {
        e.preventDefault();
        dispatch((username, password));
        history.push('/')
    }
    return (
        <form>
            <h3>Sign In</h3>
            <form onSubmit={e => handleForm(e)}>
                <div className="mb-3">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter username"
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                    />
                </div>
                <div className="mb-3">
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck1"
                        />
                        <label className="custom-control-label" htmlFor="customCheck1">
                            Remember me
                        </label>
                    </div>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        </form>
    )

}