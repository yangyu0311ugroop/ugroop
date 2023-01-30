import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import classnames from 'classnames';
import Button from 'ugcomponents/Buttons/Button/index';
import styles from './styles';

export class InlineButton extends PureComponent {
  render = () => {
    const {
      classes,
      hover,
      hoverGrayMode,
      darkMode,
      children,
      className,
      xs,
      sm,
      md,
      lg,
      bold,
      color,
      disabled,
      offsetLeft,
      offsetRight,
      spanBlock,
      displayBlock,
      italic,
      padding,
      textAlign,
      isEllipsis,
      ...props
    } = this.props;

    const childValue = isEllipsis ? (
      <div className="j-text-ellipsis">{children}</div>
    ) : (
      children
    );

    return (
      <Button
        inline
        disabled={disabled}
        className={classnames(
          classes.root,
          xs && classes.xs,
          sm && classes.sm,
          md && classes.md,
          lg && classes.lg,
          bold && classes.bold,
          color && classes[color],
          disabled && classes.disabled,
          italic && classes.italic,
          offsetLeft && classes.offsetLeft,
          offsetRight && classes.offsetRight,
          spanBlock && classes.spanBlock,
          displayBlock && classes.displayBlock,
          darkMode && classes.darkMode,
          hover && classes.hover,
          darkMode && classes.hoverDarkMode,
          hoverGrayMode && classes.hoverGrayMode,
          padding && classes[`padding_${padding}`],
          textAlign && classes[`textAlign_${textAlign}`],
          className,
        )}
        type="button"
        {...props}
      >
        {childValue}
      </Button>
    );
  };
}

InlineButton.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  padding: PropTypes.string,
  textAlign: PropTypes.string,
  bold: PropTypes.bool,
  xs: PropTypes.bool,
  sm: PropTypes.bool,
  md: PropTypes.bool,
  lg: PropTypes.bool,
  disabled: PropTypes.bool,
  offsetLeft: PropTypes.bool,
  offsetRight: PropTypes.bool,
  spanBlock: PropTypes.bool,
  displayBlock: PropTypes.bool,
  italic: PropTypes.bool,
  hoverGrayMode: PropTypes.bool,
  darkMode: PropTypes.bool,
  hover: PropTypes.bool,
  isEllipsis: PropTypes.bool,

  // resaga props
};

InlineButton.defaultProps = {
  className: '',
  padding: 'sm',
  color: 'default',
  bold: false,
  xs: false,
  sm: false,
  md: true,
  lg: false,
  disabled: false,
  offsetLeft: false,
  offsetRight: false,
  spanBlock: false,
  italic: false,
  isEllipsis: false,
};

export default compose(withStyles(styles, { name: 'InlineButton' }))(
  InlineButton,
);
