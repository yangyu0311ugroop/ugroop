import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { compose } from 'redux';
import { generateFontClass } from 'utils/style-utils';
import { withStyles } from 'components/material-ui';
import style from './style';

export class ReadOnlyWrapper extends PureComponent {
  typographyClass = () => {
    const { classes, bold, Typography } = this.props;
    return classnames(
      generateFontClass(Typography, classes),
      bold && classes.bold,
      classes.root,
    );
  };

  render = () => {
    const { children, className, Typography, bold, ...props } = this.props;
    return (
      <div className={this.typographyClass()} {...props}>
        <span className={className}>{children}</span>
      </div>
    );
  };
}

ReadOnlyWrapper.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  children: PropTypes.any,
  className: PropTypes.string,
  Typography: PropTypes.string,
  bold: PropTypes.bool,
};

ReadOnlyWrapper.defaultProps = {
  children: null,
  Typography: 'P',
  bold: false,
};

export default compose(
  withStyles(style, { name: 'viewComponents/Editable/ReadOnly' }),
)(ReadOnlyWrapper);
