import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

function Hr(props) {
  const { classes, className, children } = props;
  return (
    <div className={classes.hrDiv}>
      <hr className={classNames(classes.root, className)} />
      {children && (
        <div className={classes.contentDiv}>
          <span className={classes.content}>{children}</span>
        </div>
      )}
    </div>
  );
}

Hr.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

export const HrTest = Hr;
export default withStyles(styles, { name: 'Hr' })(Hr);
