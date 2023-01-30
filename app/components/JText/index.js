import classnames from 'classnames';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import styles from './styles';

export class JTextClass extends PureComponent {
  render = () => {
    const {
      classes,
      component: Component,
      children,
      className,
      ellipsis,
      ellipsis2,
      xs,
      sm,
      md,
      lg,
      xl,
      xxl,
      gray,
      lightGray,
      darkGray,
      blue,
      orange,
      darkgreen,
      danger,
      white,
      success,
      black,
      dark,
      bold,
      bolder,
      italic,
      halfPaddingLeft,
      paddingRight,
      halfPaddingRight,
      link,
      underline,
      textCenter,
      textLeft,
      uppercase,
      capitalize,
      nowrap,
      spacing2,
      spacing4,
      onClick,
      noUnderlined,
      placeholder,
      warning,
      ...props
    } = this.props;

    return (
      <Component
        className={classnames(
          classes.root,
          LOGIC_HELPERS.ifElse(link, classnames(classes.blue, classes.link)),
          LOGIC_HELPERS.ifElse(
            underline,
            classnames(classes.blue, classes.underline),
          ),
          LOGIC_HELPERS.ifElse(ellipsis, 'j-text-ellipsis'),
          LOGIC_HELPERS.ifElse(ellipsis2, 'j-text-ellipsis2'),
          LOGIC_HELPERS.ifElse(bold, classes.bold),
          LOGIC_HELPERS.ifElse(bolder, classes.bolder),
          LOGIC_HELPERS.ifElse(italic, classes.italic),
          LOGIC_HELPERS.ifElse(xs, classes.xs),
          LOGIC_HELPERS.ifElse(sm, classes.sm),
          LOGIC_HELPERS.ifElse(md, classes.md),
          LOGIC_HELPERS.ifElse(lg, classes.lg),
          LOGIC_HELPERS.ifElse(xl, classes.xl),
          LOGIC_HELPERS.ifElse(xxl, classes.xxl),
          LOGIC_HELPERS.ifElse(gray, classes.gray),
          LOGIC_HELPERS.ifElse(lightGray, classes.lightGray),
          LOGIC_HELPERS.ifElse(darkGray, classes.darkGray),
          LOGIC_HELPERS.ifElse(lightGray, classes.lightGray),
          LOGIC_HELPERS.ifElse(blue, classes.blue),
          LOGIC_HELPERS.ifElse(orange, classes.orange),
          LOGIC_HELPERS.ifElse(darkgreen, classes.darkgreen),
          LOGIC_HELPERS.ifElse(black, classes.black),
          LOGIC_HELPERS.ifElse(dark, classes.black),
          LOGIC_HELPERS.ifElse(danger, classes.danger),
          LOGIC_HELPERS.ifElse(white, classes.white),
          LOGIC_HELPERS.ifElse(success, classes.success),
          LOGIC_HELPERS.ifElse(placeholder, classes.placeholder),
          LOGIC_HELPERS.ifElse(halfPaddingLeft, classes.halfPaddingLeft),
          LOGIC_HELPERS.ifElse(paddingRight, classes.paddingRight),
          LOGIC_HELPERS.ifElse(halfPaddingRight, classes.halfPaddingRight),
          LOGIC_HELPERS.ifElse([!ellipsis, !ellipsis2, nowrap], classes.nowrap),
          LOGIC_HELPERS.ifElse(textCenter, classes.textCenter),
          LOGIC_HELPERS.ifElse(textLeft, classes.textLeft),
          LOGIC_HELPERS.ifElse(uppercase, classes.uppercase),
          LOGIC_HELPERS.ifElse(capitalize, classes.capitalize),
          LOGIC_HELPERS.ifElse(spacing2, classes.spacing2),
          LOGIC_HELPERS.ifElse(spacing4, classes.spacing4),
          LOGIC_HELPERS.ifElse(onClick, classes.onClick),
          LOGIC_HELPERS.ifElse(noUnderlined, classes.noUnderlined),
          LOGIC_HELPERS.ifElse(warning, classes.warning),
          className,
        )}
        title={LOGIC_HELPERS.ifElse(
          ellipsis,
          LOGIC_HELPERS.ifElse(typeof children !== 'object', children),
        )}
        onClick={onClick}
        {...props}
      >
        {children}
      </Component>
    );
  };
}

JTextClass.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  className: PropTypes.string,
  component: PropTypes.any,
  children: PropTypes.node,
  ellipsis: PropTypes.bool,
  ellipsis2: PropTypes.bool,
  bold: PropTypes.any,
  bolder: PropTypes.bool,
  italic: PropTypes.bool,
  xs: PropTypes.bool,
  sm: PropTypes.bool,
  md: PropTypes.bool,
  lg: PropTypes.bool,
  xl: PropTypes.bool,
  xxl: PropTypes.bool,
  gray: PropTypes.any,
  darkGray: PropTypes.any,
  lightGray: PropTypes.bool,
  placeholder: PropTypes.bool,
  blue: PropTypes.bool,
  orange: PropTypes.bool,
  darkgreen: PropTypes.bool,
  warning: PropTypes.bool,
  black: PropTypes.any,
  dark: PropTypes.any, // just an alias for black
  danger: PropTypes.bool,
  white: PropTypes.bool,
  success: PropTypes.bool,
  link: PropTypes.bool,
  underline: PropTypes.bool,
  nowrap: PropTypes.bool,
  halfPaddingLeft: PropTypes.bool,
  halfPaddingRight: PropTypes.bool,
  paddingRight: PropTypes.bool,
  textCenter: PropTypes.bool,
  textLeft: PropTypes.bool,
  uppercase: PropTypes.bool,
  capitalize: PropTypes.bool,
  spacing2: PropTypes.bool,
  spacing4: PropTypes.bool,
  noUnderlined: PropTypes.bool,
  onClick: PropTypes.func,

  // resaga props
};

JTextClass.defaultProps = {
  component: 'span',
  nowrap: true,
};

// export default compose(withStyles(styles, { name: 'JTextClass' }))(JTextClass);
const JText = compose(withStyles(styles, { name: 'JTextClass' }))(JTextClass);
export default JText;
