'use strict'
const loginPage = require('../page-objects/login-page.js');
const employeeListPage = require('../page-objects/employee-list-page.js');
const alertHelper = require('../utils/alert-helper.js');

describe('Employees CRUD spec', () => {

    beforeAll(async () => {
        await browser.driver.manage().window().maximize();
    });

    beforeEach(async () => {
        await loginPage.signInAsLuke();
    });

    const uniqueMask = `${'ako-test-usr'}${Date.now()}`;
    const startDate = moment().format('YYYY-MM-DD');
    const startDateUpdated = moment(startDate).add(1, 'days').format('YYYY-MM-DD');
    const uniqueCreateKey = uniqueMask + 'C';
    const uniqueEditKey = uniqueMask + 'U`';
    const validateEmployeeData = async (createKey, startDate) => {
        await expect(employeeListPage.firstName.getValue()).toEqual(createKey + 'FirstName');
        await expect(employeeListPage.lastName.getValue()).toEqual(createKey + 'LastName');
        await expect(employeeListPage.email.getValue()).toEqual(createKey + '@test.com');
        await expect(employeeListPage.startDate.getValue()).toEqual(startDate);

    };
    const findEmployeeAndClick = async (employeeName) => {
        await employeeListPage.findEmployee(employeeName);
        await employeeListPage.employeeInList.click();
    };

    it('Create new employee  ', async () => {
        await employeeListPage.createEmployeeBtn.click();
        await employeeListPage.firstName.setValue(uniqueCreateKey + 'FirstName');
        await employeeListPage.lastName.setValue(uniqueCreateKey + 'LastName');
        await employeeListPage.startDate.setValue(startDate);
        await employeeListPage.email.setValue(uniqueCreateKey + '@test.com');
        await employeeListPage.addEmployeeBtn.click();

        await findEmployeeAndClick(uniqueCreateKey);
        await employeeListPage.editEmployeeButton.click();
        await validateEmployeeData(uniqueCreateKey, startDate);
    });

    /*  Ideally, Create, Update and Delete operations should be done with separate objects, that way tests will be independent of each other. In our case we will use same employee
    for create/update/delete operations, which is obviously not the best practice, but still legit for test task :) */

    it('Update employee(+via doubleclick)', async () => {
        await employeeListPage.findEmployee(uniqueCreateKey);
        await browser.actions().doubleClick(employeeListPage.employeeInList).perform();
        await employeeListPage.firstName.setValue(uniqueEditKey + 'FirstName');
        await employeeListPage.lastName.setValue(uniqueEditKey + 'LastName');
        await employeeListPage.email.setValue(uniqueEditKey + '@test.com');
        await employeeListPage.startDate.setValue(startDateUpdated);
        await employeeListPage.updatEemployeeBtn.click();

        await employeeListPage.findEmployee(uniqueEditKey);
        await browser.actions().doubleClick(employeeListPage.employeeInList).perform();
        await validateEmployeeData(uniqueEditKey, startDateUpdated);

    });

    it('Delete employee ', async () => {
        await findEmployeeAndClick(uniqueCreateKey);
        await employeeListPage.deleteEmployeeBtn.click();
        await alertHelper.acceptAlert();
        await employeeListPage.findEmployee(uniqueEditKey);
        await expect(employeeListPage.employeeInList.isPresent()).toBeFalsy('employee is still present in list after deletion');
        await loginPage.signInAsLuke();
        await expect(employeeListPage.employeeInList.isPresent()).toBeFalsy('employee is still present in list after deletion and relogin');

    });


});
