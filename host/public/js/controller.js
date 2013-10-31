/**
 * Created by andi on 10/29/13.
 */


Item = function (id, name) {
    this.id = id;
    this.name = name;
}

function indexOfItem(item, items) {
    if( items.length == 0)
        return -1;
    for( idx = 0; idx < items.length; idx++) {
        if(items[idx].id == item.id)
            return idx;
    }
    return -1;
}

function ItemsCtrl($scope) {

    function createId() {
        return uuid.v1();
    }

    $scope.itemName = "";

    $scope.items = new Array();
    $scope.items.push(new Item(createId(), "Item 1"));
    $scope.items.push(new Item(createId(), "Item 2"));

    $scope.addItem = function (input) {
        if ($scope.itemName) {
            console.log("added item with name: " + $scope.itemName);
            $scope.items.push(new Item(createId(), $scope.itemName));
            delete( $scope.itemName);
        }
        document.getElementById(input).focus();
    }
}

function ItemCtrl($scope) {

    $scope.item;
    $scope.editItem;

    $scope.editMode = false;
    $scope.edit = function() {
        $scope.editItem = new Item( $scope.item.id, $scope.item.name);
        $scope.editMode = true;
    }

    $scope.cancel = function() {
        $scope.editMode = false;
        delete $scope.editItem;
    }

    $scope.save = function() {

        var idx = indexOfItem($scope.item, $scope.items);
        $scope.item = new Item( $scope.editItem.id, $scope.editItem.name);
        $scope.items[idx] = $scope.item;
        $scope.editMode = false;
    }

    $scope.delete = function() {
        var idx = indexOfItem($scope.item, $scope.items);
        if( idx >= 0)
            $scope.items.splice(idx,1);
    }
}