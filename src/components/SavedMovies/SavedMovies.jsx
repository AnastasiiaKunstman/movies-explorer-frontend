import './SavedMovies.css';
import { useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({ savedMovies, setMovies, setIsLoading, deleteMovie, filteredSavedMovies, setFilteredSavedMovies, errorMessages }) {
    const [isSavedMoviesSearched, setIsSavedMoviesSearched] = useState(false);

    return (
        <>
            <section className='saved-movies'>
                <Header isLogged={true} />
                <SearchForm
                    setMovies={setMovies}
                    movies={savedMovies}
                    setFilteredMovies={setFilteredSavedMovies}
                    setIsLoading={setIsLoading}
                    isSavedMoviesSearched={isSavedMoviesSearched}
                    setIsSavedMoviesSearched={setIsSavedMoviesSearched}
                    errorMessages={errorMessages}
                />
                <MoviesCardList
                    movies={filteredSavedMovies}
                    isSavedMoviesSearched={isSavedMoviesSearched}
                    deleteMovie={deleteMovie}
                />
                <div className='movies__wrapper' />
            </section>
            <Footer />
        </>
    );
};

export default SavedMovies;
