const _ = require('fxjs');
const L = require('fxjs/Lazy');
const { Model, Collection } = require('./customClass');

class Product extends Model {}

class Products extends Collection {
  totalPrice() {
    return _.go(
      this,
      L.map((p) => p.get('price')),
      _.reduce((a, b) => a + b),
    );
  }
}

const products = new Products();
products.add(new Product({ id: 1, price: 10000 }));
console.log(products.totalPrice());
products.add(new Product({ id: 3, price: 25000 }));
console.log(products.totalPrice());
products.add(new Product({ id: 5, price: 35000 }));
console.log(products.totalPrice());
