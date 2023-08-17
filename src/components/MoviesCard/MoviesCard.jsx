import './MoviesCard.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard ({
  image,
  duration,
  nameRU,
  country,
  director,
  year,
  description,
  trailerLink,
  id: movieId,
  nameEN,
  handleSaveMovie,
  deleteMovie,
  likedMovies,
  setIsActionPending,
  isActionPending,
  _id, }) {

  const movieData = {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    movieId,
    nameRU,
    nameEN,
    _id,
  };

  const isMovieLiked = likedMovies?.some((likedMovie) => likedMovie.movieId === movieData.movieId);
  const [isLiked, setIsLiked] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLiked(isMovieLiked);
  }, [isMovieLiked]);

  function handleLikeClick() {
    if (isActionPending) {
      return;
    }

    setIsActionPending(true);

    if (!isLiked) {
      handleSaveMovie(movieData);
      setIsLiked(!isLiked);
    } else {
      deleteMovie(movieData.movieId);
      setIsLiked(!isLiked);
    }
  };

  const imgUrl = image.toString().includes('https://api.nomoreparties.co')
    ? image
    : `https://api.nomoreparties.co${image.url}`;


  function formatMovieDuration(duration) {
    if (duration >= 60) {
      const minutes = duration % 60;
      return `${Math.floor(duration / 60)}ч ${minutes > 0 ? minutes + 'м' : ''}`;
    }
    return `${duration}м`;
  };

  const movieDuration = formatMovieDuration(duration);

  return (
    <li className='movie-card'>
      <a href={trailerLink} target='_blanck'>
        <img className='movie-card__image' src={imgUrl} alt={nameRU} />
      </a>
      <div className='movie-card__desc'>
        <h3 className='movie-card__title'>{nameRU}</h3>
        {location.pathname === '/movies' ? (
          <button
            onClick={handleLikeClick}
            className={`movie-card__btn movie-card__btn_save ${isLiked ? 'movie-card__btn movie-card__btn_save_active' : ''}`}
            type='button'
            aria-label='Лайк'></button>
        ) : (
          <button
            onClick={() => deleteMovie(movieData._id)}
            className='movie-card__btn movie-card__btn_remove'
            type='button'
            aria-label='Кнопка удаления'></button>
        )}
      </div>
      <p className='movie-card__duration'>{movieDuration}</p>
    </li>
  );
};

export default MoviesCard;
