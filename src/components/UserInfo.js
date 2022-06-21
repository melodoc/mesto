/** *
 * UserInfo is responsible for setting profileFormPopup data
 *
 * @param nameInputSelector - nameInputSelector
 * @param aboutInputSelector - aboutInputSelector
 */
export class UserInfo {
    constructor(nameInputSelector, aboutInputSelector) {
        this.nameInputSelector = document.querySelector(nameInputSelector);
        this.aboutInputSelector = document.querySelector(aboutInputSelector);
    }

    getUserInfo() {
        const userInfo = {
            name: this.nameInputSelector.value,
            about: this.aboutInputSelector.value,
        };
        return userInfo;
    }

    setUserInfo(data) {
        this.nameInputSelector.setAttribute('value', data.name);
        this.aboutInputSelector.setAttribute('value', data.about);
    }
}
