import './Profile.css';
import Header from '../Header/Header';
import { React, useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import useForm from '../../hooks/useForm';
import { validateName, validateEmail } from '../../utils/validateInput';

function Profile({ onProfileUpdate, onSignOut, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const [isShowSaveButton, setShowSaveButton] = useState(false);
  const { values, errors, isFormValid, setIsFormValid, setValues, handleChange, formRef } = useForm();

  useEffect(() => {
    setValues((userData) => ({ ...userData, name: currentUser.name, email: currentUser.email }))
  }, [currentUser, setValues]);

  useEffect(() => {
    if (currentUser.name === values.name && currentUser.email === values.email) {
      setIsFormValid(false);
    }
  }, [currentUser, values, setIsFormValid])

  function discardChanges() {
    setValues(currentUser);
  };

  const handleEditButtonClick = () => {
    setShowSaveButton(true);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onProfileUpdate(values);
    if (errors && validateName(values.name).invalid && validateEmail(values.email).invalid) {
      setShowSaveButton(true);
    } else {
      setShowSaveButton(false);
    }
  };

  return (
    <section className='profile'>
      <Header isLogged={true} />
      <main className='profile__wrap'>
        <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>
        <form className='profile__form' onSubmit={handleSubmit} noValidate ref={formRef} >
          <div className='profile__form-item'>
            <div className='profile__input-wrap'>
              <label className='profile__label'>Имя</label>
              <input
                className={`profile__input ${errors.name ? 'error' : ''}`}
                name='name'
                type='text'
                id='name'
                value={values.name || ''}
                onChange={handleChange}
                onFocus={handleEditButtonClick}
                disabled={isLoading}
                required
                placeholder='Имя'
                minLength={2}
                maxLength={30}
              />
            </div>
          </div>
          <span className='profile__error'>{errors.name || validateName(values.name).message}</span>
          <div className='profile__form-item'>
            <div className='profile__input-wrap'>
              <label className='profile__label'>E-mail</label>
              <input
                className={`profile__input ${errors.email ? 'error' : ''}`}
                name='email'
                type='email'
                id='email'
                value={values.email || ''}
                onChange={handleChange}
                onFocus={handleEditButtonClick}
                disabled={isLoading}
                required
                placeholder='E-mail'
              />
            </div>
            <span className='profile__error'>{errors.email || validateEmail(values.email).message}</span>
          </div>
          {isShowSaveButton && !isLoading && (
            <>
              <button type='submit' className='profile__button-save' disabled={!isFormValid || validateName(values.name).invalid || validateEmail(values.email).invalid || (errors.email && 'error')}>
                Сохранить
              </button>
              <button className='profile__button' type='button' onClick={discardChanges}>
                Отмена
              </button>
            </>
          )}
          {!isShowSaveButton && !isLoading && (
            <>
              <button type='button' className='profile__button profile__button_edit' onClick={handleEditButtonClick} >
                Редактировать
              </button>
              <button type='button' className='profile__button profile__button_logout' onClick={onSignOut} >
                Выйти из аккаунта
              </button>
            </>
          )}
        </form>
      </main>
    </section>
  );
};

export default Profile;
