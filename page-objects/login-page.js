'use strict'
const baseInputControl = require('../controls/base-input-control.js');


class LoginPage {
    constructor() {
        this.userName = new baseInputControl('[ng-model="user.name"]');
        this.password = new baseInputControl('[ng-model="user.password"]');
        this.loginButton = element(by.css('[type="submit"]'));
        this.logoutButton = element(by.css('[ng-click="logout()"]'));
        this.loginErrorMessage = element(by.css('.error-message'));
    }

    signInAs(userName, password) {
        return browser.driver.get(hostname)
            .then(() => this.userName.setValue(userName))
            .then(() => this.password.setValue(password))
            .then(() => this.loginButton.click())

    }

    signInAsLuke() {
        return this.signInAs('Luke', 'Skywalker');
    }


}

module.exports = new LoginPage();
