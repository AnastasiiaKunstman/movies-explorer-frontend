import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { MOVIE_URL, errorMessages } from '../../utils/constans';

function MoviesCardList({
  movies,
  searchError,
  moviesRenderCounter,
  handleSaveMovie,
  deleteMovie,
  likedMovies,
  isAbleToLike,
  setIsActionPending,
  isActionPending,
  isMoviesSearched,
  isSavedMoviesSearched,
}) {

  function getImageLink(movie) {
    return movie.movieId
      ? movie.image
      : MOVIE_URL + movie.image.url
  };

  return (
    <section className='movie-card-list'>
      <ul className='movie-card-list__items'>
          {searchError ? (
            <p className='movies-card-list__error'>{errorMessages.searchError}</p>
          ) : movies?.length === 0 ? (
            <p className='movies-card-list__error'>
              {isMoviesSearched || isSavedMoviesSearched ? errorMessages.notFound : ''}
            </p>
          ) : (
            movies?.slice(0, moviesRenderCounter).map((movie) => (
              <MoviesCard
                isActionPending={isActionPending}
                setIsActionPending={setIsActionPending}
                isAbleToLike={isAbleToLike}
                likedMovies={likedMovies}
                key={movie.description}
                {...movie}
                link={getImageLink(movie)}
                deleteMovie={deleteMovie}
                handleSaveMovie={handleSaveMovie}
              />
            ))
          )}
      </ul>
    </section>
  );
};

export default MoviesCardList;
