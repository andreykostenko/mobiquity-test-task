'use strict'
const loginPage = require('../page-objects/login-page.js');
const employeeListPage = require('../page-objects/employee-list-page.js');


describe('Login/logout spec', () => {


    beforeAll(async () => {
        await browser.driver.manage().window().maximize();
    });


    it('employee should be able to login and logout  ', async () => {
        await browser.driver.get(hostname);
        await expect(employeeListPage.employeeList.isPresent()).toBeFalsy();
        await loginPage.signInAsLuke();
        await expect(employeeListPage.employeeList.isDisplayed()).toBeTruthy();
        await loginPage.logoutButton.click();
        await expect(employeeListPage.employeeList.isPresent()).toBeFalsy();

    });


    it('employee shouldnt be able to login with invalid credentials', async () => {
        await expect(loginPage.loginErrorMessage.isDisplayed()).toBeFalsy();
        await browser.driver.get(hostname);
        await loginPage.signInAs('Dart', 'Vader');
        await expect(loginPage.loginErrorMessage.isDisplayed()).toBeTruthy();
    });


    it('After logging out no employee data should be present on login page', async () => {
        await loginPage.signInAsLuke();
        await loginPage.logoutButton.click();
        await expect(loginPage.userName.getValue()).toBe('','employeename shoudnt be present on login page after logging out');
        await expect(loginPage.password.getValue()).toBe('','Password shoudnt be present on login page after logging out');


    });


});
