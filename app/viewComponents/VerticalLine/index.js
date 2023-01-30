import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import classnames from 'classnames';

import styles from './styles';

export class VerticalLine extends PureComponent {
  render = () => {
    const { classes, size, noMargin } = this.props;
    const small = size === 'small' && classes.small;
    const base = size === 'base' && classes.base;
    const tall = size === 'tall' && classes.tall;

    return (
      <div
        className={classnames(classes.root, small, base, tall, {
          [classes.xs]: size === 'xs',
          [classes.noMargin]: noMargin,
        })}
      />
    );
  };
}

VerticalLine.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  size: PropTypes.oneOf(['xs', 'base', 'small', 'tall']),
  noMargin: PropTypes.bool,
};

VerticalLine.defaultProps = {
  size: 'small',
  noMargin: false,
};

export default compose(withStyles(styles, { name: 'VerticalLine' }))(
  VerticalLine,
);
