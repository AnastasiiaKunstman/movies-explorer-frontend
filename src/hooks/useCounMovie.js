import { useEffect, useState } from 'react';
import { SCREEN_BIG, SCREEN_MEDIUM } from '../utils/constans';

const useCountMovies = (dependency) => {
    const [moviesRenderCounter, setMoviesRenderCounter] = useState(0);
    const [moviesAddCounter, setMoviesAddCounter] = useState(0);

    const screenWidth = window.screen.width;

    useEffect(() => {
        if (screenWidth >= SCREEN_BIG) {
            setMoviesRenderCounter(16);
            setMoviesAddCounter(4);
        } else if (screenWidth >= SCREEN_MEDIUM && screenWidth < SCREEN_BIG) {
            setMoviesRenderCounter(8);
            setMoviesAddCounter(2);
        } else if (screenWidth < SCREEN_MEDIUM) {
            setMoviesRenderCounter(5);
            setMoviesAddCounter(2);
        }
    }, [screenWidth, dependency]);

    const handleShowAddCards = () => {
        setMoviesRenderCounter(moviesRenderCounter + moviesAddCounter);
    };

    return { handleShowAddCards, moviesRenderCounter };
};

export default useCountMovies;
