import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import './Login.css';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [apiError, setApiError] = React.useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('https://dummyjson.com/auth/login', {
                username: data.username,
                password: data.password,
                expiresInMins: 30,
            }, {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            navigate('./Dashboard');
        } catch (err) {
            setApiError('Invalid username or password');
            console.error(err);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <i className="fa-solid fa-cube login-icon"></i>
                <h2 className="login-title">Package Tracker</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                    <p className='login-text'>Sign in to manage your Package deliveries</p>
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            {...register('username', {
                                required: 'Username is required',
                                minLength: { value: 3, message: 'Username must be at least 3 characters' },
                            })}
                            placeholder="Enter username "
                            className="form-input"
                        />
                        {errors.username && <p className="error-message">{errors.username.message}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password must be at least 6 characters' },
                            })}
                            placeholder="Enter password "
                            className="form-input"
                        />
                        {errors.password && <p className="error-message">{errors.password.message}</p>}
                    </div>
                    {apiError && <p className="error-message">{apiError}</p>}
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;