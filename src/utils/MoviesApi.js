import { MOVIE_URL } from "./constans";

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return res.json().then((res) => Promise.reject(`Ошибка: ${res.status}`))
};

export const getMovies = () => {
    return fetch(`${MOVIE_URL}/beatfilm-movies`).then((res) => checkResponse(res));
};
