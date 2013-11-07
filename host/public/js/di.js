Item = function (id, name) {
    this.id = id;
    this.name = name;
    this.clone = function () {
        return new Item(this.id, this.name);
    }
    this.equals = function (rhs) {
        if (!rhs) return false;
        return ( this.id == rhs.id &&
            this.name == rhs.name);
    }
}
indexOfItem = function (item, items) {
    if (items.length === 0)
        return -1;
    for (idx = 0; idx < items.length; idx++) {
        if (items[idx].id == item.id)
            return idx;
    }
    return -1;
}


angular.module('testServiceMockConfig', [])
    .factory('testServiceMockConfig', function () {

        console.log("setup cqrs mock config.");

        return {
            doLoadItems: function (callback) {
                console.log("mock loading data");
                if (!this.configuredLoadItems) {
                    throw Error("The mock is not configured to loadItems().");
                }
                callback(this.loadItemsError, this.loadedItems);
            },
            whenLoadItems: function ( error, items) {
                this.configuredLoadItems = true;
                this.loadedItems = items;
                this.loadItemsError = error;
            }
        }
    });


angular.module('testService', ['testServiceMockConfig'])
    .factory('testService', ['testServiceMockConfig', function (testServiceMockConfig) {

        console.log("mock version. testServiceMockConfig: ");

        return {
            loadItems: function (callback) {
                testServiceMockConfig.doLoadItems(callback);
            }
        }
    }])
    .run(function (testServiceMockConfig) {
        console.info("setup load-2-items-success mock: " + testServiceMockConfig);
        testServiceMockConfig.whenLoadItems(
            null,
            [
                new Item("77e7c7df-c9d8-43d9-8ef4-39abad1ea560", "Item 1"),
                new Item("afa95629-9e09-4bac-a0d5-299e27488d14", "Item 2")
            ]);
    })

angular.module('ItemApp', ['testService'])
    .controller('ItemsCtrl', ['$scope', 'testService', function ($scope, testService) {
        testService.loadItems(function (error, items) {
            if (error) {
                $scope.text = "Error happened";
            }
            $scope.text = '';
            for (i = 0; i < items.length; i++) {
                console.log("add: " + items[i].name);
                $scope.text = $scope.text + " " + items[i].name;
            }
        })
    }]);
