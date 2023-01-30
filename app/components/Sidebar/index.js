import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
function SideBar(props) {
  const { children, ...rest } = props;
  return (
    <Grid item {...rest}>
      {children}
    </Grid>
  );
}

SideBar.propTypes = {
  children: PropTypes.node,
};
export default SideBar;
