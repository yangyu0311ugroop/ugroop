import React from 'react';
import MuiButton from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { convertStyleClass } from 'utils/style-utils';
import style from './style';

export const Button = props => {
  const {
    children,
    classes,
    className,
    color,
    size,
    block,
    outline,
    dense,
    noMargin,
    inline,
    loading,
    first,
    textAlign,
    testId,
    ...rest
  } = props;
  const isLoading = !!loading && { disabled: true, disableRipple: true };
  return (
    <MuiButton
      data-testId={testId}
      className={classNames(
        classes.root,
        convertStyleClass(classes, color),
        convertStyleClass(classes, size),
        convertStyleClass(classes, outline),
        block && classes.block,
        dense && classes.dense,
        noMargin && classes.noMargin,
        first && classes.first,
        inline && classes.inline,
        textAlign && classes[`textAlign${textAlign}`],
        loading && classes[`${color}_loading`],
        className,
      )}
      {...rest}
      {...isLoading}
    >
      {children}
    </MuiButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  outline: PropTypes.string,
  textAlign: PropTypes.string,
  block: PropTypes.bool,
  first: PropTypes.bool,
  dense: PropTypes.bool,
  noMargin: PropTypes.bool,
  inline: PropTypes.bool,
  testId: PropTypes.string,
  loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default withStyles(style, { name: 'Button' })(Button);
