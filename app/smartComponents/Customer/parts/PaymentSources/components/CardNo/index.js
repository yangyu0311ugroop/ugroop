import { ICON, DEFAULT } from 'appConstants';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { H5 } from 'viewComponents/Typography';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import styles from './styles';
import { makeStyles } from '../../../../../../components/material-ui';
import useSelectorCardData from '../../../../../Plan/hooks/useSelectorCardData';
const useStyles = makeStyles(styles);
function CardNo(props) {
  const classes = useStyles();
  const { className, dense, id } = props;

  const { cardNo } = useSelectorCardData({ cardId: id });
  const contentClassName = () => classnames(classes.default, className);

  const renderLabel = () => <H5 dense={dense}>ends in &nbsp;</H5>;

  const renderDefault = () => {
    if (!cardNo) {
      return null;
    }

    return (
      <span className={contentClassName()}>
        {renderLabel()}
        <H5 className={classes.card} dense={dense}>
          {cardNo}
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

CardNo.propTypes = {
  // parent props
  variant: PropTypes.node,
  className: PropTypes.string,
  dense: PropTypes.bool,
};

CardNo.defaultProps = {
  variant: '',
  className: '',
};

export default React.memo(CardNo);
