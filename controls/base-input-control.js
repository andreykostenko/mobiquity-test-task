'use strict';

class BaseInputControl {
    constructor(elem) {
        {
            this.currentElement = element(by.css(elem));
        }
    }
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


}

module.exports = BaseInputControl;
