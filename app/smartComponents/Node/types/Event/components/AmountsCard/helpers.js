import { ADMIN_TOUR_SETTINGS } from 'appConstants';
import get from 'lodash/get';

const EVENT_TYPES = {
  0: 'accommodation',
  1: 'activity',
  3: 'transportation',
};

const normaliseDetailAmounts = (key, tourSettings) => (
  accu,
  { node: { currency, [key]: amount, event, flightBooking } },
) => {
  if (!event && !flightBooking) return accu;

  if (!currency) return accu;

  let eventType;

  if (event) {
    const { type, activity } = event;
    eventType = EVENT_TYPES[type];

    if (activity && activity.type === 1) {
      eventType = 'food';
    }
  }

  if (flightBooking) {
    eventType = 'transportation';
  }

  const homeCurrency = get(tourSettings, [
    ADMIN_TOUR_SETTINGS.HOME_CURRENCY,
    'value',
  ]);
  if (currency === homeCurrency) {
    return {
      ...accu,
      [eventType]: accu[eventType] + amount,
      total: accu.total + amount,
    };
  }

  const rates = parseFloat(
    get(tourSettings, [
      ADMIN_TOUR_SETTINGS.EXCHANGE_RATES(currency, homeCurrency),
      'value',
    ]),
  );

  if (!rates) {
    return {
      ...accu,
      unknownRates: accu.unknownRates.concat(currency),
    };
  }

  return {
    ...accu,
    [eventType]: accu[eventType] + amount / rates,
    total: accu.total + amount / rates,
  };
};

const reduceSettings = (exRates, settings) => (accu, key) => {
  const rates = exRates[key];

  const homeCurrency = get(settings, [
    ADMIN_TOUR_SETTINGS.HOME_CURRENCY,
    'value',
  ]);

  const settingKey = ADMIN_TOUR_SETTINGS.EXCHANGE_RATES(key, homeCurrency);
  const settingId = get(settings, [settingKey, 'id'], 0);

  return accu.concat({
    settingId,
    data: {
      customData: { key: settingKey, value: rates },
    },
  });
};

const reduceCosts = tourSettings => (acc, cost) => {
  const homeCurrency = get(tourSettings, [
    ADMIN_TOUR_SETTINGS.HOME_CURRENCY,
    'value',
  ]);

  const nodeActual = get(cost, ['node', 'actualAmount']);
  const nodeBudget = get(cost, ['node', 'budgetAmount']);
  const nodeCurrency = get(cost, ['node', 'currency']);

  if (!nodeCurrency) return acc;

  if (nodeCurrency === homeCurrency) {
    return {
      ...acc,
      budgetTotal: acc.budgetTotal + nodeBudget,
      actualTotal: acc.actualTotal + nodeActual,
    };
  }

  const rates = get(tourSettings, [
    ADMIN_TOUR_SETTINGS.EXCHANGE_RATES(nodeCurrency, homeCurrency),
    'value',
  ]);

  if (!rates) {
    return {
      ...acc,
      unknownRates:
        acc.unknownRates.indexOf(nodeCurrency) === -1
          ? acc.unknownRates.concat(nodeCurrency)
          : acc.unknownRates,
      allRates:
        acc.allRates.indexOf(nodeCurrency) === -1
          ? acc.allRates.concat(nodeCurrency)
          : acc.allRates,
    };
  }

  return {
    ...acc,
    budgetTotal: acc.budgetTotal + nodeBudget / rates,
    actualTotal: acc.actualTotal + nodeActual / rates,
    allRates:
      acc.allRates.indexOf(nodeCurrency) === -1
        ? acc.allRates.concat(nodeCurrency)
        : acc.allRates,
  };
};

export const AMOUNT_HELPERS = {
  normaliseDetailAmounts,
  reduceSettings,
  reduceCosts,
};
