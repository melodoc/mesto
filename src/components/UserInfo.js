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
            avatar: this.avatar.src,
        };
    }

    setUserInfo({ name, about, avatar }) {
        this.name.textContent = name;
        this.about.textContent = about;
        this.avatar.src = avatar;
    }
}
