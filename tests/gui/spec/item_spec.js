/**
 * Created by andi on 11/3/13.
 */


// TODO build a library for test actions?
// http://stackoverflow.com/questions/950087/how-to-include-a-javascript-file-in-another-javascript-file

describe('cqrs angular sample', function () {

    function prepare(setupPath) {
        if (setupPath)
            browser.get('http://localhost:3000/test/' + setupPath);
        else
            browser.get('http://localhost:3000');
    }

    beforeEach(function () {
        newItemInput = element(by.id('newItemName'));
        addItemButton = element(by.id('addItem'));

        items = element.all(by.repeater('item in items'));
    })

    it('should have h1 cqrs-sample and not items', function () {
        prepare("load-0-items-success.js");
        var headline = element(by.id('h1'));
        expect(headline.getText()).toEqual('cqrs-sample');
        expect(typeof items == 'undefined')
    });

    it('should have 2 items after loading', function () {
        prepare("load-2-items-success.js");
        expect(items.count()).toEqual(2);
        expect(items.get(0).getText()).toEqual('Item 1');
        expect(items.get(1).getText()).toEqual('Item 2');
    });

    it('should add a third item and call the create item handler', function () {
        prepare("load-2-items-success-and-add-1-item.js");
        newItemInput.sendKeys('Item 3');

        expect(items.count()).toEqual(2);
        addItemButton.click();

//        var millisecondsToWait = 1000;
//        setTimeout(function () {
            expect(items.count()).toEqual(3);
            expect(items.get(2).getText()).toEqual('Item 3');
//        }, millisecondsToWait);

        // TODO check for call to cqrs service method.
    });

//    it('should open the editor on mouseover of an item in the list', function () {
//
//        // TODO setup service mock with
//
//        // TODO check backup is undef
//
//        browser.debugger();
//
//        var spanEl = browser.driver.findElement(by.id('nameSpan'))
//        browser.actions(spanEl).mouseMove().perform().click();
//        var input = browser.driver.findElement(by.id('nameInput'))
//        browser.actions(input).mouseMove().perform().click();
//
//        // TODO check backup = item
//        // TODO insert Item changed
//        // TODO click header and check for cqrs service call
//
//        // TODO same, but without change and no service call
//
//
//    });

//    it('should call save on changed edit field on blur event', function () {
//
//    });
//
//    it('should not call save event on blur without change', function () {
//
//    });
//
//    it('should delete the item on click the remove button call remove', function () {
//
//    });
});