/** *
 * UserInfo is responsible for setting profileFormPopup data
 *
 * @param nameSelector - nameSelector
 * @param aboutSelector - aboutSelector
 */
export class UserInfo {
    constructor({ nameSelector, aboutSelector }) {
        this.name = document.querySelector(nameSelector);
        this.about = document.querySelector(aboutSelector);
    }

    getUserInfo() {
        return {
            name: this.name.textContent,
            about: this.about.textContent
        };
    }

    setUserInfo({ name, about }) {
        this.name.textContent = name;
        this.about.textContent = about;
    }
}
