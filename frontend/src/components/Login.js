import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (eee) => {
        eee.preventDefault()
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
            localStorage.setItem('token', response.data.token);
        }
        catch (error) {
            console.log('error', error)
        }
    };

    return (
        <div>
            <h1>Авторизация</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Почта:</label>
                    <input type="text" value={email} onChange={(emailS) => setEmail(emailS.target.value)} required />
                </div>
                <div>
                    <label>Пароль:</label>
                    <input type="text" value={password} onChange={(passwordS) => setPassword(passwordS.target.value)} required />
                </div>
                <button type="submit">Продолжить</button>
            </form>
        </div>
    );
};

export default Login