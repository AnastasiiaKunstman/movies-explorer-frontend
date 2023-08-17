import './Profile.css';
import Header from '../Header/Header';
import { React, useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import useForm from '../../hooks/useForm';

function Profile({ onProfileUpdate, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const [readOnly, setReadOnly] = useState(true);
  const [profileChanged, setProfileChanged] = useState(false);
  const { values, errors, isFormValid, setValues, handleChange, formRef } = useForm();

  useEffect(() => {
    setValues(currentUser);
  }, [setValues, currentUser]);

  useEffect(() => {
    if (
      currentUser.name === values.name &&
      currentUser.email === values.email
    ) {
      return setProfileChanged(false);
    }
    return setProfileChanged(true);
  }, [currentUser, values]);

  function handleProfileSubmit(evt) {
    evt.preventDefault();
    onProfileUpdate(values);
    setReadOnly(true);
    setProfileChanged(false);
  };

  function toggleProfileReadOnlyChange() {
    setReadOnly(!readOnly);
  };

  function discardChanges() {
    setReadOnly(true);
    setValues(currentUser);
  };

  const buttonsMarkup = () => {
    if (readOnly) {
      return (
        <>
          <button className='profile__button profile__button_edit' onClick={toggleProfileReadOnlyChange} type='button'>
            Редактировать
          </button>
          <button className='profile__button profile__button_logout' onClick={onSignOut} type='button'>
            Выйти из аккаунта
          </button>
        </>
      );
    }
    return (
      <>
        <button
          className='profile__button-save'
          disabled={!(profileChanged && isFormValid)}
          type='submit'
        >
          Сохранить
        </button>
        <button
          className='profile__button'
          type='button'
          onClick={discardChanges}
        >
          Отмена
        </button>
      </>
    );
  };

  return (
    <section className='profile'>
      <Header isLogged={true} />
      <main className='profile__wrap'>
        <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>
        <form className='profile__form' onSubmit={handleProfileSubmit} noValidate ref={formRef} >
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
                disabled={readOnly}
                required
                placeholder='Имя'
              />
            </div>
            <span className='profile__error'>{errors.name}</span>
          </div>
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
                disabled={readOnly}
                required
                placeholder='E-mail'
              />
            </div>
            <span className='profile__error'>{errors.email}</span>
          </div>
          {buttonsMarkup()}
        </form>
      </main>
    </section>
  );
};

export default Profile;
