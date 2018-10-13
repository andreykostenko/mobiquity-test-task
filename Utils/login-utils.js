'use strict'

class LoginPage {
    constructor() {
        this.userName = element(by.css('[ng-model="user.name"]'));
        this.password = element(by.css('[ng-model="user.password"]'));
        this.loginButton = element(by.css('[type="submit"]'));


    }

    signInAs(username,password) {

        return browser.driver.get(hostname)
            .then(() => this.userName.sendKeys(username))
            .then(() => this.password.sendKeys(password))
            .then(() => this.loginButton.click())
            .then(() => browser.driver.sleep(5000))

    }



    signInALuke() {
        return this.signInAs('Luke','Skywalker');
    }


}

module.exports = new LoginPage();
