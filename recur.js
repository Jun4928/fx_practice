const { L, takeAll, go, log, tap, take } = require('./fx');

const delay = (time, a) => new Promise((resolve) => setTimeout(() => resolve(a), time));

const cancel = (id) => Promise.resolve(`${id}: cancelled`);

const job = async () => {
  const delayed = await delay(1000, [1, 2, 3, 4, 5]);
  return Promise.all(
    go(
      delayed,
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
