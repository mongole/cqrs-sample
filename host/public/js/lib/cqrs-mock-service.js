angular.module('smfCqrsMockConfig', [])
    .factory('smfCqrsMockConfig', function () {
        console.log("setup cqrs mock config.");

        return{
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


angular.module('smfCqrs', ['smfCqrsMockConfig'])
    .factory('smfCqrs', ['smfCqrsMockConfig', function (smfCqrsMockConfig) {

        console.log("mock version. smfCqrsMockConfig: ");

        return {
            loadItems: function (callback) {
                smfCqrsMockConfig.doLoadItems(callback);
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
        }
    }])
    .run(function (smfCqrsMockConfig) {
        console.info("setup load-2-items-success mock: " + smfCqrsMockConfig);
        smfCqrsMockConfig.whenLoadItems(
            null,
            [
                new item_model.Item("77e7c7df-c9d8-43d9-8ef4-39abad1ea560", "Item 1"),
                new item_model.Item("afa95629-9e09-4bac-a0d5-299e27488d14", "Item 2")
            ]);
    })
