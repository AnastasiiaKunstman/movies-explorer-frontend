import './MoviesCard.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { formatMovieDuration } from '../../utils/constans';

function MoviesCard({
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
  _id,
  link
}) {

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
  const location = useLocation();
  const isMovieLiked = likedMovies?.some((likedMovie) => likedMovie.movieId === movieData.movieId);
  const [isLiked, setIsLiked] = useState(false);

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

  return (
    <li className='movie-card'>
      <a href={trailerLink} target='_blanck'>
        <img className='movie-card__image' src={link} alt={nameRU} />
      </a>
      <div className='movie-card__desc'>
        <h3 className='movie-card__title'>{nameRU}</h3>
        {location.pathname === '/saved-movies' && (
          <button
            type='button'
            className='movie-card__btn movie-card__btn_remove'
            onClick={() => deleteMovie(movieData._id)}
          />
        )}
        {location.pathname === '/movies' && isLiked && (
          <button
            type='button'
            className='movie-card__btn movie-card__btn_save_active'
            onClick={handleLikeClick}
          />
        )}
        {location.pathname === '/movies' && !isLiked && (
          <button
            type='button'
            className='movie-card__btn movie-card__btn_save'
            onClick={handleLikeClick}
          />
        )}
      </div>
      <p className='movie-card__duration'>{formatMovieDuration(duration)}</p>
    </li>
  );
};

export default MoviesCard;
