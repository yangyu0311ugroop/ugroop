import React, { PureComponent } from 'react';
import MuiButton from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { convertStyleClass } from 'utils/style-utils';
import { VARIANTS } from 'variantsConstants';
import Icon from '../Icon';
import Tooltip, { DEFAULT_ENTER_DELAY } from '../Tooltip';
import styles from './styles';

export class Button extends PureComponent {
  getTooltipTitle = () => {
    const { title, tooltipProps } = this.props;
    return title || tooltipProps.title;
  };

  getTooltipProps = () => {
    const {
      tooltipProps: { title, ...rest },
    } = this.props;
    return {
      ...rest,
      tooltipProps: { rest },
      enterDelay: DEFAULT_ENTER_DELAY,
    };
  };

  capitalizeFirstLetter = str =>
    `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

  buttonWrapper = children => {
    const {
      classes,
      className,
      color,
      size,
      loading,
      disabled,
      square,
      verySquare,
      disableRipple,
      iconButton,
      variant,
      dense,
      noMargin,
      weight,
      block,
      transparent,
      noPadding,
      textAlign,
      title,
      buttonTitle,
      tooltipProps,
      dialog,
      noBorderRadius,
      noBoxShadow,
      iconClassName, // eslint-disable-line
      testId,
      buttonText,
      ...rest
    } = this.props;
    const isLoading = !!loading && { disabled: true, disableRipple: true };

    // color and style
    const btnTheme =
      variant === 'inline'
        ? `outline${this.capitalizeFirstLetter(color)}`
        : `${variant}${this.capitalizeFirstLetter(color)}`;

    // button size or icon size
    const isIcon = iconButton && 'Icon';
    const buttonSize = isIcon ? `${size}${isIcon}` : size;
    const iconSize = LOGIC_HELPERS.ifElse(size === 'xs', 'extraSmall', size);

    const inline = !iconButton && variant === 'inline';

    let loadingSpan = '';
    if (loading) {
      loadingSpan = (
        <Icon
          size={iconSize}
          className={classNames(
            classes.loadingSpan,
            variant === 'standard' && classes.standard,
            (btnTheme === 'outlineBase' || btnTheme === 'borderlessBase') &&
              classes.outlineBase,
            (btnTheme === 'outlinePrimary' ||
              btnTheme === 'borderlessPrimary') &&
              classes.outlinePrimary,
            (btnTheme === 'outlineAlert' || btnTheme === 'borderlessAlert') &&
              classes.outlineAlert,
            (btnTheme === 'outlineGray' || btnTheme === 'borderlessGray') &&
              classes.outlineGray,
          )}
          icon="loading"
        />
      );
    }

    const loadingContent = (
      <div
        className={classNames({
          [classes.loadingChild]: loading,
        })}
      >
        {children}
      </div>
    );

    const btnContent = LOGIC_HELPERS.ifElse(loading, loadingContent, children);
    return (
      <MuiButton
        data-testid={testId}
        className={classNames(
          classes.root,
          iconButton && classes.iconRoot,
          square && classes.square,
          { [classes.verySquare]: verySquare },
          inline && classes.inline,
          convertStyleClass(classes, weight),
          convertStyleClass(classes, btnTheme),
          convertStyleClass(classes, buttonSize),
          convertStyleClass(classes, variant),
          loading && classes.loading,
          disabled && classes.disabled,
          { [classes.noMargin]: noMargin, [classes.noPadding]: noPadding },
          convertStyleClass(
            classes,
            `textAlign${this.capitalizeFirstLetter(textAlign)}`,
          ),
          dense && classes.dense,
          block && classes.block,
          transparent && classes.transparent,
          LOGIC_HELPERS.ifElse(
            [variant === VARIANTS.STANDARD, size === 'xs'],
            classes.standardXs,
          ),
          LOGIC_HELPERS.ifElse(dialog, classes.dialog),
          LOGIC_HELPERS.ifElse(noBoxShadow, classes.noBoxShadow),
          LOGIC_HELPERS.ifElse(noBorderRadius, classes.noBorderRadius),
          className,
          classes.label,
          LOGIC_HELPERS.ifElse(buttonText, classes.buttonText),
        )}
        disableRipple={disableRipple}
        disabled={disabled}
        title={buttonTitle}
        {...isLoading}
        {...rest}
      >
        {loadingSpan}
        {btnContent}
      </MuiButton>
    );
  };

  renderButton = () => {
    const { icon, children, iconButton, size, iconClassName } = this.props;

    // Inline buttons cannot take the iconButton prop
    if (iconButton) {
      const iconChild = (
        <Icon size={size} icon={icon} className={iconClassName} />
      );
      return this.buttonWrapper(iconChild);
    }

    return this.buttonWrapper(children);
  };

  render() {
    const tooltipTitle = this.getTooltipTitle();

    if (!tooltipTitle) {
      return this.renderButton();
    }

    return (
      <Tooltip title={tooltipTitle} isLight {...this.getTooltipProps()}>
        {this.renderButton()}
      </Tooltip>
    );
  }
}

Button.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  className: PropTypes.string,
  children: PropTypes.node,
  noMargin: PropTypes.bool,
  noPadding: PropTypes.bool,
  noBorderRadius: PropTypes.bool,
  noBoxShadow: PropTypes.bool,
  icon: PropTypes.string, // linear-icon
  testId: PropTypes.string,

  // types
  square: PropTypes.bool,
  verySquare: PropTypes.bool,
  iconButton: PropTypes.bool,
  iconClassName: PropTypes.string,
  variant: PropTypes.oneOf([
    VARIANTS.STANDARD,
    VARIANTS.OUTLINE,
    VARIANTS.INLINE,
    VARIANTS.BORDERLESS,
  ]),

  // colors
  color: PropTypes.oneOf([
    'base',
    'primary',
    'alert',
    'gray',
    'normal',
    'inline',
    'black',
    'pending',
    'white',
    'yellow',
    'darkgray',
  ]),

  // sizes
  size: PropTypes.oneOf(['base', 'xs', 'small', 'large', 'extraSmall', 'xxs']),

  // weight
  weight: PropTypes.oneOf(['light', 'normal', 'bold', 'strong']),

  // text-align
  textAlign: PropTypes.string,

  transparent: PropTypes.bool,

  // states
  dense: PropTypes.bool,
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  disableRipple: PropTypes.bool,
  dialog: PropTypes.bool,
  loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  title: PropTypes.any,
  buttonTitle: PropTypes.any,
  tooltipProps: PropTypes.object,
  buttonText: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
  disableRipple: false,
  title: null,
  tooltipProps: {},
  transparent: false,
  weight: 'normal',
  size: 'base',
  color: 'base',
  variant: VARIANTS.STANDARD,
  noMargin: false,
  noPadding: false,
  textAlign: '',
  iconClassName: '',
  square: false,
  verySquare: false,
  buttonText: false,
};

export default withStyles(styles, { name: 'ViewComponentsButton' })(Button);
