import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'components/material-ui';
import stylesheet from './styles';

export const DialogTitleHeading = ({ classes, children, ...rest }) => (
  <div className={classes.root} {...rest}>
    {children}
  </div>
);

DialogTitleHeading.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  children: PropTypes.any,
};

DialogTitleHeading.defaultProps = {
  children: null,
};

export default withStyles(stylesheet, {
  name: 'ugcomponents/DialogForm/Complex/TitleHeading',
})(DialogTitleHeading);
