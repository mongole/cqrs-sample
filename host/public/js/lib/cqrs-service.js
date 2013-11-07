/**
 * Created by andi on 11/2/13.
 */

//function smfCqrsProvider() {
//    this.$get = function () {
//        return {
//
//        }
//    }
//}
//
//angularModule('ngLocale', []).provider('$locale', $LocaleProvider);

angular.module('smfCqrs', [])
    .factory('smfCqrs', ['$http', function ($http) {
        console.log("first version. " );

        return {
            loadItems: function (callback) {
                // TODO array init is done via $http.get('/allItems.json')
                // $http({method: 'GET', url: '/allItems.json'}).success(function() {
                // ...
                // })

                console.log("simulate loading data. first version.");
                callback(null, [
                    new item_model.Item("77e7c7df-c9d8-43d9-8ef4-39abad1ea560", "Item 1"),
                    new item_model.Item("afa95629-9e09-4bac-a0d5-299e27488d14", "Item 2")
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
    }])
//
//
//angular.module('smfCqrs', [])
//    .factory('smfCqrs', ['$http', function () {
//        console.log("second version.");
//
//        return {
//            loadItems: function (success, err) {
//                // TODO array init is done via $http.get('/allItems.json')
//                // $http({method: 'GET', url: '/allItems.json'}).success(function() {
//                // ...
//                // })
//
//                console.log("simulate loading data. second version.");
//                success([
//                    new item_model.Item("77e7c7df-c9d8-43d9-8ef4-39abad1ea560", "Item 1"),
//                    new item_model.Item("afa95629-9e09-4bac-a0d5-299e27488d14", "Item 2")
//                ]);
//            },
//            createItem: function (item, success, error) {
//                // TODO create item
//                console.log("simulate create command.");
//                success(item);
//            },
//            saveChanges: function (item, success, error) {
//                // TODO save item
//                console.log("simulate save changes command.");
//                success(item);
//            },
//            deleteItem: function (itemId, success, error) {
//                // TODO delete item
//                console.log("simulate delete command.");
//                success();
//            }
//
//            // TODO implement socket communication
//        };
//    }])