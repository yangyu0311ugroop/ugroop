import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from 'ugcomponents/Buttons/Button';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import styles from './styles';

export const TemplateRoundButton = ({ classes, label, children, ...props }) => (
  <Tooltip placement="top" title={label}>
    <Button className={classes.root} {...props}>
      {children}
    </Button>
  </Tooltip>
);

TemplateRoundButton.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  label: PropTypes.node.isRequired,
};

TemplateRoundButton.defaultProps = {};

export default withStyles(styles, { name: 'TemplateRoundButton' })(
  TemplateRoundButton,
);
