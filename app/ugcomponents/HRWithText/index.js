import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles';

export const HRWithText = ({
  classes,
  content,
  halfPadding,
  x3MarginTopBottom,
  x2MarginTopBottom,
  x1MarginTopBottom,
  noFontSize,
  noHr,
}) => (
  <div
    className={classnames(classes.header, {
      [classes.x3MarginTopBottom]: x3MarginTopBottom,
      [classes.x2MarginTopBottom]: x2MarginTopBottom,
      [classes.x1MarginTopBottom]: x1MarginTopBottom,
    })}
  >
    {!noHr ? <hr className={classes.hrLine} /> : null}
    <div
      className={classnames(classes.headerText, {
        [classes.halfPadding]: halfPadding,
        [classes.unsetFontSize]: noFontSize,
      })}
    >
      {content}
    </div>
  </div>
);

HRWithText.propTypes = {
  classes: PropTypes.object.isRequired,
  content: PropTypes.node,
  halfPadding: PropTypes.bool,
  x2MarginTopBottom: PropTypes.bool,
  x1MarginTopBottom: PropTypes.bool,
  x3MarginTopBottom: PropTypes.bool,
  noFontSize: PropTypes.bool,
  noHr: PropTypes.bool,
};

HRWithText.defaultProps = {
  content: '',
  halfPadding: false,
  x3MarginTopBottom: false,
  x2MarginTopBottom: false,
  x1MarginTopBottom: false,
  noFontSize: false,
  noHr: false,
};

export default withStyles(styles, { name: 'HRWithText' })(HRWithText);
