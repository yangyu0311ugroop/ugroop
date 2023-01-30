/**
 * Created by stephenkarpinskyj on 5/8/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { H5 } from 'viewComponents/Typography';
import { withStyles } from 'components/material-ui';
import classnames from 'classnames';

export const style = {
  root: {
    display: 'inline-block',
  },
};

export class EditableLabel extends React.PureComponent {
  render = () => {
    const { classes, children, Typography, className } = this.props;
    return (
      children && (
        <Typography
          dense
          weight="bold"
          className={classnames(classes.root, className)}
        >
          {children}
        </Typography>
      )
    );
  };
}

EditableLabel.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  children: PropTypes.any,
  Typography: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]),
  className: PropTypes.any,
};

EditableLabel.defaultProps = {
  children: null,
  Typography: H5,
};

export default withStyles(style, { name: 'EditableLabel' })(EditableLabel);
