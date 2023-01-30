import { LINK, DEFAULT } from 'appConstants';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { H5 } from 'viewComponents/Typography';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import styles from './styles';
import { makeStyles } from '../../../../../components/material-ui';
import useSelectorChargeData from '../../../../Plan/hooks/useSelectorChargeData';
const useStyles = makeStyles(styles);
function ReceiptURL(props) {
  const classes = useStyles();
  const { className, variant, id } = props;
  const { receiptURL } = useSelectorChargeData({
    chargeId: id,
  });
  const contentClassName = () => classnames(classes.default, className);

  const renderLink = () => {
    if (!receiptURL) {
      return null;
    }

    return (
      <span className={contentClassName()}>
        <a href={receiptURL} target="_blank">
          View Receipt
        </a>
      </span>
    );
  };

  const renderDefault = () => {
    if (!receiptURL) {
      return null;
    }

    return (
      <span className={contentClassName()}>
        <H5 className={classes.content}>View Receipt</H5>
      </span>
    );
  };

  // pass in your custom variant if you need a different UI rendering
  return LOGIC_HELPERS.switchCase(variant, {
    [LINK]: renderLink,
    [DEFAULT]: renderDefault,
  });
}

ReceiptURL.propTypes = {
  variant: PropTypes.node,
  className: PropTypes.string,
  receiptURL: PropTypes.string,
};

ReceiptURL.defaultProps = {
  variant: '',
  className: '',
};

export default React.memo(ReceiptURL);
