const MOVIE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return res.json().then((res) => Promise.reject(`Ошибка: ${res.status}`))
};

export const getMovies = () => {
    return fetch(`${MOVIE_URL}`).then((res) => checkResponse(res));
};
