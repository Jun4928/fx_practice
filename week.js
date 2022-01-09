const dayjs = require('dayjs');
const ko = require('dayjs/locale/ko');
const weekday = require('dayjs/plugin/weekday');
dayjs.locale({ ...ko, weekStart: 1 });
dayjs.extend(weekday);
const F = require('fxjs/Strict');

const sumOfObjectProperties = F.reduce(
  (acc, obj) => (
    F.go(
      obj,
      F.entries,
      F.each(([k, v]) => (acc[k] = typeof v === 'number' ? acc[k] + v : acc[k])),
    ),
    acc
  ),
);

/**
 *
 * @param {number} page
 * @param {number} size
 */
const paging = (page, size) => {
  const offset = page * size;
  const limit = offset + size;

  const slice2 = F.curryN(2, F.slice);

  return size === 0 ? F.takeAll : slice2(offset, limit);
};

const DAY = 'day';

const startDate = '2021-12-20';
const getDateOfweek = (stat_date, day) => dayjs(stat_date).weekday(day).format('YYYY-MM-DD');
const getYearWeekDay = (stat_date) => dayjs(stat_date).format('YYYY-MM-DD');
const getYearWeek = (stat_date) => `${getDateOfweek(stat_date, 0)}~${getDateOfweek(stat_date, 6)}`;
const getYearMonth = (stat_date) => dayjs(stat_date).format('YYYY-MM');

const transformStatDate = (stat_date, unit) =>
  F.goS(
    stat_date,
    (stat_date) => (unit === 'day' ? F.stop(getYearWeekDay(stat_date)) : stat_date),
    F.ifElse(() => unit === 'week', getYearWeek, getYearMonth),
  );

const stats = () =>
  Promise.resolve(
    F.go(
      F.range(0, 14),
      F.map((e) => ({ stat_date: dayjs(startDate).add(e, 'day').format('YYYY-MM-DD'), count: e, price: e * 1000 })),
    ),
  );

const erp = () =>
  Promise.resolve(
    F.go(
      F.range(0, 14),
      F.map((e) => ({ stat_date: dayjs(startDate).add(e, 'day').format('YYYY-MM-DD'), ad_price: e * 1000 })),
    ),
  );

const service = async (query) => {
  const { unit, page, size } = query;

  const groupByUnit = F.pipeS(
    F.map(({ stat_date, ...rest }) => ({
      stat_date: transformStatDate(stat_date, unit),
      ...rest,
    })),
    F.stopIf(() => unit === 'day'),
    F.groupBy(({ stat_date }) => stat_date),
    F.mapObject(sumOfObjectProperties),
    F.values,
  );

  const [s, e] = await F.goS(Promise.all([stats(), erp()]), F.map(groupByUnit));

  const sortAndPaging = F.pipe(
    F.sortByDesc(({ stat_date }) => stat_date),
    paging(page, size),
  );

  return F.goS([s, e], F.map(sortAndPaging), F.prepend([s.length]));
};

const main = () => {
  const pageSize = {
    page: 0,
    size: 2,
  };

  F.go(service({ unit: 'day', ...pageSize }), F.tap(F.log));
  F.go(service({ unit: 'week', ...pageSize }), F.tap(F.log));
  F.go(service({ unit: 'month', ...pageSize }), F.tap(F.log));
};

main();
