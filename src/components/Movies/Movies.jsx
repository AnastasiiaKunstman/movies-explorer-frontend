import './Movies.css';
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ShowMore from '../ShowMore/ShowMore';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';

const Movies = ({ isLoading, setIsLoading, movies, setMovies, filteredMovies, handleSaveMovie, deleteMovie, setFilteredMovies, likedMovies, setIsActionPending, isActionPending }) => {
    const [responseError, setResponseError] = useState('');
    const [addCards, setaddCards] = useState(0);
    const [isMoviesSearched, setIsMoviesSearched] = useState(false);

    function handleResize() {
        if (window.innerWidth <= 550) {
            setaddCards(5);
        } else if (window.innerWidth <= 1000) {
            setaddCards(8);
        } else setaddCards(12)
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function handleShowAddCards() {
        if (window.innerWidth <= 1000) {
            setaddCards((ddCards) => ddCards + 2);
        } else {
            setaddCards((ddCards) => ddCards + 3);
        }
    };

    return (
        <main className='movies'>
            <Header isLogged={true} />
            <SearchForm
                setMovies={setMovies}
                movies={movies}
                setFilteredMovies={setFilteredMovies}
                setIsLoading={setIsLoading}
                isMoviesSearched={isMoviesSearched}
                setIsMoviesSearched={setIsMoviesSearched}
                setResponseError={setResponseError}
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
                        addCards={addCards}
                    />
                    {filteredMovies?.length > addCards && (
                        <ShowMore onClick={handleShowAddCards} />
                    )}
                </>
            )}
            <Footer />
        </main>
    );
};

export default Movies;
