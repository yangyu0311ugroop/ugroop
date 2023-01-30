import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridItem from 'components/GridItem';
import PropTypes from 'prop-types';
import styles from './styles';

export const TemplateRoundButtonWrapper = ({ classes, children, ...props }) => (
  <GridItem className={classes.root} {...props}>
    {children}
  </GridItem>
);

TemplateRoundButtonWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

TemplateRoundButtonWrapper.defaultProps = {};

export default withStyles(styles, { name: 'TemplateRoundButtonWrapper' })(
  TemplateRoundButtonWrapper,
);
