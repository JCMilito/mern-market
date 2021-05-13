export default class Product {

    name: string;
    price: number;
    stock: number;
    _id?: string;

    constructor(name: string, price: number, stock: number, _id?: string) {
        if (_id !== undefined) {
            this._id = _id;
        }        
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

}