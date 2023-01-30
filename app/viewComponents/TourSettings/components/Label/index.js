import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'components/material-ui';
import { H5 } from 'viewComponents/Typography';
import style from './style';

export class TourSettingsLabel extends React.PureComponent {
  render = () => {
    const { classes, children } = this.props;
    return (
      <H5 dense className={classes.label}>
        {children}
      </H5>
    );
  };
}

TourSettingsLabel.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  children: PropTypes.any,
};

TourSettingsLabel.defaultProps = {
  children: null,
};

export default withStyles(style, { name: 'viewComponents/TourSettings/Label' })(
  TourSettingsLabel,
);
