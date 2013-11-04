/**
 * Created by andi on 11/3/13.
 */

describe('cqrs angular sample', function() {
    it('should have header cqrs-sameple', function() {
        browser.get('http://localhost:3000');

//        element(by.model('yourName')).sendKeys('Julie');
//        var greeting = element(by.binding('yourName'));
//        expect(greeting.getText()).toEqual('Hello Julie!');

        var headline = element(by.id('h1'));
        expect(headline.getText()).toEqual('cqrs-sample');
    });

    it('should have 2 items after loading', function() {
        browser.get('http://localhost:3000');

        var items = element(by.id('items'));
        expect()
    })
});