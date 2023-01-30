import { COGNITO_ACCOUNTSTORE } from 'appConstants';

export const hideCard = ({ name }) => [
  COGNITO_ACCOUNTSTORE,
  'userSettings',
  'dashboard',
  name,
];

export const CONFIG = {
  value: {
    hide: hideCard,
  },
  setValue: {
    hide: hideCard,
  },
};
