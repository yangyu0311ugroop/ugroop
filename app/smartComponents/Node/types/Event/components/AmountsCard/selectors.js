import { ADMIN_TOUR_SETTINGS, EVENT_STORE, NODE_STORE } from 'appConstants';
import get from 'lodash/get';

export const selectAmountLastUpdated = state =>
  state.get(EVENT_STORE).get('lastUpdated');

export const selectTourSettings = (state, props) => {
  const nodeSettings = state.get(NODE_STORE).get('nodeSettings');
  return get(nodeSettings, `${props.templateId}`);
};

export const selectHomeCurrency = (state, props) =>
  get(state.get(NODE_STORE).get('nodeSettings'), [
    props.templateId,
    ADMIN_TOUR_SETTINGS.HOME_CURRENCY,
    'value',
  ]);

export const selectLastCurrencyAdded = (state, props) =>
  get(state.get(NODE_STORE).get('nodeSettings'), [
    props.templateId,
    ADMIN_TOUR_SETTINGS.LAST_CURRENCY_ADDED,
  ]);
