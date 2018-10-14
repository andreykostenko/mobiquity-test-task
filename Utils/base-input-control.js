'use strict';

class BaseControl {
    constructor(elem) {
        {
            this.currentElement = element(by.css(elem));
        }
    }

    // isPresent() {
    //     return this.currentElement.isPresent();
    // }
    //
    setValue(value) {
        return this.currentElement.clear().
        then(() => this.currentElement.sendKeys(value));
    }

    getValue() {
        return this.currentElement.getAttribute('value');
    }

    isDisplayed() {
        return this.isPresent()
            .then(isPresent => isPresent ? this.currentElement.isDisplayed() : false);
    }
    clearValue() {
        return this.currentElement.clear();

    }


    //
    // isEnabled() {
    //     return this.currentElement.isEnabled();
    // }
    //
    // click() {
    //     return this.currentElement.click();
    // }
    //
    // getAttribute(attributeName) {
    //     return this.currentElement.getAttribute(attributeName);
    // }
    //
    // getTitle() {
    //     return this.titleElement.getText();
    // }
    //
    // locator() {
    //     return this.currentElement.locator();
    // }
}

module.exports = BaseControl;
