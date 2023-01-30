import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import styles from './styles';

export class Hr extends PureComponent {
  render = () => {
    const {
      classes,
      className,
      children,
      half,
      quarter,
      halfMarginTop,
      halfMarginBottom,
      noMarginTop,
      noMarginBottom,
    } = this.props;
    return (
      <div className={classes.relative}>
        <hr
          className={classNames(
            classes.root,
            LOGIC_HELPERS.ifElse(
              [half, halfMarginTop],
              classes.halfMarginTop,
              null,
              true,
            ),
            LOGIC_HELPERS.ifElse(
              [half, halfMarginBottom],
              classes.halfMarginBottom,
              null,
              true,
            ),
            LOGIC_HELPERS.ifElse(quarter, classes.quarter),
            LOGIC_HELPERS.ifElse(noMarginTop, classes.noMarginTop),
            LOGIC_HELPERS.ifElse(noMarginBottom, classes.noMarginBottom),
            className,
          )}
        />
        {children && (
          <div className={classes.contentDiv}>
            <span className={classes.content}>{children}</span>
          </div>
        )}
      </div>
    );
  };
}

Hr.propTypes = {
  classes: PropTypes.object.isRequired,

  className: PropTypes.string,
  children: PropTypes.node,
  quarter: PropTypes.bool,
  half: PropTypes.bool,
  halfMarginTop: PropTypes.bool,
  halfMarginBottom: PropTypes.bool,
  noMarginTop: PropTypes.bool,
  noMarginBottom: PropTypes.bool,
};

Hr.defaultProps = {
  children: '',
  half: false,
  halfMarginTop: false,
  halfMarginBottom: false,
  noMarginTop: false,
  noMarginBottom: false,
};

export default compose(withStyles(styles, { name: 'Hr' }))(Hr);
