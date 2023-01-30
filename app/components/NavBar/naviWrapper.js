import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

function NavWrapper(props) {
  const { children, ...rest } = props;
  return (
    <Grid container {...rest} spacing={0}>
      {children}
    </Grid>
  );
}

NavWrapper.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.any,
};

NavWrapper.defaultProps = {
  classes: {},
};

export default NavWrapper;
