import './SearchForm.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import useMoviesFilter from '../../hooks/useMoviesFilter';
import Checkbox from '../Checkbox/Checkbox';

function SearchForm({ setMovies, movies, setFilteredMovies, isMoviesSearched, setIsMoviesSearched, isSavedMoviesSearched, setIsSavedMoviesSearched, errorMessages, showMovieSearch }) {
    const location = useLocation();
    const [isChecked, setIsChecked] = useState(false);
    const { values, handleChange, isFormValid, errors, formRef } = useForm();
    const { filteredMovies } = useMoviesFilter(movies, values.film, isChecked);

    useEffect(() => {
        if (location.pathname === '/saved-movies' && isSavedMoviesSearched) {
            setFilteredMovies(filteredMovies);
        } else if (location.pathname === '/saved-movies') {
            setFilteredMovies(movies);
        }
    }, [filteredMovies, setFilteredMovies, location, isSavedMoviesSearched, movies]);

    useEffect(() => {
        if (isMoviesSearched && location.pathname === '/movies') {
            localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
            localStorage.setItem('isChecked', isChecked);
            localStorage.setItem('filmQuery', values.film);
        }
    }, [filteredMovies, isChecked, values.film, isMoviesSearched, location]);

    useEffect(() => {
        if (location.pathname === '/movies') {
            const filtredMoviesFromLS =
                localStorage.getItem('filteredMovies') === 'undefined' ||
                    localStorage.getItem('filteredMovies') === []
                    ? []
                    : JSON.parse(localStorage.getItem('filteredMovies'));
            const isCheckedFromLS = localStorage.getItem('isChecked') === 'true';
            const filmQueryFromLS = localStorage.getItem('filmQuery');

            if (filmQueryFromLS) {
                setFilteredMovies(filtredMoviesFromLS);
                setIsChecked(isCheckedFromLS);
                handleChange({ target: { name: 'film', value: filmQueryFromLS } });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredMovies, setFilteredMovies, location]);


    function showSavedMovieSearch() {
        setMovies((savedMovies) => [...savedMovies]);
        setIsSavedMoviesSearched(true);
    };

    function handleSubmit(evt) {
        evt.preventDefault();
        if (location.pathname === '/movies') {
            showMovieSearch();
            setIsMoviesSearched(true);
            return;
        }
        showSavedMovieSearch();
    };

    function toggleCheckbox() {
        if (isFormValid && location.pathname === '/movies') {
            setIsChecked(!isChecked);
            showMovieSearch();
            setIsMoviesSearched(true);
        } else if (movies.length !== 0) {
            setIsChecked(!isChecked);
            showSavedMovieSearch();
        } else {
            setIsChecked(!isChecked);
        }
    };

    return (
        <section className='search'>
            <form className='search__form' onSubmit={handleSubmit} noValidate ref={formRef} >
                <span className='search__icon' />
                <div className='search__input-wrap'>
                    <input
                        className='search__input'
                        id='input'
                        name='film'
                        type='text'
                        placeholder='Фильм'
                        required
                        value={values.film || ''}
                        onChange={handleChange}
                    />
                    <button className='search__button' type='submit' disabled={!isFormValid}>Найти</button>
                </div>
                <Checkbox isChecked={isChecked} toggleCheckbox={toggleCheckbox} />
            </form>
            <span className={`search__input-error ${errors.film && 'search__input-error_visible'}`}>{errorMessages.inputError}</span>
            <hr />
        </section>
    )
};

export default SearchForm;
