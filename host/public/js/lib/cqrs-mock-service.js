angular.module('smfCqrs', [])
    .service('smfCqrs', ['$http', function () {

        this.getObjectID = (function () {
            var id = 0;    // Private ID counter
            return function (obj) {
                if (obj.hasOwnProperty("__objectID__")) {
                    return obj.__objectID__;
                } else {
                    ++id;
                    Object.defineProperty(obj, "__objectID__", {
                        /*
                         * Explicitly sets these two attribute values to false,
                         * although they are false by default.
                         */
                        "configurable": false,
                        "enumerable": false,
                        /*
                         * This closure guarantees that different objects
                         * will not share the same id variable.
                         */
                        "get": (function (__objectID__) {
                            return function () {
                                return __objectID__;
                            };
                        })(id),
                        "set": function () {
                            throw new Error("Sorry, but 'obj.__objectID__' is read-only!");
                        }
                    });
                    return obj.__objectID__;
                }
            };
        })();

        this.loadItems = function (success, err) {
            // TODO array init is done via $http.get('/allItems.json')
            // $http({method: 'GET', url: '/allItems.json'}).success(function() {
            // ...
            // })

            console.log("mock " + this.getObjectID(this) + "  loading data");
        }

        this.whenLoadItems = function (succeed, success, error) {
            if (succeed) return success;
            else return error;
        }


        this.createItem = function (item, success, error) {
            // TODO create item
            console.log("mock " + getObjectID(this) + " create command.");
            success(item);
        }
        this.saveChanges = function (item, success, error) {
            // TODO save item
            console.log("mock " + getObjectID(this) + " save changes command.");
            success(item);
        }
        this.deleteItem = function (itemId, success, error) {
            // TODO delete item
            console.log("mock " + getObjectID(this) + " delete command.");
            success();
        }

        // TODO implement socket communication

    }]);