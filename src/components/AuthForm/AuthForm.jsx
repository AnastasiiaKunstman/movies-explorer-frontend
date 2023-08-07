import './AuthForm.css';
import logo from '../../images/logo.svg'
import { Link } from 'react-router-dom';
import { useState } from 'react';

function AuthForm({ type, text }) {

    const [errorMessage, seteErorMessage] = useState({ name: '', email: '', password: '' });
    const [inputValue, setinputValue] = useState({ name: '', email: '', password: '' });

    const handleChange = (evt) => {
        const { value, name, validationMessage } = evt.target;
        setinputValue({ ...inputValue, [name]: value });
        seteErorMessage({ ...errorMessage, [name]: validationMessage });
    };

    const signupFormMarkup = () => {
        if (type === 'signup') {
            return (
                <div className='auth__form-item'>
                    <label className='auth__label'>Имя</label>
                    <input
                        className={`auth__input ${errorMessage.name ? 'error' : ''}`}
                        name='name'
                        type='text'
                        value={inputValue.name}
                        onChange={handleChange}
                        required
                    />
                    <span className='auth__error'>{errorMessage.name}</span>
                </div>
            )
        }
    };

    return (
        <main className='auth'>
            <Link to='/'>
                <img className='auth__logo' src={logo} alt='Логотип' />
            </Link>
            <h1 className='auth__title'>{text.title}</h1>
            {signupFormMarkup()}
            <div className='auth__form-item'>
                <label className='auth__label'>E-mail</label>
                <input
                    className={`auth__input ${errorMessage.email ? 'error' : ''}`}
                    name='email'
                    type='email'
                    value={inputValue.email}
                    onChange={handleChange}
                    required
                />
                <span className='auth__error'>{errorMessage.email}</span>
            </div>
            <div className='auth__form-item'>
                <label className='auth__label'>Пароль</label>
                <input
                    className={`auth__input ${errorMessage.password ? 'error' : ''}`}
                    name='password'
                    type='password'
                    value={inputValue.password}
                    onChange={handleChange}
                    required
                />
                <span className='auth__error'>{errorMessage.password}</span>
            </div>
            <div className='auth__buttons'>
                <button className='auth__btn' type='submit'>{text.buttonText}</button>
                <p className='auth__question'>{text.questText}
                    {
                        type === 'signup'
                            ? (<Link className='auth__link' to='/signin'>Войти</Link>)
                            : (<Link className='auth__link' to='/signup'>Регистрация</Link>)
                    }
                </p>
            </div>
        </main>
    )
};

export default AuthForm;