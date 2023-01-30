import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
const styleSheet = {
  root: {
    width: '100% !important',
    height: '100vh',
  },
};

function ContentWrapper(props) {
  const { children, classes, className, ...rest } = props;

  return (
    <Grid container className={`${classes.root} ${className}`} {...rest}>
      {children}
    </Grid>
  );
}

ContentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  fullHeight: PropTypes.bool,
};

const StyleContentWrapper = withStyles(styleSheet, { name: 'ContentWrapper' })(
  ContentWrapper,
);
export const ContentWrapperTest = ContentWrapper;
export default StyleContentWrapper;
