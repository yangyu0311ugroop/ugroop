import { LOCAL_USER_STORE } from 'appConstants';
import { organisationTours } from 'containers/Dashboard/components/Tours/components/Card/config';

export const STARS_SELECTOR = ({ userId }) => [
  LOCAL_USER_STORE,
  `${userId}`,
  'stars',
];

export const CONFIG = {
  value: {
    stars: STARS_SELECTOR,
    scope: organisationTours,
  },
};
