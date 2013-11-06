cqrsServiceFactory =  function() {
    this.sayHello = function () {
        return "Hello, CQRS!"
    }
};
cqrsServiceMockFactory = {
    sayHello: function () {
        return "Hello, CQRS MOCK!";
    }
};
//myApp.factory('cqrsServiceMockFactory', function(cqrsServiceMock) {
//    return cqrsServiceMock
//});

var myApp = angular.module('myApp', [])

//myApp.service('cqrsService', function() {
//    this.sayHello = function() {
//        return "Hello, CQRS!"
//    };
//});

//myApp.service('cqrsServiceMock', function() {
//    this.sayHello = function() {
//        return "Hello, CQRS MOCK!"
//    };
//});


//.provider('helloCqrsProvider', function() {
    .provider('cqrsService', function () {
        this.factory = cqrsServiceFactory;
        this.$get = this.factory;
        this.mock = function () {
            this.factory = cqrsServiceMockFactory;
        };
    });

//myApp.config(function(helloCqrsProvider){
//    //helloCqrsProvider.mock();
//});


function MyCtrl($scope, cqrsService) {
    $scope.hellos = cqrsService.sayHello();
}