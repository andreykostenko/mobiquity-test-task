'use strict'
const loginPage = require('../Utils/login-utils.js');
const userListPage = require('../Utils/user-list-utils.js');


describe('Users CRUD spec', () => {

    beforeAll(async () => {
        await browser.driver.manage().window().maximize();
    });

    beforeEach(async () => {
        await loginPage.signInAsLuke();
    });

    const mask = `${'ako-test-usr'}${Date.now()}`;
    const startDate = moment().format('YYYY-MM-DD');
    const startDateU = moment(startDate).add(1, 'days').format('YYYY-MM-DD');
    const uniqueCreateKey = mask + 'C';
    const uniqueEditKey = mask + 'U`';
    const uniqueDeleteKey = mask + 'D`';

    it('Create new user  ', async () => {
        await userListPage.createUserBtn.click();
        await userListPage.firstName.setValue(uniqueCreateKey + 'FirstName');
        await userListPage.lastName.setValue(uniqueCreateKey + 'LastName');
        await userListPage.startDate.setValue(startDate);
        await userListPage.email.setValue(uniqueCreateKey + '@test.com');
        await userListPage.addUserbtn.click();

        //validate
        await userListPage.findUser(uniqueCreateKey);
        await userListPage.userInList.click();
        await userListPage.editUserBtn.click();
        await expect(userListPage.firstName.getValue()).toEqual(uniqueCreateKey + 'FirstName');
        await expect(userListPage.lastName.getValue()).toEqual(uniqueCreateKey + 'LastName');
        await expect(userListPage.email.getValue()).toEqual(uniqueCreateKey + '@test.com');
        await expect(userListPage.startDate.getValue()).toEqual(startDate);


    });
    /*  Ideally, Create, Update and Delete operations should be done with separate objects, that way tests will be independent of each other. In our case we will use one user for create/update operations,
    which is obviously not the best practice, but still legit for test task :) */

    it('Update user(+via doubleclick) ', async () => {


        await userListPage.findUser(uniqueCreateKey);
        await browser.actions().doubleClick(userListPage.userInList).perform(); //doubleclick
        await userListPage.firstName.setValue(uniqueEditKey + 'FirstName');
        await userListPage.lastName.setValue(uniqueEditKey + 'LastName');
        await userListPage.email.setValue(uniqueEditKey + '@test.com');
        await userListPage.startDate.setValue(startDateU);
        await userListPage.UpdateUserbtn.click();

        //Validate
        await userListPage.findUser(uniqueEditKey);
        await browser.actions().doubleClick(userListPage.userInList).perform();
        await expect(userListPage.firstName.getValue()).toEqual(uniqueEditKey + 'FirstName');
        await expect(userListPage.lastName.getValue()).toEqual(uniqueEditKey + 'LastName');
        await expect(userListPage.email.getValue()).toEqual(uniqueEditKey + '@test.com');
        await expect(userListPage.startDate.getValue()).toEqual(startDateU);

    });

    it('Delete user ', async () => {
        //Create user for deletion
        await userListPage.createUserBtn.click();
        await userListPage.firstName.setValue(uniqueDeleteKey + 'FirstName');
        await userListPage.lastName.setValue(uniqueDeleteKey + 'LastName');
        await userListPage.startDate.setValue(startDate);
        await userListPage.email.setValue(uniqueDeleteKey + '@test.com');
        await userListPage.addUserbtn.click();

        //Delete
        await userListPage.findUser(uniqueDeleteKey);
        await userListPage.userInList.click();
        await userListPage.deleteUserBtn.click();

        //handle alert
        await userListPage.acceptAlert();
        //validate
        await browser.sleep(3000);//wait until user will be deleted
        await userListPage.findUser(uniqueDeleteKey);
        await expect(userListPage.userInList.isPresent()).toBeFalsy('User is still present in list after deletion');

        await loginPage.signInAsLuke();
        await expect(userListPage.userInList.isPresent()).toBeFalsy('User is still present in list after deletion and relogin');


    });


});
