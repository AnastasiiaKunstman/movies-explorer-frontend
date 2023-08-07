import Movies from "../Movies/Movies";

function SavedMovies({ movies, isSavedMoviesPage }) {
    return (
        <Movies movies={movies} isSavedMoviesPage={isSavedMoviesPage} />
    );
};

export default SavedMovies;