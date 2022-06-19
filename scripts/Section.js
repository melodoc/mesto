/*
The Class Section receives the markup via a callback function and inserts it into the container.
Contains public methods:
     + render, which is responsible for rendering all elements
     + addItem which takes a DOM element and adds it to the container
*/
/**
 * A sectionData object
 * @typedef {Object} sectionData
 * @property {string} items - An array of data to be added to the page when the class is initialized
 * @property {string} renderer - The function that is responsible for creating and rendering data on the page
 */
/** *
 * Section is responsible for rendering elements on the page from {@link sectionData}
 *
 * @param {sectionData} sectionData - The {@link sectionData} to be created
 * @param containerSelector - Container selector in which to add generated elements
 */
export class Section {
    constructor(sectionData, containerSelector) {
        const { items, renderer } = sectionData;
        this.items = items;
        this.renderer = renderer;
        this.containerElement = document.querySelector(containerSelector);
    }

    render() {
        this.items.forEach((item) => {
            this.renderer(item);
        });
    }

    addItem(domElement) {
        this.containerElement.append(domElement);
    }
}
