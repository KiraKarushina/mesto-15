import { myID } from "./constants.js";

class Api {
  constructor({ userID, group, url }) {
    return (this._userID = userID), (this._group = group), (this._url = url);
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getCards() {
    return fetch(`${this._url}/${this._group}/cards`, {
      headers: {
        authorization: this._userID,
      },
    }).then((response) => {
      return this._getResponseData(response);
    });
  }

  getProfile() {
    return fetch(`${this._url}/${this._group}/users/me`, {
      headers: {
        authorization: this._userID,
      },
    }).then((response) => {
      return this._getResponseData(response);
    });
  }

  updateProfile({ name, about }) {
    return fetch(`${this._url}/${this._group}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._userID,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((response) => {
      return this._getResponseData(response);
    });
  }

  addCard({ name, link }) {
    return fetch(`${this._url}/${this._group}/cards`, {
      method: "POST",
      headers: {
        authorization: this._userID,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((response) => {
      return this._getResponseData(response);
    });
  }

  deleteCard(id) {
    return fetch(`${this._url}/${this._group}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._userID,
      },
    }).then((response) => {
      return this._getResponseData(response);
    });
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.addLike(id);
    } else {
      return this.deleteLike(id);
    }
  }

  addLike(id) {
    return fetch(`${this._url}/${this._group}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._userID,
      },
    }).then((response) => {
      return this._getResponseData(response);
    });
  }

  deleteLike(id) {
    return fetch(`${this._url}/${this._group}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._userID,
      },
    }).then((response) => {
      return this._getResponseData(response);
    });
  }

  updateAvatar(link) {
    return fetch(`${this._url}/${this._group}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._userID,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((response) => {
      return this._getResponseData(response);
    });
  }
}

const api = new Api({
  userID: myID,
  group: "cohort-55",
  url: "https://backend.nomoredomains.monster",
});

export default api;
