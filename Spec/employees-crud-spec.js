'use strict'
const loginPage = require('../Utils/login-utils.js');
const employeeListPage = require('../Utils/employee-list-utils.js');


describe('Employees CRUD spec', () => {

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

    it('Create new employee  ', async () => {
        //create
        await employeeListPage.createemployeeBtn.click();
        await employeeListPage.firstName.setValue(uniqueCreateKey + 'FirstName');
        await employeeListPage.lastName.setValue(uniqueCreateKey + 'LastName');
        await employeeListPage.startDate.setValue(startDate);
        await employeeListPage.email.setValue(uniqueCreateKey + '@test.com');
        await employeeListPage.addemployeebtn.click();

        //validate
        await employeeListPage.findemployee(uniqueCreateKey);
        await employeeListPage.employeeInList.click();
        await employeeListPage.editemployeeBtn.click();
        await expect(employeeListPage.firstName.getValue()).toEqual(uniqueCreateKey + 'FirstName');
        await expect(employeeListPage.lastName.getValue()).toEqual(uniqueCreateKey + 'LastName');
        await expect(employeeListPage.email.getValue()).toEqual(uniqueCreateKey + '@test.com');
        await expect(employeeListPage.startDate.getValue()).toEqual(startDate);


    });
    /*  Ideally, Create, Update and Delete operations should be done with separate objects, that way tests will be independent of each other. In our case we will use same employee for create/update operations,
    which is obviously not the best practice, but still legit for test task :) */

    it('Update employee(+via doubleclick) ', async () => {


        await employeeListPage.findemployee(uniqueCreateKey);
        await browser.actions().doubleClick(employeeListPage.employeeInList).perform(); //doubleclick
        await employeeListPage.firstName.setValue(uniqueEditKey + 'FirstName');
        await employeeListPage.lastName.setValue(uniqueEditKey + 'LastName');
        await employeeListPage.email.setValue(uniqueEditKey + '@test.com');
        await employeeListPage.startDate.setValue(startDateU);
        await employeeListPage.Updateemployeebtn.click();

        //Validate
        await employeeListPage.findemployee(uniqueEditKey);
        await browser.actions().doubleClick(employeeListPage.employeeInList).perform();
        await expect(employeeListPage.firstName.getValue()).toEqual(uniqueEditKey + 'FirstName');
        await expect(employeeListPage.lastName.getValue()).toEqual(uniqueEditKey + 'LastName');
        await expect(employeeListPage.email.getValue()).toEqual(uniqueEditKey + '@test.com');
        await expect(employeeListPage.startDate.getValue()).toEqual(startDateU);

    });

    it('Delete employee ', async () => {
        //Create employee for deletion
        await employeeListPage.createemployeeBtn.click();
        await employeeListPage.firstName.setValue(uniqueDeleteKey + 'FirstName');
        await employeeListPage.lastName.setValue(uniqueDeleteKey + 'LastName');
        await employeeListPage.startDate.setValue(startDate);
        await employeeListPage.email.setValue(uniqueDeleteKey + '@test.com');
        await employeeListPage.addemployeebtn.click();

        //Delete
        await employeeListPage.findemployee(uniqueDeleteKey);
        await employeeListPage.employeeInList.click();
        await employeeListPage.deleteemployeeBtn.click();

        //handle alert
        await employeeListPage.acceptAlert();
        //validate
        await browser.sleep(3000);//wait until employee will be deleted
        await employeeListPage.findemployee(uniqueDeleteKey);
        await expect(employeeListPage.employeeInList.isPresent()).toBeFalsy('employee is still present in list after deletion');

        await loginPage.signInAsLuke();
        await expect(employeeListPage.employeeInList.isPresent()).toBeFalsy('employee is still present in list after deletion and relogin');


    });


});
