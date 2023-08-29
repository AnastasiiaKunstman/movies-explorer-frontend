import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { MOVIE_URL, errorMessages, checkSavedMovie } from '../../utils/constans';

function MoviesCardList({
  movies,
  searchError,
  moviesRenderCounter,
  isMoviesSearched,
  isSavedMoviesSearched,
  savedMovies,
  handleSaveMovie,
  deleteMovie,
  isSavedMoviesPage
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
          <>
            {!isSavedMoviesPage
              ? movies?.slice(0, moviesRenderCounter).map((item) => {
                const saved = checkSavedMovie(savedMovies, item);
                return (
                  <MoviesCard
                    movie={{ ...item, _id: saved?._id }}
                    key={item.id}
                    isSavedMoviesPage={isSavedMoviesPage}
                    link={getImageLink(item)}
                    onDelete={deleteMovie}
                    onSave={handleSaveMovie}
                    isSaved={saved}
                  />
                );
              })
              : movies?.map((item) => {
                const saved = checkSavedMovie(savedMovies, item);
                return (
                  <MoviesCard
                    movie={item}
                    key={item._id}
                    isSavedMoviesPage={isSavedMoviesPage}
                    link={getImageLink(item)}
                    onDelete={deleteMovie}
                    onSave={handleSaveMovie}
                    isSaved={saved}
                  />
                );
              })}
          </>
        )}
      </ul>
    </section>
  );
};

export default MoviesCardList;
