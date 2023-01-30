import { DEFAULT } from 'appConstants';
import { PERSON_STORE_RESELECTORS } from 'datastore/personDataStore/selectorsViaConnect';
import { PHONE_STORE_RESELECTORS } from 'datastore/phoneStore/selectorsViaConnect';
// eslint-disable-next-line no-unused-vars
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { isEmptyString } from 'utils/stringAdditions';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  root: {},
}));

const useGetDefaultNumber = userId => {
  const phoneIds = useSelector(state =>
    PERSON_STORE_RESELECTORS.getUserPhones(state, userId),
  );
  const defaultNumber = useSelector(state =>
    PHONE_STORE_RESELECTORS.getDefaultPhoneNumber(state, phoneIds),
  );

  return isEmptyString(defaultNumber) ? (
    <span data-testid="default-number-empty" />
  ) : (
    defaultNumber
  );
};

export const DefaultPhoneNumber = memo(({ id, variant }) => {
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();
  const value = useGetDefaultNumber(id);

  return LOGIC_HELPERS.switchCase(variant, {
    [DEFAULT]: value,
  });
});

DefaultPhoneNumber.propTypes = {
  id: PropTypes.number,
  variant: PropTypes.string,
};
