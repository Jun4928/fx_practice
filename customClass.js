/**
 * 객체지향도 이터러블 프로그래밍과 어우러질 수 있다.
 *
 * 얼마든지, 이터러블 프로그래밍과 함께 사용될 수 있다.
 * 이터러블 프로그래밍 혹은 함수형 프로그래밍이 객체 지향 패러다임을 대체하기 위해서
 * 존재한다고 생각할 필요는 없다.
 *
 * 얼마든지 어우를 수 있다.
 * for, if, i++ 언어 문법 자체를 대체하는 것이기때문에 얼마든지 어우러서 사용할 수 있다.
 *
 */

// class Model {
//   // 추상화는 객체지향으로 한다고 했더라도, 안에 로직을
//   // 이터러블 프로그래밍을 통해 작성할 수 있다.
//   // 인스턴스 메소드를 이터러블로 다루거나,
//   // 메소드가 이터러블이게 하면서 바깥으로 이터러블하게 리턴한다던가..
//   toJSON() {
//     //   for () {
//     // 	  if () i++
//     //   }
//   }
// }

const _ = require('fxjs');
const L = require('fxjs/Lazy');

class Model {
  constructor(attrs = {}) {
    this._attrs = attrs; // private 하게 다룬다.
  }

  get(k) {
    return this._attrs[k];
  }

  set(k, v) {
    this._attrs[k] = v;
    return this; // chaning 을 위해서 this 를 리턴한다.
  }
}

class Collection {
  constructor(models = []) {
    this._models = models;
  }

  at(idx) {
    return this._models[idx];
  }

  add(model) {
    this._models.push(model);
    return this;
  }

  *[Symbol.iterator]() {
    yield* this._models; // 아래와 같은 코드
    //     for (const model of this._models) {
    //       yield model;
    //     }
  }
}

const coll = new Collection();
coll.add(new Model({ id: 1, name: 'AA', age: 25 }));
coll.add(new Model({ id: 3, name: 'BB', age: 19 }));
coll.add(new Model({ id: 5, name: 'CC', age: 30 }));

// console.log(coll.at(2).get('name'));
// console.log(coll.at(1).get('id'));

// console.log(coll._models);
// console.log(coll);

_.go(
  L.range(3),
  L.map((idx) => coll.at(idx)),
  L.map((m) => m.get('name')),
  //   _.each(_.log),
);

// 위 방향보다는 컬렉션 자체에서 이터러블을 지원하도록 하는 것이 좋다.
// 그럼 아래 코드처럼 collection 을 go 의 첫번쨰 인자로 사용할 수 있다.

_.go(
  coll,
  L.map((m) => m.get('name')),
  //   _.each(_.log),
);

// collection 에서 Symbol.iterator 메소드에 가진 모든 모델들을 yield 하도록 한다.
// 이터러블로 순회할 수 있게 해주고, Model 이어서,, collection 넣을 때부터 알고 있기 때문에..
// 보조함수를 통해서 접근하고 조작가능하다.

_.go(
  coll,
  _.each((m) => m.set('name', m.get('name').toLowerCase())),
  //   _.log,
);

module.exports = {
  Model,
  Collection,
};
