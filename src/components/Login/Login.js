import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import "./Login.scss";

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [identification, setIdentification] = useState('');
    const [name, setName] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://marvel-backend-production-ff25.up.railway.app/users/login', {
                email,
                password,
            });
            const { accessToken } = response.data;
            Cookies.set('accessToken', accessToken);
            onLoginSuccess();
        } catch (error) {
            console.log(error)
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://marvel-backend-production-ff25.up.railway.app/users/register', {
                name,
                email,
                identification,
                password,
            });
            const { accessToken } = response.data;
            Cookies.set('accessToken', accessToken);
            onLoginSuccess();
        } catch (error) {
            console.log(error)
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="login-container">
            {isLogin ? (
                <form className='form' onSubmit={handleLogin}>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg' alt='logo' />
                    <h1 className='text-2xl font-bold'>Inicio de sesión</h1>
                    <input
                        type="email"
                        placeholder='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div className='form-group'>
                        <input
                            id='password'
                            type={showPassword ? "text" : "password"}
                            placeholder='Contraseña'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button className='btn-show' type='button' onClick={toggleShowPassword}>
                            <i id='passIcon' className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                        </button>
                    </div>
                    <button type="submit" className='btn-primary'>Iniciar sesión</button>
                    <div className='toggle-form'>
                        <p>
                            {isLogin ? "¿No tienes una cuenta? " : "¿Ya tienes una cuenta? "}
                            <span onClick={toggleForm} className='toggle-link'>
                                {isLogin ? "Regístrate aquí" : "Inicia sesión aquí"}
                            </span>
                        </p>
                    </div>
                </form>
            ) : (
                <form className='form' onSubmit={handleRegister}>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg' alt='logo' />
                    <h1 className='text-2xl font-bold'>Registro</h1>
                    <input
                        type="text"
                        placeholder='Identificación'
                        value={identification}
                        onChange={(e) => setIdentification(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder='Nombre completo'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div className='form-group'>
                        <input
                            id='password'
                            type={showPassword ? "text" : "password"}
                            placeholder='Contraseña'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button className='btn-show' type='button' onClick={toggleShowPassword}>
                            <i id='passIcon' className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                        </button>
                    </div>
                    <button type="submit" className='btn-primary'>Registrarse</button>
                    <div className='toggle-form'>
                        <p>
                            {isLogin ? "¿No tienes una cuenta? " : "¿Ya tienes una cuenta? "}
                            <span onClick={toggleForm} className='toggle-link'>
                                {isLogin ? "Regístrate aquí" : "Inicia sesión aquí"}
                            </span>
                        </p>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Login;
