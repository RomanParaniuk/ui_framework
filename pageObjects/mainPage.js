const EditEmployeeForm = require('./editEmployeeForm');
const {setValue, generateRandomValidEmployeeData} = require('../support/utils');
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

class MainPage {
    constructor() {
        this.dataForRandomEmployee = generateRandomValidEmployeeData();
        this.dataEmployeeForEditing = {
            employeeName: 'testM',
            employeeLastName: 'testLM',
            employeeEmail: 'test@email.h',
            employeeStartDate: '2020-02-02'
        };
        this.container = $('.main-view-container');
        this.greetingText = $('#greetings');
        this.logoutButton = $('.main-button');
        this.addButton = $('#bAdd');
        this.editButton = $('#bEdit');
        this.deleteButton = $('#bDelete');
        this.employeeList = $('#employee-list');
        this.randomNameEmployee = element(by.xpath(`//li[@ng-dblclick="editEmployee()"][contains(text(), 
                                    '${this.dataForRandomEmployee.employeeName} ${this.dataForRandomEmployee.employeeLastName}')]`));
        this.employeeForEditing = element(by.xpath(`//li[@ng-dblclick="editEmployee()"][contains(text(), 
                                    '${this.dataEmployeeForEditing.employeeName} ${this.dataEmployeeForEditing.employeeLastName}')]`));
        this.editEmployeeForm = new EditEmployeeForm()
    }

    async createEmployee(data) {
        await this.addButton.click();
        await this.setDataForEmployee(data);
        await this.editEmployeeForm.addEmployeeButton.click();
        console.log(`Employee with name ${this.dataForRandomEmployee.employeeName} ${this.dataForRandomEmployee.employeeLastName} was created`)
    }

    async setDataForEmployee(data) {
        await setValue(this.editEmployeeForm.firstNameInput, data.employeeName);
        await setValue(this.editEmployeeForm.lastNameInput, data.employeeLastName);
        await setValue(this.editEmployeeForm.startDateInput, data.employeeStartDate);
        await setValue(this.editEmployeeForm.emailInput, data.employeeEmail);
    }

    async validateEmployee(employee, data) {
        await browser.actions().doubleClick(employee).perform();
        expect(await this.editEmployeeForm.firstNameInput.getAttribute('value')).equal(data.employeeName, `First name is different:`);
        expect(await this.editEmployeeForm.lastNameInput.getAttribute('value')).equal(data.employeeLastName, `Last name is different:`);
        expect(await this.editEmployeeForm.startDateInput.getAttribute('value')).equal(data.employeeStartDate, `Start Date is different:`);
        return expect(await this.editEmployeeForm.emailInput.getAttribute('value')).equal(data.employeeEmail, `Email is different:`);
    }

    async editEmployee(employee, data) {
        await employee.click();
        await this.editButton.click();
        await this.setDataForEmployee(data);
        await this.editEmployeeForm.updateEmployeeButton.click();
    }

    async deleteEmployee(employee) {
        await employee.click();
        await this.deleteButton.click();
        await browser.switchTo().alert().accept();
        await browser.actions().doubleClick(this.container).perform();
    }

    async deleteEmployeeFromEditForm(employee) {
        await browser.actions().doubleClick(employee).perform();
        await this.editEmployeeForm.deleteButton.click();
        await browser.switchTo().alert().accept();
        await browser.actions().doubleClick(this.container).perform();
    }
}

module.exports = MainPage;
