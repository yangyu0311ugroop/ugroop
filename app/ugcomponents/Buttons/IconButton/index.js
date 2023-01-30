import Button from '@material-ui/core/Button';
import { DEFAULT, FLAT_BUTTON, ICON_BUTTON } from 'appConstants';
import classNames from 'classnames';
import { withStyles } from 'components/material-ui';
import { omit } from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Tooltip from 'viewComponents/Tooltip';

import style from './style';

export class IconButton extends PureComponent {
  ownProps = () =>
    omit(this.props, [
      'variant',
      'dark',
      'color',
      'tooltip',
      'tooltipPlacement',
      'tooltipClassName',
      'tooltipClasses',
      'enterDelay',
      'disableTriggerFocus',
      'transparent',
      'isLoading',
    ]);

  buttonColor = () => {
    const { classes, variant, dark, color } = this.props;

    if (variant === FLAT_BUTTON) {
      return LOGIC_HELPERS.ifElse(
        dark,
        classes[`${color}DarkFlat`],
        classes[`${color}Flat`],
      );
    }

    return LOGIC_HELPERS.ifElse(dark, classes[`${color}Dark`], classes[color]);
  };

  renderButton = (variantProps = {}, variantClassName) => {
    const {
      classes,
      disabled,
      onClick,
      className,
      children,
      type,
      ...props
    } = this.ownProps();

    return (
      <Button
        disabled={disabled}
        className={classNames(
          classes.button,
          this.buttonColor(),
          variantClassName,
          className,
        )}
        onClick={onClick}
        disableRipple
        type={type}
        {...variantProps}
        {...props}
      >
        {children}
      </Button>
    );
  };

  // backward compatible
  renderDefault = () => {
    const { tooltip } = this.props;

    const renderButton = this.renderButton();

    if (!tooltip) return renderButton;

    return this.renderTooltipButton(renderButton);
  };

  renderIconButton = () => {
    const { tooltip } = this.props;

    return this.renderButton({ title: tooltip });
  };

  renderFlatButton = () => {
    const { classes, tooltip } = this.props;

    const renderButton = this.renderButton(classes.defaultFlat);

    if (!tooltip) return renderButton;

    return this.renderTooltipButton(renderButton);
  };

  renderTooltipButton = button => {
    const {
      tooltip,
      tooltipPlacement,
      tooltipClasses,
      enterDelay,
      disableTriggerFocus,
    } = this.props;

    return (
      <Tooltip
        placement={tooltipPlacement}
        title={tooltip}
        classes={tooltipClasses}
        enterDelay={enterDelay}
        disableFocusListener={disableTriggerFocus}
      >
        <span>{button}</span>
      </Tooltip>
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [ICON_BUTTON]: this.renderIconButton,
      [FLAT_BUTTON]: this.renderFlatButton,
      [DEFAULT]: this.renderDefault,
    });
  };
}

IconButton.propTypes = {
  // from hoc
  classes: PropTypes.object.isRequired,

  // from parent
  variant: PropTypes.string, // every IconButton must have a Tooltip
  tooltip: PropTypes.string,
  children: PropTypes.node.isRequired, // every IconButton must have an Icon node

  // optional
  tooltipPlacement: PropTypes.string,
  tooltipClasses: PropTypes.object,
  className: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string,
  enterDelay: PropTypes.number,
  disabled: PropTypes.bool,
  dark: PropTypes.bool,
  disableTriggerFocus: PropTypes.bool,
  isLoading: PropTypes.bool,

  // function
  onClick: PropTypes.func,
};

IconButton.defaultProps = {
  variant: '',
  color: 'default',
  tooltipClasses: {},
  className: '',
  type: 'button',
  disabled: false,
  dark: false,
  enterDelay: 700,
  disableTriggerFocus: true,
  isLoading: false,
};

export default withStyles(style, { name: 'IconButton' })(IconButton);
