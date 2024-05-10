export default class ItemModel {
constructor(itemCode, itemName,description, itemPrice, itemQty) {
    this._itemCode = itemCode;
    this._itemName = itemName;
    this._description = description;
    this._itemPrice = itemPrice;
    this._itemQty = itemQty;
}

    get itemCode() {
        return this._itemCode;
    }

    set itemCode(value) {
        this._itemCode = value;
    }

    get itemName() {
        return this._itemName;
    }

    set itemName(value) {
        this._itemName = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get itemPrice() {
        return this._itemPrice;
    }

    set itemPrice(value) {
        this._itemPrice = value;
    }

    get itemQty() {
        return this._itemQty;
    }

    set itemQty(value) {
        this._itemQty = value;
    }
}