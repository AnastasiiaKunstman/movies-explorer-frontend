import './MoviesCard.css';

function MoviesCard({ movie, isSavedMoviesPage }) {
    function formatMovieDuration(duration) {
        if (duration >= 60) {
            const minutes = duration % 60;
            return `${Math.floor(duration / 60)}ч ${minutes > 0 ? minutes + 'м' : ''}`
        }
        return `${duration}м`
    };

    const { nameRU, image, duration, saved } = movie;
    const formatedDuration = formatMovieDuration(duration);

    const buttonClass = () => {
        if (saved && !isSavedMoviesPage) {
            return 'movie-card__btn_saved'
        }
        else if (isSavedMoviesPage) {
            return 'movie-card__btn_remove'
        }
        return 'movie-card__btn_save';
    };

    return (
        <li className='movie-card'>
            <img className='movie-card__image' src={image} alt={nameRU} />
            <div className='movie-card__desc'>
                <h3 className='movie-card__title'>{nameRU}</h3>
                <button className={`movie-card__btn ${buttonClass()}`} />
            </div>
            <p className='movie-card__duration'>{formatedDuration}</p>
        </li>
    );
};

export default MoviesCard;