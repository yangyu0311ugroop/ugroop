/**
 * Created by paulcedrick on 6/15/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import styles from './styles';

export const UGCard = ({ classes, children, className, withBorder, style }) => (
  <div
    className={classNames(
      classes.card,
      { [classes.cardBorder]: withBorder },
      className,
    )}
    style={style}
  >
    {children}
  </div>
);

UGCard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object,
  withBorder: PropTypes.bool,
  style: PropTypes.object,
};

UGCard.defaultProps = {
  className: '',
  style: {},
  withBorder: true,
};

export default withStyles(styles)(UGCard);
