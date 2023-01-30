import { COGNITO_ACCOUNTSTORE } from 'appConstants';
import PropTypes from 'prop-types';
const rootNodeId = {
  value: [COGNITO_ACCOUNTSTORE, 'account', 'rootnodeid'],
  type: PropTypes.number,
  defaultValue: 0,
};
const userId = {
  value: [COGNITO_ACCOUNTSTORE, 'account', 'id'],
  type: PropTypes.number,
  defaultValue: 0,
};

export const COGNITO_STORE_SELECTOR = {
  rootNodeId,
  userId,
};
