import { Popup } from './Popup.js';
/** *
 * PopupWithImage is responsible for popup with image opening and closing
 *
 * @param popupSelector - Popup with image selector
 */
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._zoomPopupImage = this._popupElement.querySelector('.popup__image');
        this._zoomPopupParagraph = this._popupElement.querySelector('.popup__description');
    }

    _setZoomPopupContent (data) {
        this._zoomPopupImage.src = data.src;
        this._zoomPopupParagraph.textContent = data.name;
        this._zoomPopupImage.alt = data.name;
    };

    open ({ name, src }) {
        this._setZoomPopupContent({ name, src });
        super.open();
    };
}
