const assert = require('assert');
const contactus = require("../pages/contactus");

describe("Contact Us Page", () => {

    describe("Contact Us Page Test", () => {

        before(() => {
            browser.url(contactus.url);
        });

        it("should successfully get the title of the page", () => {
            var title = browser.getTitle();
            assert.equal(title, 'Contact Us | Gables Residential');
        });
    });
    
    describe('form happy path', function() {

        before(() => {
            browser.url(contactus.url);
        });

        it('should form should be successful', function () {
            assert.equal(browser.isVisible(contactus.success), false);
            browser.setValue(contactus.firstName, "John");
            browser.setValue(contactus.lastName, "Doe");
            browser.setValue(contactus.email, "johndoe@test.com");
            browser.setValue(contactus.phoneNumber, "800-222-4934");
            browser.leftClick(contactus.submit);
            browser.waitForVisible(contactus.success)
            assert.equal(browser.isVisible(contactus.success), true);
        });
    });

    describe('with unexpected user behavior', function() {

        beforeEach( function () {
            browser.url(contactus.url);
        });

        it('should create an error when the email field is invalid', function () {
            assert.equal(browser.isVisible(contactus.error), false);
            browser.setValue(contactus.firstName, "John");
            browser.setValue(contactus.lastName, "Doe");
            browser.setValue(contactus.email, "aa");
            browser.setValue(contactus.phoneNumber, "800-222-4934");
            browser.leftClick(contactus.submit);
            browser.waitForVisible(contactus.error);
            assert.equal(browser.isVisible(contactus.error), true);
        });

        it('should create an error when the first name field is invalid', function () {
            assert.equal(browser.isVisible(contactus.error), false);
            browser.setValue(contactus.firstName, "--11space test @lk';`$$&;;;dkjfkjd");
            browser.setValue(contactus.lastName, "Doe");
            browser.setValue(contactus.email, "johndoe@test.com");
            browser.setValue(contactus.phoneNumber, "800-222-4934");
            browser.leftClick(contactus.submit);
            browser.waitForVisible(contactus.error)
            assert.equal(browser.isVisible(contactus.error), true);
        });

        it('should create an error when the last name field is invalid', function () {
            assert.equal(browser.isVisible(contactus.error), false);
            browser.setValue(contactus.firstName, "John");
            browser.setValue(contactus.lastName, "--11space test @lk';`$$&;;;dkjfkjd");
            browser.setValue(contactus.email, "johndoe@test.com");
            browser.setValue(contactus.phoneNumber, "800-222-4934");
            browser.leftClick(contactus.submit);
            browser.waitForVisible(contactus.error)
            assert.equal(browser.isVisible(contactus.error), true);
        });

        it('should create an error when the last phone number field is invalid', function () {
            assert.equal(browser.isVisible(contactus.error), false);
            browser.setValue(contactus.firstName, "John");
            browser.setValue(contactus.lastName, "Doe");
            browser.setValue(contactus.email, "johndoe@test.com");
            browser.setValue(contactus.phoneNumber, "not a number");
            browser.leftClick(contactus.submit);
            browser.waitForVisible(contactus.error);
            assert.equal(browser.isVisible(contactus.error), true);
        });
    });
})

