angular.module('smfCqrsMockConfig', [])
    .factory('smfCqrsMockConfig', function () {
        console.log("setup cqrs mock config.");

        return{
            /**
             * @name whenLoadItems
             *
             * @description
             * configure the list of items to be returned by doLoadItems
             *
             * @param {function()}  `null` if doLoadItems simulates successful creation,
             *                      `Error("errormessage") for simulation of an error.
             * @param {[Item]} the items loaded.
             */
            whenLoadItems: function (error, items) {
                this.configuredLoadItems = true;
                this.loadedItems = items;
                this.loadItemsError = error;
            },
            doLoadItems: function (callback/* ( error, items)*/) {
                console.log("mock loading data");
                if (!this.configuredLoadItems)
                    throw Error("The mock is not configured to loadItems().");
                callback(this.loadItemsError, this.loadedItems);
            },

            /**
             * @name whenCreateItem
             *
             * @description
             * configure the doCreateItem method
             *
             * @param {function()}  `null` if doCreateItem simulates successful creation,
             *                      `Error("errormessage") for simulation of an error.
             * @param {Item} the item to be created.
             */
            whenCreateItem: function ( error, item) {
                this.configuredCreateItems = true;
                this.createItemError = error;
                this.toBeCreatedItem = item;
            },
            doCreateItem: function (callback/* ( error, createdItem)*/) {
                console.log("mock create item");
                if (!this.configuredCreateItems)
                    throw Error("The mock is not configured to createItem().");
                callback(this.createItemError, this.toBeCreatedItem);
            },

            /**
             * @name whenSaveChanges
             *
             * @description
             * configure the doCreateItem method
             *
             * @param {Item} the item to be created.
             * @param {function()}  `null` if doCreateItem simulates successful save,
             *                      `Error("errormessage") for simulation of an error.
             */
            whenSaveChanges: function (item, error, updatedItem) {
                this.configuredSaveChanges = true;
                this.toBeSavedUpdatedItem = updatedItem;
                this.savedItemError = error;
            },
            doSaveChanges: function (item, callback/* ( error, item)*/) {
                console.log("mock save changes.");
                if (!this.configuredSaveChanges)
                    throw Error("The mock is not configured to saveItem().");
                callback(this.savedItemError, this.toBeSavedUpdatedItem);
            },

            /**
             * @name whenCreateItem
             *
             * @description
             * configure the doCreateItem method
             *
             * @param {string} the item id to be deleted.
             * @param {function()}  `null` if doCreateItem simulates successful deletion,
             *                      `Error("errormessage") for simulation of an error.
             */
            whenDeleteItem: function (itemId, error) {
                this.configuredDeleteItem = true;
                this.toBeDeletedItemId = itemId;
                this.deleteItemError = error;
            },
            doDeleteItem: function (itemId, callback/* ( error)*/) {
                console.log("mock delete");
                if (!this.configuredDeleteItem)
                    throw Error("The mock is not configured to deleteItem().");
                callback(this.deleteItemError, this.toBeDeletedItemId);
            }
        }
    });


angular.module('smfCqrs', ['smfCqrsMockConfig'])
    .factory('smfCqrs', ['smfCqrsMockConfig', function (smfCqrsMockConfig) {

        console.log("mock version. smfCqrsMockConfig: ");

        return {
            loadItems: function (callback/* ( error, items)*/) {
                smfCqrsMockConfig.doLoadItems(callback);
            },

            createItem: function (item, callback /* ( error, item)*/) {
                smfCqrsMockConfig.doCreateItem(item, callback);
            },

            saveChanges: function (item, callback /* ( error, item)*/) {
                smfCqrsMockConfig.doSaveChanges(item, callback);
            },

            deleteItem: function (itemId, callback /* ( error, itemId)*/) {
                smfCqrsMockConfig.doDeleteItem(item, callback);
            }
        }
    }])

