import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
function Wrapper(props) {
  const { children, ...rest } = props;
  return (
    <Grid item {...rest}>
      {children}
    </Grid>
  );
}

Wrapper.propTypes = {
  children: PropTypes.node,
};
export default Wrapper;
