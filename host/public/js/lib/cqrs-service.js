/**
 * Created by andi on 11/2/13.
 */

angular.module('smfCqrs', [])
    .factory('smfCqrs', ['$http', function ($http) {
        console.log("smf cqrs service serup.");

        return {
            loadItems: function (callback/* ( error, items)*/) {
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
            createItem: function (item, callback /* ( error)*/) {
                // TODO create item
                console.log("simulate create command.");
                callback(null, item);
            },
            saveChanges: function (item, callback /* ( error)*/) {
                // TODO save item
                console.log("simulate save changes command.");
                callback(null, item);
            },
            deleteItem: function (itemId, callback /* ( error)*/) {
                // TODO delete item
                console.log("simulate delete command.");
                callback(null, itemId);
            }

            // TODO implement socket communication
        };
    }])
