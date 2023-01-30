import React, { PureComponent } from 'react';
import MuiTooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from './styles';

export const DEFAULT_ENTER_DELAY = 700;

export class Tooltip extends PureComponent {
  render = () => {
    const {
      children,
      tooltipProps,
      title,
      placement,
      isLight,
      classes,
      open,
      interactive,
      enterDelay,
    } = this.props;

    const tooltipClasses = {};

    if (isLight) {
      tooltipClasses.tooltip = classes.lightTooltip;
    }
    tooltipClasses.popper = classes.popper;

    return (
      <MuiTooltip
        open={open}
        title={title}
        placement={placement}
        classes={tooltipClasses}
        interactive={interactive}
        enterDelay={enterDelay}
        disableFocusListener
        {...tooltipProps}
      >
        {children}
      </MuiTooltip>
    );
  };
}

Tooltip.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  tooltipProps: PropTypes.object,
  title: PropTypes.node,
  isLight: PropTypes.bool,
  open: PropTypes.bool,
  interactive: PropTypes.bool,
  placement: PropTypes.string,
  enterDelay: PropTypes.number,
};

Tooltip.defaultProps = {
  isLight: false,
  tooltipProps: {},
};

export default withStyles(styles, { name: 'UGTooltip' })(Tooltip);
