export class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
        this._methods = {
            GET: 'GET',
            POST: 'POST',
            DELETE: 'DELETE',
            PUT: 'PUT',
            PATCH: 'PATCH'
        };
    }

    _fetchHandle(method, path, options) {
        return fetch(`${this.baseUrl}${path}`, {
            method,
            headers: this.headers,
            body: JSON.stringify(options)
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    getUserInformation() {
        return this._fetchHandle(this._methods.GET, '/users/me');
    }

    getCards() {
        return this._fetchHandle(this._methods.GET, '/cards');
    }

    editProfile(name, about) {
        return this._fetchHandle(this._methods.PATCH, '/users/me', {
            name,
            about
        });
    }

    addNewCard(name, link) {
        return this._fetchHandle(this._methods.POST, '/cards', {
            name,
            link
        });
    }

    deleteCardById(cardId) {
        return this._fetchHandle(this._methods.DELETE, `/cards/${cardId}`);
    }

    setLikeById(cardId) {
        return this._fetchHandle(this._methods.PUT, `/cards/${cardId}/likes`);
    }

    deleteLikeById(cardId) {
        return this._fetchHandle(this._methods.DELETE, `/cards/${cardId}/likes`);
    }

    updateUserAvatar(avatar) {
        return this._fetchHandle(this._methods.PATCH, `/users/me/avatar`, { avatar });
    }
}
