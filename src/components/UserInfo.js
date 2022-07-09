import { loadingState } from '../constants/constants.js';
/** *
 * UserInfo is responsible for setting profileFormPopup data
 *
 * @param nameSelector - nameSelector
 * @param aboutSelector - aboutSelector
 * @param avatarSelector - avatarSelector
 */
export class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelector }) {
        this.name = document.querySelector(nameSelector);
        this.about = document.querySelector(aboutSelector);
        this.avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this.name.textContent,
            about: this.about.textContent,
            avatar: this.avatar.src
        };
    }

    setUserInfo({ name, about, avatar }) {
        this.name.textContent = name ?? loadingState.text;
        this.about.textContent = about ?? loadingState.text;
        this.avatar.src = avatar ?? loadingState.img;
    }

    setUserAvatar(avatar) {
        this.avatar.src = avatar ?? loadingState.img;
    }

    setUserNameInfo({ name, about }) {
        this.name.textContent = name ?? loadingState.text;
        this.about.textContent = about ?? loadingState.text;
    }
}
