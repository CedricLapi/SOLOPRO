import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    });

    const changeHandler = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/login', userInfo, { withCredentials: true })
            .then(res => {
                console.log(res);
                // Check if user is admin
                if (res.data.user.isAdmin) {
                    navigate('/api/users');
                } else {
                    navigate('/api/books');
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <form className='col-md-6 mx-auto' onSubmit={submitHandler}>
                <h3 className='text-center'>Login</h3>
                <div className='form-group'>
                    <label className='form-label'>Email:</label>
                    <input type="email" className='form-control' name='email' value={userInfo.email} onChange={changeHandler} />
                </div>

                <div className='form-group'>
                    <label className='form-label'>Password:</label>
                    <input type="password" className='form-control' name='password' value={userInfo.password} onChange={changeHandler} />
                </div>

                <div className='form-group'>
                    <button type='submit' className='btn btn-primary mt-3'>Login</button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
