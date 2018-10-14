'use strict'
const baseControl = require('../Utils/base-input-control.js');


class UserListPage {
    constructor() {
        this.createUserBtn = element(by.css('[ng-click="createEmployee()"]'));
        this.editUserBtn = element(by.css('[ng-click="editEmployee()"]'));
        this.deleteUserBtn = element(by.css('[ng-click="deleteEmployee()"]'));
        this.formFooter = element(by.css('[class="formFooter"]'));
        this.addUserbtn = this.formFooter.element(by.css('[ng-show="isCreateForm"]'));
        this.UpdateUserbtn = this.formFooter.element(by.css('[ng-hide="isCreateForm"]'));
        this.firstName = new baseControl('[ng-model="selectedEmployee.firstName"]');
        this.lastName = new baseControl('[ng-model="selectedEmployee.lastName"]');
        this.startDate = new baseControl('[ng-model="selectedEmployee.startDate"]');
        this.email = new baseControl('[ng-model="selectedEmployee.email"]');
        this.employeeList = element(by.css('[id="employee-list"]'));


    };


    findUser(name) {
        return this.userInList = element(by.cssContainingText('[ng-repeat="employee in employees"]', name));

    };

    acceptAlert() {
        return browser.waitForAngularEnabled(false)
            .then(() => browser.wait(protractor.ExpectedConditions.alertIsPresent(), 10000))
            .then(() => browser.sleep(1000))
            .then(() => browser.switchTo().alert().accept())
            .then(() => browser.sleep(1000))
            .then(() => browser.waitForAngularEnabled(true))

    }

}

module.exports = new UserListPage();
