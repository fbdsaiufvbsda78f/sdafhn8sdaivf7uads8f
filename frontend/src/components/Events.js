import React, { useState } from 'react';
import axios from 'axios';

const EventsPage = () => {
    const [token] = useState(localStorage.getItem('token') || null);

    const upcomingEvents = [
        {
            id: 1,
            date: '6 сентября 2024г.',
            title: 'Бизнес-форум группы "ЮНГА".',
            image: '/1681803458_kartinki-pibig-info-p-kartinki-biznes-vstrecha-arti-vkontakte-66.jpg',
        },
        {
            id: 2,
            date: '13 сентября 2024г.',
            title: 'Бизнес-форум, посвященный коммерческим автомобилям в рамках международной выставки коммерческого транспорта и технологий COMVEX 2024.',
            image: '/istockphoto-469696282-612x612.jpg',
        },
        {
            id: 3,
            date: '18 сентября 2024г.',
            title: 'Бизнес-форум, посвященный автомобильному сервису в рамках международной выставки запчастей, послепродажного обслуживания и сервиса CTO EXPO 2024.',
            image: '/orig.webp',
        },
        {
            id: 4,
            date: '20 сентября 2024г.',
            title: '14-ый ежегодный форум «Автомобильный рынок России. Тренды и прогнозы», посвященный итогам автомобильного рынка 2023 года.»',
            image: '/cattouchret.webp',
        },
        {
            id: 5,
            date: '29 сентября 2024г.',
            title: 'VI ежегодный форум, посвященный финансовым инструментам автомобильного рынка. Автокредитование, страхование, лизинг.',
            image: '/BMW-5-Series.-Foto-BMW-e1662627533864-728x410.jpg',
        }
    ];

    const pastEvents = [
        {
            id: 6,
            date: '1 апреля 2024 года',
            title: 'деловой центр «Парк Хуамин» приглашает российских предпринимателей на встречу с представителями компаний из провинции Сычуань.',
            image: '/6d8a2863e40a645e76bce652a447445d.jpeg',
        },
        {
            id: 7,
            date: '29 августа 2024г',
            title: 'Конференция в рамках MIMS Automobility Moscow на тему «Как найти новых партнеров среди поставщиков з/ч?»',
            image: '/grupo-de-pessoas-trabalhando-no-plano-de-negocios-em-um-escritorio_398492-3266.jpg',
        },
    ];

    const handleRegister = (eventId) => {
        if (!token) {
            alert('Авторизуйтесь.');
            return;
        }
        
        try {
            const response = axios.post('http://localhost:5000/api/registerEvent', { token, eventId });
            console.log(response.text)
        }
        catch (error) {
            console.log('error', error)
        }
        alert(`Вы зарегистрированы на мероприятие.`);
    };

    return (
        <div className="events-page container">
            <h1>Мероприятия</h1>

            <section>
                <h2>Предстоящие мероприятия</h2>
                <div className="upcoming-events">
                    {upcomingEvents.map(event => (
                        <div key={event.id} className="event-card">
                            <img src={event.image} alt={event.title} />
                            <h3>{event.title}</h3>
                            <p>{event.date}</p>
                            {token ? (
                                <button onClick={() => handleRegister(event.id)}>Зарегистрироваться</button>
                            ) : (
                                <p>Для регистрации необходимо войти в систему</p>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2>Прошедшие мероприятия</h2>
                <div className="past-events">
                    {pastEvents.map(event => (
                        <div key={event.id} className="event-card">
                            <img src={event.image} alt={event.title} />
                            <h3>{event.title}</h3>
                            <p>{event.date}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default EventsPage;
