import { normalize } from 'normalizr';
import { compose } from 'redux';
import UserStoreSchema from 'datastore/userStore/schema';
import { DATASTORE_UTILS } from 'datastore';
import orderBy from 'lodash/orderBy';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import _ from 'lodash';

export const retainValue = store => store;

const normaliseRoles = (result, { userId }) => {
  // This filtering could be done in the backend
  // to lessen the process the front-end is doing
  const filteredTours = orderBy(
    result.tours.filter(tour => tour.role !== 'owner'),
    'date',
    'desc',
  );
  const filteredOrgs = orderBy(result.orgs, 'createdAt', 'desc');
  const orgs = normalize(filteredOrgs, UserStoreSchema.organisation);
  const tours = normalize(filteredTours, UserStoreSchema.tour);

  const orgUsers = LOGIC_HELPERS.ifElse(
    !orgs.result.length > 0,
    retainValue,
    DATASTORE_UTILS.upsertObject(orgs.entities.organisation),
  );
  const userNodes = LOGIC_HELPERS.ifElse(
    !tours.result.length > 0,
    retainValue,
    DATASTORE_UTILS.upsertObject(tours.entities.tour),
  );
  const setValue = {
    person: compose(
      DATASTORE_UTILS.upsertArray(`${userId}.orgUsers`, orgs.result),
      DATASTORE_UTILS.upsertArray(`${userId}.userNodes`, tours.result),
    ),
    orgUsers,
    userNodes,
    raw: result,
  };
  return setValue;
};

const addUser = result => {
  const normalizedData = normalize(result.data, UserStoreSchema.plans);
  const products = _.mapValues(normalizedData.entities.plans, o => o.planIds);
  const plans = _.reduce(
    _.mapValues(normalizedData.entities.plans, o => o.plans),
    (all, value) => _.merge(all, value),
    {},
  );
  return {
    plans,
    products,
  };
};

export const USER_APIS_UTILS = {
  normaliseRoles,
  addUser,
};
