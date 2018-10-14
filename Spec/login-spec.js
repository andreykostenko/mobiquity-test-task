'use strict'
const loginPage = require('../Utils/login-utils.js');
const userListPage = require('../Utils/user-list-utils.js');


describe('Login/logout spec', () => {


    beforeAll(async () => {
        await browser.driver.manage().window().maximize();
    });


    it('User should be able to login and logout  ', async () => {
        await browser.driver.get(hostname);
        await expect(userListPage.employeeList.isPresent()).toBeFalsy();
        await loginPage.signInAsLuke();
        await expect(userListPage.employeeList.isDisplayed()).toBeTruthy();
        await loginPage.logoutButton.click();
        await expect(userListPage.employeeList.isPresent()).toBeFalsy();

    });


    it('User shouldnt be able to login with invalid credentials', async () => {
        await expect(loginPage.loginErrorMessage.isDisplayed()).toBeFalsy();
        await browser.driver.get(hostname);
        await loginPage.signInAs('Dart', 'Vader');
        await expect(loginPage.loginErrorMessage.isDisplayed()).toBeTruthy();
    });


    it('After logging out no user data should be present on login page', async () => {
        await loginPage.signInAsLuke();
        await loginPage.logoutButton.click();
        await expect(loginPage.userName.getValue()).toBe('','Username shoudnt be present on login page after loging out');
        await expect(loginPage.password.getValue()).toBe('','Password shoudnt be present on login page after loging out');


    });


});
