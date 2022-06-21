import { Popup } from './Popup.js';
/** *
 * PopupWithImage is responsible for popup with image opening and closing
 *
 * @param popupSelector - Popup with image selector
 */
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._zoomPopup = document.querySelector(this.popupSelector);
        this._zoomPopupImage = this._zoomPopup.querySelector('.popup__image');
        this._zoomPopupParagraph = this._zoomPopup.querySelector('.popup__description');
        this._zoomPopupImageSelector = '.popup__image';
        this._setZoomPopupContent = this._setZoomPopupContent.bind(this);
    }

    _setZoomPopupContent (data) {
        this._zoomPopupImage.src = data.src;
        this._zoomPopupParagraph.textContent = data.name;
        this._zoomPopupImage.alt = data.name;
    };

    open (element, { name, src }) {
        this._setZoomPopupContent({ name, src });
        super.open(element);
    };
}
