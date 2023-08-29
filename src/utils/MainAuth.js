class MainAuth {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return res.json().then((res) => Promise.reject(`Ошибка: ${res.status}`))
    };

    //Регистрация
    register({ name, email, password }) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({ name, email, password })
        })
            .then(this._checkResponse)
    }

    //Вход
    login({ email, password }) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({ email, password })
        })
            .then(this._checkResponse)
            .then((data) => {
                if (data) {
                    localStorage.setItem('token', 'isLoggedIn');
                    return data;
                }
            });
    }

    //Выход
    logout() {
        return fetch(`${this._baseUrl}/signout`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
        })
            .then(this._checkResponse)
    }
};

const auth = new MainAuth({
    baseUrl: 'https://api.diplom.akunstman.nomoredomains.xyz',
    headers: {
        accept: 'application/json',
        'content-Type': 'application/json'
    },
});

export default auth;
