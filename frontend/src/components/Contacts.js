import React, { useState } from 'react';

const ContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    return (
        <div>
            <h1>Контакты</h1>
            <div>
                <h3>Контактная информация</h3>
                <p>Адрес: г. Санкт-Петербург, Витебский пр., 13, к. 13</p>
                <p>Телефон: (812) 33-22-000</p>
            </div>

            <div>
                <h3>Форма обратной связи</h3>
                <form>
                    <div>
                        <label>Ваше имя:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Ваш email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Ваше сообщение:</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Отправить сообщение</button>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;
