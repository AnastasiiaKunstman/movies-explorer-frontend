import './Movies.css';
import { useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ShowMore from '../ShowMore/ShowMore';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';
import useScreenWidth from '../../hooks/useScreenWidth';
import useCountMovies from '../../hooks/useCounMovie';

const Movies = ({ isLoading, movies, setMovies, filteredMovies, handleSaveMovie, deleteMovie, setFilteredMovies, likedMovies, setIsActionPending, isActionPending, errorMessages, showMovieSearch }) => {
    const [responseError, setResponseError] = useState('');
    const [isMoviesSearched, setIsMoviesSearched] = useState(false);
    const orientation = useScreenWidth();
    const { moviesRenderCounter, handleShowAddCards } = useCountMovies(orientation);

    return (
        <main className='movies'>
            <Header isLogged={true} />
            <SearchForm
                setMovies={setMovies}
                movies={movies}
                setFilteredMovies={setFilteredMovies}
                isMoviesSearched={isMoviesSearched}
                setIsMoviesSearched={setIsMoviesSearched}
                setResponseError={setResponseError}
                errorMessages={errorMessages}
                showMovieSearch={showMovieSearch}
            />
            {isLoading ? (
                <Preloader />
            ) : (
                <>
                    <MoviesCardList
                        deleteMovie={deleteMovie}
                        handleSaveMovie={handleSaveMovie}
                        responseError={responseError}
                        isMoviesSearched={isMoviesSearched}
                        isActionPending={isActionPending}
                        setIsActionPending={setIsActionPending}
                        likedMovies={likedMovies}
                        movies={filteredMovies}
                        setMovies={setMovies}
                        moviesRenderCounter={moviesRenderCounter}
                    />
                    <div className='movies__wrapper'>
                        {filteredMovies?.length > moviesRenderCounter && (
                            <ShowMore onClick={handleShowAddCards} />
                        )}
                    </div>
                </>
            )}
            <Footer />
        </main>
    );
};

export default Movies;
