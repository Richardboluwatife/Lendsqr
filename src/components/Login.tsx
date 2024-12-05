import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Logo from '../assets/Logo.png';
import SignUp from '../assets/sign-in.png';
import '../styles/Login.scss';

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add validation or API call logic here if needed
        navigate('/dashboard'); // Navigate to the dashboard
    };

    return (
        <div className="Login">
            <div className="Logo">
                <div>
                    <img src={Logo} alt="Company Logo" />
                </div>
                <img src={SignUp} alt="Sign Up Illustration" />
            </div>
            <div className="input">
                <div className="content">
                    <h1>Welcome!</h1>
                    <h5>Enter details to login.</h5>
                    <form className="form" onSubmit={handleSubmit}>
                        <input type="email" placeholder="Email" required />
                        <div className="password-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                required
                            />
                            <h1 className="toggle" onClick={togglePasswordVisibility}>
                                {showPassword ? 'Hide' : 'Show'}
                            </h1>
                        </div>
                        <h2>Forgot PASSWORD?</h2>
                        <button type="submit">Log in</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;