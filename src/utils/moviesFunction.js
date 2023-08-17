import { SHORT_MOVIE_DURATION } from './constans';

export function formatMovieDuration(duration) {
    if (duration >= 60) {
        const minutes = duration % 60;
        return `${Math.floor(duration / 60)}ч ${minutes > 0 ? minutes + 'м' : ''}`;
    }
    return `${duration}м`;
};
