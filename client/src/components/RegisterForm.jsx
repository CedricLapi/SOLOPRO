
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        isAdmin: false // Set isAdmin default value to false
    });

    const changeHandler = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;
        setUserInfo({
            ...userInfo,
            [name]: val
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/register', userInfo, {withCredentials: true})
            .then(res => {
                console.log(res);
                navigate('/api/users/login');
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <form action="" className="col-md-6 mx-auto" onSubmit={submitHandler}>
                <h3 className="text-center">Register</h3>

                <div className='form-group'>
                    <label className='form-check-label'>
                        <input type="checkbox" className='form-check-input' name="isAdmin" checked={userInfo.isAdmin} onChange={changeHandler}/>
                        Admin
                    </label>
                </div>
                
                <div className='form-group'>
                    <label className='form-label'>First Name:</label>
                    <input type="text" className='form-control' name="firstName" value={userInfo.firstName} onChange={changeHandler}/>

                </div>

                <div className='form-group'>
                    <label className='form-label'>Last Name:</label>
                    <input type="text" className='form-control' name="lastName" value={userInfo.lastName} onChange={changeHandler}/>

                </div>

                <div className='form-group'>
                    <label className='form-label'>Email:</label>
                    <input type="email" className='form-control' name="email" value={userInfo.email} onChange={changeHandler}/>

                </div>

                <div className='form-group'>
                    <label className='form-label'>Password:</label>
                    <input type="password" className='form-control' name="password" value={userInfo.password} onChange={changeHandler}/>

                </div>

                

                <div className='form-group'>
                    <label className='form-label'>Confirm Password:</label>
                    <input type="password" className='form-control' name="confirmPassword" value={userInfo.confirmPassword} onChange={changeHandler}/>

                </div>

                <div className='form-group'>
                    <button type="submit" className='btn btn-primary mt-3'>Register</button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
