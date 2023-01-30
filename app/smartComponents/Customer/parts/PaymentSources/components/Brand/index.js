import { ICON, DEFAULT } from 'appConstants';
import classnames from 'classnames';
import Icon from 'viewComponents/Icon';
import PropTypes from 'prop-types';
import React from 'react';
import { H5 } from 'viewComponents/Typography';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { makeStyles } from '../../../../../../components/material-ui';
import styles from './styles';
import useSelectorCardData from '../../../../../Plan/hooks/useSelectorCardData';
const useStyles = makeStyles(styles);
function Brand(props) {
  const classes = useStyles();
  const { className, dense, variant, id } = props;

  const contentClassName = () => classnames(classes.default, className);
  const { brand } = useSelectorCardData({
    cardId: id,
  });
  const renderDefault = () => {
    if (!brand) {
      return null;
    }

    return (
      <span className={contentClassName()}>
        <Icon icon="lnr-credit-card" size="small" className={classes.icon} />
        <H5 className={classes.brand} dense={dense}>
          {brand}
        </H5>
      </span>
    );
  };

  // pass in your custom variant if you need a different UI rendering
  return LOGIC_HELPERS.switchCase(variant, {
    [ICON]: renderDefault,
    [DEFAULT]: renderDefault,
  });
}

Brand.propTypes = {
  variant: PropTypes.node,
  className: PropTypes.string,
  dense: PropTypes.bool,
  brand: PropTypes.string,
};

Brand.defaultProps = {
  variant: '',
  className: '',
  brand: '',
};

export default React.memo(Brand);
