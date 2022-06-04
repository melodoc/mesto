/*
Card creates a card with text and a link to an image:
     + takes its data and the selector of its template element into the constructor;
     + contains private methods that work with markup, set event listeners;
     + contains private methods for each handler;
     + contains one public method that returns a fully functional and data-filled card element.
*/
/**
 * A cardData object
 * @typedef {Object} cardData
 * @property {string} name - The card title
 * @property {string} link - The link to the image
 */
/** *
 * creates Card from {@link cardData} with text and a link to an image
 *
 * @param {cardData} cardData - The {@link cardData} to be created
 * @param templateSelector template content
 * @param openPopup a popup opening function
 */
export class Card {
    constructor(cardData, templateSelector, openPopup) {
        this.cardData = cardData;
        this.templateSelector = templateSelector;
        this.openPopup = openPopup;

        this._zoomPopupSelector = '#zoom-img';
        this._zoomPopupImageSelector = '.popup__image';
        this._zoomPopupParagraphSelector = '.popup__description';
    }

    _getZoomPopUp() {
        return document.querySelector(this._zoomPopupSelector);
    }

    _getZoomPopUpImage() {
        const zoomPopup = this._getZoomPopUp();
        return zoomPopup.querySelector(this._zoomPopupImageSelector);
    }

    _getZoomPopUpParagraph() {
        const zoomPopup = this._getZoomPopUp();
        return zoomPopup.querySelector(this._zoomPopupParagraphSelector);
    }

    _handleLikeButton(evt) {
        evt.target.classList.toggle('card__like-button_state_active');
    }

    _handleDeleteButton(evt) {
        const cardElement = evt.target.closest('.card');
        cardElement.remove();
    }

    _setZoomPopupContent(data) {
        const zoomPopupImage = this._getZoomPopUpImage();
        const zoomPopupParagraph = this._getZoomPopUpParagraph();

        zoomPopupImage.src = data.src;
        zoomPopupParagraph.textContent = data.name;
        zoomPopupImage.alt = data.name;
    }

    _createCardFromTemplate(selector) {
        return this.templateSelector.querySelector(selector).cloneNode(true);
    }

    _getCardElements(element, cardSelectors) {
        const { header, image, like, deleteButton } = cardSelectors;

        return [
            element.querySelector(header),
            element.querySelector(image),
            element.querySelector(like),
            element.querySelector(deleteButton)
        ];
    }

    createCard(cardSelectors) {
        const card = this.cardData;
        const cardElement = this._createCardFromTemplate('.card');
        const [header, image, like, deleteButton] = this._getCardElements(cardElement, cardSelectors);
        const { name, link } = card;

        header.textContent = name;
        image.alt = name;
        image.name = name;
        image.src = link;

        const zoomPopup = this._getZoomPopUp();

        image.addEventListener('click', () => {
            this.openPopup(zoomPopup);
            this._setZoomPopupContent({ name: name, src: link });
        });

        like.addEventListener('click', this._handleLikeButton);
        deleteButton.addEventListener('click', this._handleDeleteButton);

        return cardElement;
    }
}
