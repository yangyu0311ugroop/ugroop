import { DEFAULT, TEXT } from 'appConstants';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { H2, P } from 'viewComponents/Typography';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import momentjs from 'moment';
import { useSelector } from 'react-redux';
import styles from './styles';
import { makeStyles } from '../../../../../components/material-ui';
import { makeSingleSelect } from '../../../../../datastore/selectUtility';
import { CUSTOMER_RESELECTOR } from '../../../../../datastore/customerDataImmerStore/selectors';
const useStyles = makeStyles(styles);
function CurrentPeriodEndDate(props) {
  const classes = useStyles();
  const { className, id, variant } = props || {};
  const periodEndDate = useSelector(state =>
    makeSingleSelect(CUSTOMER_RESELECTOR.selectCurrentSubscriptionAttribute)(
      state,
      {
        subscriptionId: id,
        attribute: 'current_period_end',
      },
    ),
  );

  const contentClassName = () => classnames(classes.default, className);

  const getDateFormat = () => 'MMMM DD, YYYY';

  const renderTextOnly = () => {
    if (!periodEndDate) {
      return <P className={classes.noWordBreak}>—</P>;
    }

    const toDateVal = momentjs(new Date(periodEndDate * 1000));
    return (
      <P className={classes.noWordBreak}>{toDateVal.format(getDateFormat())}</P>
    );
  };

  const renderDefault = () => {
    if (!periodEndDate) {
      return null;
    }

    const toDateVal = momentjs(new Date(periodEndDate * 1000));
    return (
      <span className={contentClassName()}>
        <H2 className={classes.content}>
          {toDateVal.format(getDateFormat())}{' '}
        </H2>
      </span>
    );
  };

  // pass in your custom variant if you need a different UI rendering
  return LOGIC_HELPERS.switchCase(variant, {
    [TEXT]: renderTextOnly,
    [DEFAULT]: renderDefault,
  });
}

CurrentPeriodEndDate.propTypes = {
  variant: PropTypes.node,
  className: PropTypes.string,
  periodEndDate: PropTypes.number,
};

CurrentPeriodEndDate.defaultProps = {
  variant: '',
  className: '',
};

export default CurrentPeriodEndDate;
