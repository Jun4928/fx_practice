const { L, tap, log, reduce, go1, go, takeAll, takeWhile, take } = require('./fx');

/**
 * 모나드, Promise
 * f . g
 * f(g(x)) = f(g(x))
 * f(g(x)) = x 이렇게 돌아가게 하고 싶은 모나드도 있고,,
 * 특정한 목적을 달성하기 위함인데, 모나드라는 동일한 범주가 있는 개념이다.
 * [1]: 모나드 안에 있는 값에다가.. g, f 를 적용한 값을 가지는 새로운 모나드를 만들기 위함이다.
 * JS 에서 array 도 모나드다.
 */

// const g = (a) => a + 1;
// const f = (a) => a * a;

// log(f(g(1)));

// [1]
//   .map(g)
//   .map(f)
//   .forEach((a) => log(a));

/**
 * Promise 도 모나드다
 * 비동기적으로 언제 끝날지 모르는 것을 기다렸다가.. 계속해서 합성을 하도록 하는 성질을 가진다.
 *
 * 목적: 에러 안나게 하려고!
 */

// Promise.resolve(1)
//   .then(g)
//   .then(f)
//   .then((a) => log(a));

/**
 *
 * Kleisli Composition, Promise
 * 프로그래밍은 수학적으로 표현할 수 없기 때문에..
 * f(g(x)) = g(x)
 * f(g(x)) = x
 * 이렇게 돌아가도록 할래!
 *
 * 에러가 나는 경우에 대해서는 위와같은 표현식으로 프로그래밍 할 수 있게 한다.
 */

// const g = JSON.parse;
// const f = ({ k }) => k;

// const fg = (x) => Promise.resolve(x).then(g).then(f);

// fg('{"k": 10}').then(log);

// fg('{"k: 10}')
//   .catch((e) => `sorry: ${e}`)
//   .then(log);

/**
 * Promise 는 성공과 실패를 값으로 다루는 형태의 모나드다.
 * 중요한것은 값이라는 것!!
 */

const delay = (time, a) => new Promise((resolve) => setTimeout(() => resolve(a), time));
// delay(100, 5).then(log);

/**
 * Promise 를 **일급** 으로 다룰 수 있다는 것이 POINT!
 */

// const a = 10;
// const b = delay(1000, 5);

// go1(a, log);
// go1(b, log);

// const asyncF = async () => {
//   const b = await go(
//     Promise.resolve(1),
//     (a) => a + 1,
//     (a) => delay(100, a + 10000),
//     (a) => delay(100, a + 10000),
//   );

//   log(b);
// };

// asyncF();

/**
 * 안전한 합성이 기반 되어야 한다.
 */

const Impt = {
  payments: {
    0: [
      { iid: 11, oid: 1 },
      { iid: 12, oid: 2 },
      { iid: 13, oid: 3 },
    ],
    1: [
      { iid: 14, oid: 4 },
      { iid: 15, oid: 5 },
      { iid: 16, oid: 6 },
    ],
    2: [
      { iid: 17, oid: 7 },
      { iid: 18, oid: 8 },
    ],
    3: [],
    4: [],
  },
  getPayments: (page) => {
    console.log(`http://..?page=${page}`);
    return delay(100, Impt.payments[page]);
  },
  cancelPayment: (paymentId) => Promise.resolve(`${paymentId}: cancelled successfully`),
};

const getOrders = (ids) => delay(100, [{ id: 1 }, { id: 3 }, { id: 7 }]);

const job = async () => {
  const payments = await go(
    L.range(Infinity),
    L.map(Impt.getPayments),
    takeWhile((ps) => ps.length),
    L.flat,
    takeAll,
  );

  const orderIds = await go(
    payments,
    L.map(({ oid }) => oid),
    getOrders,
    L.map(({ id }) => id),
    takeAll,
  );

  return Promise.all(
    go(
      payments,
      L.filter((p) => !orderIds.includes(p.oid)),
      L.map((p) => p.iid),
      takeAll,
      tap(log),
      L.map(Impt.cancelPayment),
    ),
  );
};

async function recur() {
  // Promise.all 로 두 일 모두 잘 처리 하고 나서,, 다시 recursive 하게 함수를 호출하게 한다.
  return Promise.all([delay(1000 * 3), job().then(log)]).then(recur);
}

recur();

// takeWhile((a) => a < 2, [Promise.resolve(1), Promise.resolve(2)]).then(log);
// log(takeWhile((a) => a < 2, [1, 2]));
