import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const token = localStorage.getItem('token');

    return (
        <nav>
            <ul>
                <li><Link to="/">Главная</Link></li>
                <li><Link to="/events">Мероприятия</Link></li>
                {!token && <li><Link to="/login">Авторизация</Link></li>}
                {!token && <li><Link to="/register">Регистрация</Link></li>}
                <li><Link to="/contacts">Контакты</Link></li>
            </ul>
        </nav>
    );
};

export default Header