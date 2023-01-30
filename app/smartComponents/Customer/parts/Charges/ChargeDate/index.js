import { DEFAULT, TEXT } from 'appConstants';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { H5, P } from 'viewComponents/Typography';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import momentjs from 'moment';
import { makeStyles } from '../../../../../components/material-ui';
import styles from '../ChargePaymentMethod/styles';
import useSelectorChargeData from '../../../../Plan/hooks/useSelectorChargeData';
const useStyles = makeStyles(styles);
function ChargeDate(props) {
  const classes = useStyles();
  const { className, variant, id } = props;
  const contentClassName = () => classnames(classes.default, className);
  const { created } = useSelectorChargeData({
    chargeId: id,
  });
  const getDateFormat = () => 'YYYY-MM-DD hh:mm a';

  const renderTextOnly = () => {
    if (!created) {
      return null;
    }

    const toDateVal = momentjs(new Date(created * 1000));
    return (
      <P className={classes.noWordBreak}>{toDateVal.format(getDateFormat())}</P>
    );
  };

  const renderDefault = () => {
    if (!created) {
      return null;
    }

    const toDateVal = momentjs(new Date(created * 1000));
    return (
      <span className={contentClassName()} data-testid="chargeDate">
        <H5 className={classes.content}>
          {toDateVal.format(getDateFormat())}{' '}
        </H5>
      </span>
    );
  };

  // pass in your custom variant if you need a different UI rendering
  return LOGIC_HELPERS.switchCase(variant, {
    [TEXT]: renderTextOnly,
    [DEFAULT]: renderDefault,
  });
}

ChargeDate.propTypes = {
  variant: PropTypes.node,
  className: PropTypes.string,
  created: PropTypes.number,
};

ChargeDate.defaultProps = {
  variant: '',
  className: '',
};

export default React.memo(ChargeDate);
