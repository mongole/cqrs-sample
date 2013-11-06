/**
 * Created by andi on 11/2/13.
 */



angular.module('smfCqrs', [])
    .provider('smfCqrs', function () {
//  .factory('smfCqrs', ['$http', function () {

        console.log("create provider");

        this.mock = false;
        this.mockService = function () {
            this.mock = true;
        }

        this.$get = function () {
            var SmfCqrsService = {
                loadItems: function (success, err) {
                    // TODO array init is done via $http.get('/allItems.json')
                    // $http({method: 'GET', url: '/allItems.json'}).success(function() {
                    // ...
                    // })

                    console.log("simulate loading data");
                    success([
                        new Item("77e7c7df-c9d8-43d9-8ef4-39abad1ea560", "Item 1"),
                        new Item("afa95629-9e09-4bac-a0d5-299e27488d14", "Item 2")
                    ]);
                },
                createItem: function (item, success, error) {
                    // TODO create item
                    console.log("simulate create command.");
                    success(item);
                },
                saveChanges: function (item, success, error) {
                    // TODO save item
                    console.log("simulate save changes command.");
                    success(item);
                },
                deleteItem: function (itemId, success, error) {
                    // TODO delete item
                    console.log("simulate delete command.");
                    success();
                }

                // TODO implement socket communication
            };

            var SmfCqrsServiceMock = {
                loadItems: function (success, err) {
                    // TODO array init is done via $http.get('/allItems.json')
                    // $http({method: 'GET', url: '/allItems.json'}).success(function() {
                    // ...
                    // })

                    console.log("mock loading data");
                    success([
                        new Item("77e7c7df-c9d8-43d9-8ef4-39abad1ea560", "Item 1"),
                        new Item("afa95629-9e09-4bac-a0d5-299e27488d14", "Item 2")
                    ]);
                },
                createItem: function (item, success, error) {
                    // TODO create item
                    console.log("mock create command.");
                    success(item);
                },
                saveChanges: function (item, success, error) {
                    // TODO save item
                    console.log("mock save changes command.");
                    success(item);
                },
                deleteItem: function (itemId, success, error) {
                    // TODO delete item
                    console.log("mock delete command.");
                    success();
                }

                // TODO implement socket communication
            };


            if (this.mock) {
                console.log("Create CQRS Mock Service.");
                return SmfCqrsServiceMock
            }
            else {
                console.log("Create CQRS Service.");
                return SmfCqrsService;
            }
        };
    })
    .config(['smfCqrsProvider', function (smfCqrsProvider) {
        console.log("configure service");
        smfCqrsProvider.mockService();
    }])
    .run(['smfCqrs', function (smfCqrs) {
//        smfCqrs.mockService();
        console.log("runrunrun")

    }]);

//angular.module('smfCqrs', [])
//  .factory('smfCqrs', ['$http', function () {
//      return function() {
//        console.log("dummbarz");
//      }
//    }]);