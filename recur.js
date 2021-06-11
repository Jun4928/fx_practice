const { L, takeAll, go, log, tap, take } = require('./fx');

const delay = (time, a) => new Promise((resolve) => setTimeout(() => resolve(a), time));

const cancel = (id) => Promise.resolve(`${id}: cancelled`);

const job = async () => {
  //   return Promise.all(
  //     go(
  //       delay(1000, [1, 2, 3, 4, 5]),
  //       L.map((a) => a + 1),
  //       [Promise.resolve(1), Promise.resolve(2)],
  //     ),
  //   );

  //   return Promise.all(
  //     go(
  //       delay(1000, [1, 2, 3, 4, 5]),
  //       L.map((a) => a + 1),
  //       takeAll,
  //     ),
  //   );

  return Promise.all(
    go(
      delay(1000, [1, 2, 3, 4, 5]),
      L.map((a) => a + 1),
      takeAll,
      tap(log),
      L.map(cancel),
    ),
  );
};

async function recur() {
  return Promise.all([delay(1000 * 3), job().then(log)]).then(recur);
}

recur();
