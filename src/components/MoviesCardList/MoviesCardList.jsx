import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  movies,
  searchError,
  addCards,
  handleSaveMovie,
  deleteMovie,
  likedMovies,
  isAbleToLike,
  setIsActionPending,
  isActionPending,
  isMoviesSearched,
  isSavedMoviesSearched,
}) {

  return (
    <section className='movie-card-list'>
      <ul className='movie-card-list__items'>
          {searchError ? (
            <p className='movies-card-list__error'>{searchError}</p>
          ) : movies?.length === 0 ? (
            <p className='movies-card-list__error'>
              {isMoviesSearched || isSavedMoviesSearched ? 'Ничего не найдено' : ''}
            </p>
          ) : (
            movies?.slice(0, addCards).map((movie) => (
              <MoviesCard
                isActionPending={isActionPending}
                setIsActionPending={setIsActionPending}
                isAbleToLike={isAbleToLike}
                likedMovies={likedMovies}
                key={movie.description}
                {...movie}
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
