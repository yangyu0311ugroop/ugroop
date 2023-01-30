import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import { Rating as MuiRating } from '@material-ui/lab';
import styles from './styles';

export const Rating = ({ classes, readOnly, ...rest }) => (
  <MuiRating size="large" readOnly={readOnly} {...rest} />
);

Rating.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  disabled: PropTypes.bool,
  value: PropTypes.number,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,

  // resaga props
};

Rating.defaultProps = {
  disabled: false,
  readOnly: false,
};

export default compose(withStyles(styles, { name: 'Rating' }))(Rating);
