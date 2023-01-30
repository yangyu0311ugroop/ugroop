import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { SIZE_CONSTANTS } from 'sizeConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { convertStyleClass } from 'utils/style-utils';
import styles from './styles';

export class Icon extends PureComponent {
  isUgroopIcon = icon => icon.startsWith('ug-');

  isLinearIcon = icon => !icon.startsWith('ug-');

  appendIconPrefix = (icon, prefix) => {
    const splitIcon = icon.split('-');

    return splitIcon.length > 0 && splitIcon[0] === prefix
      ? icon
      : `${prefix}-${icon}`;
  };

  render() {
    const {
      classes,
      children,
      className,
      icon,
      size,
      color,
      logoSize,
      logoColor,
      bold,
      ugFont,
      paddingRight,
      ...rest
    } = this.props;

    let iconName = icon;
    const ugLogo = icon === 'ug-logo';

    if (ugFont) {
      iconName = 'ugFont';
    } else {
      iconName =
        (this.isLinearIcon(icon) && this.appendIconPrefix(icon, 'lnr')) ||
        (this.isUgroopIcon(icon) && this.appendIconPrefix(icon, 'ug'));
    }

    const props = {
      className: classNames(
        iconName,
        className,
        convertStyleClass(classes, size),
        convertStyleClass(classes, color),
        bold && classes.bold,
        ugLogo && classes.ugLogo,
        LOGIC_HELPERS.ifElse(paddingRight, classes.paddingRight),
        ugLogo && convertStyleClass(classes, logoSize),
        ugLogo && convertStyleClass(classes, logoColor),
        classes.root,
        ...Object.values(rest),
      ),
      ...rest,
    };

    if (ugFont) return <span {...props}>{children || icon}</span>;

    // used anchor tag here so we can opt-in an href since this is a logo
    if (ugLogo)
      return (
        <a title="Ugroop" {...props}>
          <span />
        </a>
      );

    return <i {...props}>{children}</i>;
  }
}

Icon.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.any,
  className: PropTypes.string,
  icon: PropTypes.string,

  // ugFont: character mapping
  ugFont: PropTypes.bool,
  paddingRight: PropTypes.bool,

  // UGroop Logo color (only supported if icon="ug-logo")
  logoColor: PropTypes.oneOf(['warmLogo', 'coolLogo', 'grayLogo']),

  // UGroop Logo sizes (only supported if icon="ug-logo")
  logoSize: PropTypes.oneOf(['xs', 'sm', 'lg', 'xl']),

  // size
  size: PropTypes.oneOf([
    'base',
    SIZE_CONSTANTS.XXXS,
    SIZE_CONSTANTS.XXS,
    'extraSmall',
    'small',
    'medium',
    'large',
    'extraLarge',
    SIZE_CONSTANTS.XL,
  ]),

  // color
  color: PropTypes.oneOf([
    'inherit',
    'dark',
    'blue',
    'lavender',
    'success',
    'gray',
    'darkGray',
    'alert',
  ]),

  // font-weight
  bold: PropTypes.bool,
};

Icon.defaultProps = {
  icon: '',
  size: 'small',
  logoSize: 'sm',
  color: 'inherit',
  logoColor: 'coolLogo',
  ugFont: false,
};

export default withStyles(styles, { name: 'ViewComponentsIcon' })(Icon);
