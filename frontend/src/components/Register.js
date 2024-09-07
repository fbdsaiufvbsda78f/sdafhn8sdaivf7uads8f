import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (eee) => {
        eee.preventDefault()
        try {
            const response = await axios.post('http://localhost:5000/api/register', { name, email, password });
            localStorage.setItem('token', response.data.token);
        }
        catch (error) {
            console.log('error',error)
        }
    };

    return (
        <div>
            <h1>Регистрация</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Имя:</label>
                    <input type="text" value={name} onChange={(eee) => setName(eee.target.value)} required />
                </div>
                <div>
                    <label>Почта:</label>
                    <input type="text" value={email} onChange={(eee) => setEmail(eee.target.value)} required />
                </div>
                <div>
                    <label>Пароль:</label>
                    <input type="text" value={password} onChange={(eee) => setPassword(eee.target.value)} required />
                </div>
                <button type="submit">Продолжить</button>
            </form>
        </div>
    );
};

export default Register