'use strict'
const baseControl = require('./base-input-control.js');


class LoginPage {
    constructor() {
        this.userName = new baseControl('[ng-model="user.name"]');
        this.password = new baseControl('[ng-model="user.password"]');
        this.loginButton = element(by.css('[type="submit"]'));
        this.logoutButton = element(by.css('[ng-click="logout()"]'));
        this.loginErrorMessage = element(by.css('.error-message'))


    }

    signInAs(username, password) {

        return browser.driver.get(hostname)
            .then(() => this.userName.setValue(username))
            .then(() => this.password.setValue(password))
            .then(() => this.loginButton.click())

    }


    signInAsLuke() {
        return this.signInAs('Luke', 'Skywalker');
    }


}

module.exports = new LoginPage();
