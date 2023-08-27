import './MoviesCard.css';
import { formatMovieDuration } from '../../utils/constans';

function MoviesCard({ movie, isSavedMoviesPage, onDelete, onSave, isSaved, link }) {
  const { nameRU, duration, trailerLink } = movie;

  function handleDeleteMovie() {
    onDelete(movie);
  };

  function handleSaveMovie() {
    onSave(movie);
  };

  const getButtonMarkup = () => {
    if (isSaved && !isSavedMoviesPage) {
      return (
        <button
        className='movie-card__btn movie-card__btn_save_active'
        onClick={handleDeleteMovie}
        />
      );
    } else if (isSavedMoviesPage) {
      return (
        <button
        className='movie-card__btn movie-card__btn_remove'
        onClick={handleDeleteMovie}
        />
      );
    }
    return (
      <button
      className='movie-card__btn movie-card__btn_save'
      onClick={handleSaveMovie}
      />
    );
  };

  return (
    <li className='movie-card'>
      <a href={trailerLink} target='_blanck'>
        <img className='movie-card__image' src={link} alt={nameRU} />
      </a>
      <div className='movie-card__desc'>
        <h3 className='movie-card__title'>{nameRU}</h3>
        {getButtonMarkup()}
      </div>
      <p className='movie-card__duration'>{formatMovieDuration(duration)}</p>
    </li>
  );
};

export default MoviesCard;
