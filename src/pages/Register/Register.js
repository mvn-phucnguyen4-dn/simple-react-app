import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { registerRoute } from '../../utils/APIRoutes';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';

const Register = () => {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    };

    const navigate = useNavigate();

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { email, username, password } = values;
            const { data } = await axios.post(registerRoute, {
                user: {email,
                    username,
                    password
                }
            });
            
            if (data.success === false) {
                toast.error(data.msg, toastOptions);
            }
            if (data.success === true) {
                localStorage.setItem(
                    'accessToken',
                    data.tokens.accessToken
                );
                localStorage.setItem(
                    'user',
                    JSON.stringify(data.user)
                );
                navigate("/");
            }
        }
    }

    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email === "") {
            toast.error("Email is required.", toastOptions);
            return false;
        }
        if (!email.match(mailformat)) {
            toast.error("Email is invalid.", toastOptions);
            return false;
        }
        if (username.length < 3) {
            toast.error(
                "Username should be greater than 3 characters.",
                toastOptions
            );
            return false;
        }
        if (password.length < 8) {
            toast.error(
                "Password should be equal or greater than 8 characters.",
                toastOptions
            );
            return false;
        }
        if (password !== confirmPassword) {
            toast.error(
                "Password and confirm password should be same.",
                toastOptions
            );
            return false;
        }
        return true;
    }
    return (
        <>
            <div className='registerOuterContainer'>
                <div className='registerInnerContainer'>
                    <h1 className='heading'>Register</h1>
                    <form action='' onSubmit={handleSubmit}>
                        <div><input placeholder='Email' className='registerInput' type='text' name='email' onChange={handleChange} /></div>
                        <div><input placeholder='Username' className='registerInput' type='text' name='username' onChange={handleChange} /></div>
                        <div><input placeholder='Password' className='registerInput' type='password' name='password' onChange={handleChange} /></div>
                        <div><input placeholder='Confirm Password' className='registerInput' type='password' name='confirmPassword' onChange={handleChange} /></div>
                        <button className='button mt-20'>CREATE USER</button>
                    </form>
                    <span>ALREADY HAVE AN ACCOUNT ? <Link to="/">Login</Link></span>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Register;