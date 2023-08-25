export const MOVIE_URL = 'https://api.nomoreparties.co';
export const SHORT_MOVIE_DURATION = 40;

export const SCREEN_BIG = 1280;
export const SCREEN_MEDIUM = 768;
export const SCREEN_SMALL = 480;

export const JWT_TOKEN = 'token';

export const regExpName = /^[А-ЯA-Zё\s-]+$/imu;
export const regExpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i;

export const errorMessages = {
    emailExists: 'Пользователь с таким email уже существует.',
    falseNameOrPass: 'Неправильный логин или пароль.',
    failedToEditProfile: 'Не удалось обновить данные.',
    errInputEmail: 'Неверный формат почты',
    errInputName: 'Имя может содержать только латиницу, кириллицу, пробел или дефис',
    inputError: 'Нужно ввести ключевое слово',
    searchError: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
    notFound: 'Ничего не найдено.',
};

export const successMessages = {
    register: 'Регистрация прошла успешно!',
    login: 'Вы вошли в свой аккаунт!',
    editProfile: 'Информация обновлена!',
    logout: 'Вы вышли из аккаунта',
    remuveMovie: 'Фильм удален из избранных',
    saveMovie: 'Фильм добавлен в избранные',
};

export const formatMovieDuration = (duration) => {
    if (duration >= 60) {
        const minutes = duration % 60;
        return `${Math.floor(duration / 60)}ч ${minutes > 0 ? minutes + 'м' : ''}`;
    }
    return `${duration}м`;
};
