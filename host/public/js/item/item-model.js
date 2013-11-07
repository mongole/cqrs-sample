/**
 * Created by andi on 11/6/13.
 */


(function (exports) {

    // your code goes here

    exports.Item = function (id, name) {
        this.id = id;
        this.name = name;
        this.clone = function () {
            return new item_model.Item(this.id, this.name);
        }
        this.equals = function (rhs) {
            if(!rhs) return false;
            return ( this.id == rhs.id &&
                this.name == rhs.name);
        }
    }
    exports.indexOfItem = function (item, items) {
        if (items.length == 0)
            return -1;
        for (idx = 0; idx < items.length; idx++) {
            if (items[idx].id == item.id)
                return idx;
        }
        return -1;
    }


})(typeof exports === 'undefined' ? this['item_model'] = {} : exports);



