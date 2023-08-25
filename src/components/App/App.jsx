import './App.css';
import { Route, Routes, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { IsLoggedContext } from '../../context/IsLoggedContext';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import NotFoundError from '../NotFoundError/NotFoundError';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { errorMessages, successMessages, JWT_TOKEN } from '../../utils/constans';

import api from '../../utils/MainApi';
import auth from '../../utils/MainAuth';
import { getMovies } from '../../utils/MoviesApi';

function App() {
  const [isLogged, setIsLogged] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [likedMovies, setLikedMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [isActionPending, setIsActionPending] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  //Ошибки
  function handleSuccessMessage(text) {
    setErrorMessage('');
    setSuccessMessage(text);
    setIsTooltipOpen(true);
  };

  function handleErrorMessage(text) {
    setSuccessMessage('');
    setErrorMessage(text);
    setIsTooltipOpen(true);
  };

  // Проверка токена
  useEffect(() => {
    checkToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged])

  function checkToken() {
    const path = location.pathname;
    try {
      const token = localStorage.getItem(JWT_TOKEN);

      if (token) {
        api.getUserInfo()
          .then((userData) => {
            setCurrentUser(userData);
            setIsLogged(true);
            if (path !== '/signin') {
              navigate(path);
            }
            api.getSavedMovies()
              .then((savedMoviesData) => {
                setSavedMovies(savedMoviesData);
              })
              .catch(err => console.error(err));
          })
          .catch(err => console.error(err));
      }
    } catch (err) {
      console.error(err);
    }
  };

  //Регистраци
  function onRegister(values) {
    const { name, email, password } = values;
    auth.register({ name, email, password })
      .then(() => onLogin({ email, password }))
      .catch(() => handleErrorMessage(errorMessages.emailExists))
  };

  //Вход
  function onLogin(values) {
    const { email, password } = values;
    auth.login({ email, password })
      .then(() => {
        setIsLogged(true);
        handleSuccessMessage(
          location.pathname === '/signup' ? successMessages.register : successMessages.login,
        );
        navigate('/movies');
      })
      .catch(() => {
        setIsLogged(false);
        handleErrorMessage(errorMessages.falseNameOrPass);
      })
  };

  // Обработчик выхода из приложения
  function onSignOut() {
    if (isLogged) {
      auth.logout()
        .then(() => {
          setIsLogged(false);
          setCurrentUser({});
          setSavedMovies([]);
          setFilteredMovies([]);
          localStorage.clear();
          navigate('/');
          handleSuccessMessage(successMessages.logout)
        })
        .catch(err => console.log(err))
    }
  };

  // Обновить информацию о пользователе
  function handleUpadteUserInfo(values) {
    const { name, email } = values;
    api.updateUser(name, email)
      .then((res) => {
        setCurrentUser(res)
        handleSuccessMessage(successMessages.editProfile);
      })
      .catch(() => handleErrorMessage(errorMessages.emailExists))
  };

  //Получить фильмы из БД
  function showMovieSearch() {
    setIsLoading(true);
    getMovies()
      .then((res) => {
        setMovies(res);
      })
      .catch(() => handleErrorMessage(errorMessages.searchError))
      .finally(() => setIsLoading(false))
  };

  // Сохранить фильм
  function handleSaveMovie(movieData) {
    api.saveMovie(movieData)
      .then((res) => {
        setSavedMovies([...savedMovies, res]);
        setIsActionPending(false);
      })
      .catch((err) => {
        console.log(err);
        setIsActionPending(false);
      });
  };

  // Удалить фильм
  function handleDeleteMovie(id) {
    api.deleteMovie(id)
      .then((res) => {
        setSavedMovies((savedMovies) =>
          savedMovies.filter((savedMovie) => savedMovie._id !== res._id),
        );
        setIsActionPending(false);
        handleSuccessMessage(successMessages.remuveMovie);
      })
      .catch((err) => {
        console.log(err);
        setIsActionPending(false);
      });
  };

  const deleteSavedMovie = (movieId) => {
    if (movieId.length === 24) {
      handleDeleteMovie(movieId);

      return;
    }
    const movieToDelete = savedMovies.find((savedMovie) => savedMovie.movieId === movieId);
    handleDeleteMovie(movieToDelete._id);
  };

  function getSavedMovies() {
    if (isLogged) {
      api.getSavedMovies()
        .then((res) => {
          setSavedMovies(res);
          const likedMoviesAndUndef = filteredMovies.map((filteredMovie) => {
            return res.find((savedMovie) => savedMovie.movieId === filteredMovie.id);
          });
          const likedMovies = likedMoviesAndUndef.filter((item) => item !== undefined);
          setLikedMovies(likedMovies);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    getSavedMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredMovies, isLogged]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <IsLoggedContext.Provider value={isLogged}>
        <div className='page'>
          <Routes>
            <Route path='/' element={<Main isLogged={isLogged} />} />
            <Route
              path='/movies'
              element={
                <ProtectedRoute
                  element={Movies}
                  isLogged={isLogged}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  isActionPending={isActionPending}
                  setIsActionPending={setIsActionPending}
                  filteredMovies={filteredMovies}
                  setMovies={setMovies}
                  setFilteredMovies={setFilteredMovies}
                  movies={movies}
                  likedMovies={likedMovies}
                  savedMovies={savedMovies}
                  deleteMovie={deleteSavedMovie}
                  handleSaveMovie={handleSaveMovie}
                  errorMessages={errorMessages}
                  showMovieSearch={showMovieSearch}
                />
              }
            />
            <Route
              path='/saved-movies'
              element={
                <ProtectedRoute
                  element={SavedMovies}
                  isLogged={isLogged}
                  setIsLoading={setIsLoading}
                  filteredSavedMovies={filteredSavedMovies}
                  setFilteredSavedMovies={setFilteredSavedMovies}
                  setMovies={setSavedMovies}
                  savedMovies={savedMovies}
                  deleteMovie={deleteSavedMovie}
                  errorMessages={errorMessages}
                />
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRoute
                  element={Profile}
                  isLogged={isLogged}
                  isLoading={isLoading}
                  onProfileUpdate={handleUpadteUserInfo}
                  onSignOut={onSignOut}
                />
              }
            />
            <Route path='/signin' element={isLogged ? <Navigate to='/' /> : <Login onLogin={onLogin} />} />
            <Route path='/signup' element={isLogged ? <Navigate to='/' /> : <Register onRegister={onRegister} />} />
            <Route path='/*' element={<NotFoundError />} />
          </Routes>
          <InfoTooltip
            isOpen={isTooltipOpen}
            onClose={() => setIsTooltipOpen(false)}
            errorMessage={errorMessage}
            successMessage={successMessage}
          />
        </div>
      </IsLoggedContext.Provider>
    </CurrentUserContext.Provider >
  )
};


export default App;
