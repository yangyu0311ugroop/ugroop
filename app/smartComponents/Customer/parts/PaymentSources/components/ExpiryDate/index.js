import { ICON, DEFAULT } from 'appConstants';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { H5 } from 'viewComponents/Typography';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import styles from './styles';
import { makeStyles } from '../../../../../../components/material-ui';
import useSelectorCardData from '../../../../../Plan/hooks/useSelectorCardData';
import { isEmptyString } from '../../../../../../utils/stringAdditions';
const useStyles = makeStyles(styles);
function ExpiryDate(props) {
  const classes = useStyles();
  const { dense, className, id } = props;
  const contentClassName = () => classnames(classes.default, className);
  const { expYear, expMonth } = useSelectorCardData({ cardId: id });
  const renderLabel = () => <H5 dense={dense}>Exp: &nbsp;</H5>;
  const expiryDate = () => {
    if (!isEmptyString(expMonth) && !isEmptyString(expYear)) {
      return `${expMonth}/${expYear}`;
    }
    return '';
  };

  const renderDefault = () => {
    if (isEmptyString(expiryDate())) {
      return null;
    }

    return (
      <span className={contentClassName()}>
        {renderLabel()}
        <H5 className={classes.expiryDate} dense={dense}>
          {expiryDate()}
        </H5>
      </span>
    );
  };

  const { variant } = props;

  // pass in your custom variant if you need a different UI rendering
  return LOGIC_HELPERS.switchCase(variant, {
    [ICON]: renderDefault,
    [DEFAULT]: renderDefault,
  });
}

ExpiryDate.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.node,
  className: PropTypes.string,
  dense: PropTypes.bool,

  // resaga props
  expiryDate: PropTypes.string,
};

ExpiryDate.defaultProps = {
  variant: '',
  className: '',
  expiryDate: '',
};

export default React.memo(ExpiryDate);
