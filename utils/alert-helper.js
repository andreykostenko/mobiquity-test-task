'use strict'

function AlertUtil() {

    this.acceptAlert = function () {
        return browser.waitForAngularEnabled(false)
            .then(() => browser.wait(protractor.ExpectedConditions.alertIsPresent(), defaultWait))
            .then(() => browser.switchTo().alert().accept())
            .then(() => browser.waitForAngularEnabled(true))
    }
}
module.exports = new AlertUtil();