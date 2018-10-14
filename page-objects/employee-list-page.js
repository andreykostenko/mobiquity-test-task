'use strict'
const baseControl = require('../controls/base-input-control.js');


class employeeListPage {
    constructor() {
        this.createemployeeBtn = element(by.css('[ng-click="createEmployee()"]'));
        this.editemployeeBtn = element(by.css('[ng-click="editEmployee()"]'));
        this.deleteemployeeBtn = element(by.css('[ng-click="deleteEmployee()"]'));
        this.formFooter = element(by.css('[class="formFooter"]'));
        this.addEmployeeBtn = this.formFooter.element(by.css('[ng-show="isCreateForm"]'));
        this.updatEemployeeBtn = this.formFooter.element(by.css('[ng-hide="isCreateForm"]'));
        this.firstName = new baseControl('[ng-model="selectedEmployee.firstName"]');
        this.lastName = new baseControl('[ng-model="selectedEmployee.lastName"]');
        this.startDate = new baseControl('[ng-model="selectedEmployee.startDate"]');
        this.email = new baseControl('[ng-model="selectedEmployee.email"]');
        this.employeeList = element(by.css('[id="employee-list"]'));
    };

    findEmployee(name) {
        return this.employeeInList = element(by.cssContainingText('[ng-repeat="employee in employees"]', name));

    };

}

module.exports = new employeeListPage();
