/**
 * Created by andi on 10/29/13.
 */


Item = function (id, name) {
    this.id = id;
    this.name = name;
    this.clone = function () {
        return new Item(this.id, this.name);
    }
    this.equals = function (rhs) {
        return ( this.id == rhs.id &&
            this.name == rhs.name);
    }
}
function indexOfItem(item, items) {
    if (items.length == 0)
        return -1;
    for (idx = 0; idx < items.length; idx++) {
        if (items[idx].id == item.id)
            return idx;
    }
    return -1;
}


var itemModule = angular.module('itemModule', ['smfCqrs'])
    // https://github.com/angular/angular.js/issues/1277
    .directive([ 'focus', 'blur', 'keyup', 'keydown', 'keypress' ].reduce(function (container, name) {
        var directiveName = 'smf' + name[ 0 ].toUpperCase() + name.substr(1);

        container[ directiveName ] = [ '$parse', function ($parse) {
            return function (scope, element, attr) {
                var fn = $parse(attr[ directiveName ]);
                element.bind(name, function (event) {
                    scope.$apply(function () {
                        fn(scope, {
                            $event: event
                        });
                    });
                });
            };
        } ];

        return container;
    }, { }))
    .controller('ItemsCtrl', function ($scope, smfCqrs) {

        function createId() {
            return uuid.v1();
        }

        $scope.newItemName = "";

        $scope.items = [];
        smfCqrs.loadItems(function success(items) {
                $scope.items = items;
            },
            function error(err) {
                // TODO show error
            });

        $scope.addItem = function (input) {
            if ($scope.newItemName) {
                var item = new Item(createId(), $scope.newItemName);
                smfCqrs.createItem(
                    item,
                    function success(item) {
                        $scope.items.push(item);
                        delete( $scope.newItemName);
                        // TODO show success
                    },
                    function error(err) {
                        // TODO show error
                    });
            }
            document.getElementById(input).focus();
        }
    })
    .controller('ItemCtrl', function ($scope, smfCqrs) {

        function setEditMode() {
            $scope.editMode = ($scope.mouseOver || $scope.focused);
        }

        function backupItem() {
            console.log("got focus and backup.");
            $scope.itemBackup = $scope.item.clone();
        }

        function resetItem() {
            $scope.item = $scope.itemBackup.clone();
        }

        function saveChanges() {
            if ($scope.item.equals($scope.itemBackup)) {
                smfCqrs.saveChanges(
                    $scope.item,
                    function success(item) {
                        $scope.item = item;
                        // TODO show success
                    },
                    function error(err) {
                        // TODO show error
                        // TODO set value to value from server?
                    });
            }
        }

        $scope.item;

        $scope.mouseOver = false;
        $scope.focused = false;
        $scope.editMode = false;

        $scope.focus = function () {
            $scope.focused = true;
        }
        $scope.blur = function () {
            $scope.focused = false;
        }
        $scope.$watch('mouseOver', setEditMode);
        $scope.$watch('focused', setEditMode);

        $scope.$watch('focused', function (newVal, oldVal, scope) {
            function lostFocus() {
                return (oldVal != newVal && newVal == false);
            }

            function gotFocus() {
                return (oldVal != newVal && newVal == true);
            }

            if (lostFocus()) {
                if (!$scope.preventSave) {
                    delete $scope.preventSave;
                    saveChanges();
                }
            } else if (gotFocus()) {
                backupItem();
            }
        });

        $scope.press = function (event) {
            if (event.keyCode == 27) {
                $scope.focused = false;
                resetItem();
            }
            if (event.keyCode == 13) {
                $scope.focused = false;
                saveChanges();
                backupItem();
            }
        }

        $scope.delete = function () {
            $scope.preventSave = true;
            smfCqrs.deleteItem(
                $scope.item.id,
                function success() {
                    var idx = indexOfItem($scope.item, $scope.items);
                    if (idx >= 0) {
                        $scope.items.splice(idx, 1);
                    }
                    // TODO show success
                },
                function error(err) {
                    // TODO show error
                }
            )
        }

        $scope.$on('$destroy', function destroyController() {
            saveChanges();
        })
    });




