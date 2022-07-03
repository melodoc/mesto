export class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    getUserInformation() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: this.headers
        }).then((res) => res.json());
    }

    getCards() {
       return fetch(`${this.baseUrl}/cards`, {
            method: 'GET',
            headers: this.headers
        }).then((res) => res.json());
    }

    getInitialCards() {
        console.info(this.baseUrl, this.headers);
    }
}
