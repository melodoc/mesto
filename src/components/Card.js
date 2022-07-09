/*
Class Card creates a card with text and a link to an image:
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
 * @param templateContent template content
 * @param handleCardClick a popup opening function
 * @param handleCardConfirm a popup confirm function
 * @param handleLikeButton a popup like function
 */
export class Card {
    constructor(cardData, _myId, templateContent, handleCardClick, handleCardConfirm, handleLikeButton) {
        const { name, link, owner, _id: cardId, likes } = cardData;
        this._myId = _myId;

        this.name = name;
        this.link = link;
        this.userId = owner._id;
        this.cardId = cardId;
        // if creating card -- set default like
        this.likes = likes ?? [];
        this.likeCount = likes?.length ?? 0;

        this.templateContent = templateContent;
        this.handleCardClick = handleCardClick;
        this._handleCardConfirm = handleCardConfirm;
        this._handleLikeButton = handleLikeButton;

        this._zoomPopupSelector = '#zoom-img';
        this._activeCardClass = 'card__like-button_state_active';
    }

    _createCardFromTemplate(selector) {
        return this.templateContent.querySelector(selector).cloneNode(true);
    }

    _getCardElements(element, cardSelectors) {
        const { header, image, like, deleteButton, likeButton, likeCount } = cardSelectors;

        return [
            element.querySelector(header),
            element.querySelector(image),
            element.querySelector(like),
            element.querySelector(deleteButton),
            element.querySelector(likeButton),
            element.querySelector(likeCount)
        ];
    }

    createCard(cardSelectors) {
        const cardElement = this._createCardFromTemplate('.card');
        const [header, image, like, deleteButton, likeButton, likeCount] = this._getCardElements(
            cardElement,
            cardSelectors
        );
        const isLikedByMe = this.likes.some((value) => value._id === this._myId);

        header.textContent = this.name;
        image.alt = this.name;
        image.name = this.name;
        image.src = this.link;
        image.id = this.cardId;
        likeCount.textContent = this.likeCount;

        image.addEventListener('click', () => {
            this.handleCardClick({ name: this.name, src: this.link });
        });

        this.userId === this._myId
            ? deleteButton.addEventListener('click', () => {
                  this._handleCardConfirm(this.cardId);
              })
            : (deleteButton.style.display = 'none');

        if (isLikedByMe) {
            likeButton.classList.add(this._activeCardClass);
        }

        like.addEventListener('click', this._handleLikeButton);

        return cardElement;
    }
}
