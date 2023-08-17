import './AuthForm.css';
import logo from '../../images/logo.svg'
import { Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';

function AuthForm({ type, text, onSubmitForm }) {

    const { values, errors, isFormValid, handleChange, resetForm, formRef } = useForm();

    const signupForm = () => {
        if (type === 'signup') {
            return (
                <div className='auth__form-item'>
                    <label className='auth__label'>Имя</label>
                    <input
                        className={`auth__input ${errors.name ? 'error' : ''}`}
                        name='name'
                        type='name'
                        value={values.name || ''}
                        onChange={handleChange}
                        required
                        minLength={2}
                        maxLength={30}
                    />
                    <span className='auth__error'>{errors.name}</span>
                </div>
            )
        }
    };

    function handleSubmit(evt) {
        evt.preventDefault();
        onSubmitForm(values);
        resetForm();
    };

    return (
        <>
            <form className='auth' onSubmit={handleSubmit} noValidate ref={formRef}>
                <Link to='/'>
                    <img className='auth__logo' src={logo} alt='Логотип' />
                </Link>
                <h1 className='auth__title'>{text.title}</h1>
                {signupForm()}
                <div className='auth__form-item'>
                    <label className='auth__label'>E-mail</label>
                    <input
                        className={`auth__input ${errors.email ? 'error' : ''}`}
                        name='email'
                        type='email'
                        value={values.email || ''}
                        onChange={handleChange}
                        required
                    />
                    <span className='auth__error'>{errors.email}</span>
                </div>
                <div className='auth__form-item'>
                    <label className='auth__label'>Пароль</label>
                    <input
                        className={`auth__input ${errors.password ? 'error' : ''}`}
                        name='password'
                        type='password'
                        value={values.password || ''}
                        onChange={handleChange}
                        required
                        minLength={6}
                        maxLength={30}
                    />
                    <span className='auth__error'>{errors.password}</span>
                </div>
                <div className='auth__buttons'>
                    <button className='auth__btn' type='submit' disabled={!isFormValid}>{text.buttonText}</button>
                    <p className='auth__question'>{text.questText}
                        {
                            type === 'signup'
                                ? (<Link className='auth__link' to='/signin'>Войти</Link>)
                                : (<Link className='auth__link' to='/signup'>Регистрация</Link>)
                        }
                    </p>
                </div>
            </form>
        </>
    )
};

export default AuthForm;
