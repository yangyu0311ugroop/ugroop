import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import styles from './styles';

export class Head extends PureComponent {
  render = () => {
    const { classes, children, xs, className } = this.props;

    return (
      <div
        className={classnames(
          classes.heading,
          LOGIC_HELPERS.ifElse(xs, classes.xs),
          className,
        )}
      >
        {children}
      </div>
    );
  };
}

Head.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  className: PropTypes.string,
  children: PropTypes.any,
  xs: PropTypes.bool,

  // resaga props
};

Head.defaultProps = {};

export default compose(withStyles(styles, { name: 'Head' }))(Head);
