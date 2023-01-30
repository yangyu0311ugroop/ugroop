/**
 * Created by quando on 30/3/17.
 */
import { makeCallback } from './helpers/makeCallback';
import { makePromise, makeCancelable } from './helpers/promiseHelper';
export moment from './helpers/moment';
export arrays from './helpers/arrays';

export { makeCallback, makePromise, makeCancelable };

const underConstruction = () => {
  // eslint-disable-next-line no-alert
  alert('This feature is under construction');
};

export default {
  underConstruction,
};
