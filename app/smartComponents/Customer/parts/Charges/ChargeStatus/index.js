import { ICON, DEFAULT } from 'appConstants';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from 'viewComponents/Icon';
import Tooltip from 'viewComponents/Tooltip';
import { H5 } from 'viewComponents/Typography';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import styles from './styles';
import { STATUS } from './constants';
import { makeStyles } from '../../../../../components/material-ui';
import useSelectorChargeData from '../../../../Plan/hooks/useSelectorChargeData';
const useStyles = makeStyles(styles);
function ChargeStatus(props) {
  const classes = useStyles();
  const { className, variant, id } = props;
  const { status, message } = useSelectorChargeData({
    chargeId: id,
  });
  const contentClassName = () => classnames(classes.default, className);

  const isFailed = () => props.status === STATUS.FAILURE_CODE;

  const renderIcon = () => {
    const icons = LOGIC_HELPERS.switchCase(status, {
      [STATUS.FAILURE_CODE]: 'lnr-cross2',
      [DEFAULT]: 'lnr-check',
    });
    return (
      <Tooltip title={message} placement="top">
        <Icon
          icon={icons}
          size="extraSmall"
          className={classnames(
            classes.icon,
            LOGIC_HELPERS.ifElse(isFailed(), classes.failure, classes.success),
          )}
        />
      </Tooltip>
    );
  };

  const renderDefault = () => {
    if (!status) {
      return null;
    }

    return (
      <span className={contentClassName()} data-testid="chargeStatus">
        <H5
          className={classnames(
            classes.content,
            LOGIC_HELPERS.ifElse(isFailed(), classes.failure),
          )}
        >
          {LOGIC_HELPERS.ifElse(
            status === STATUS.SUCCESS_CODE,
            STATUS.SUCCESS,
            status,
          )}{' '}
        </H5>
      </span>
    );
  };

  // pass in your custom variant if you need a different UI rendering
  return LOGIC_HELPERS.switchCase(variant, {
    [ICON]: renderIcon(),
    [DEFAULT]: renderDefault,
  });
}

ChargeStatus.propTypes = {
  variant: PropTypes.node,
  className: PropTypes.string,
};

ChargeStatus.defaultProps = {
  variant: '',
  className: '',
};

export default React.memo(ChargeStatus);
