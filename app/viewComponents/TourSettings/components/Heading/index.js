import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'components/material-ui';
import { H4 } from 'viewComponents/Typography';
import style from './style';

export class TourSettingsHeading extends React.PureComponent {
  render = () => {
    const { children } = this.props;
    return (
      <H4 dense weight="bold">
        {children}
      </H4>
    );
  };
}

TourSettingsHeading.propTypes = {
  // parent props
  children: PropTypes.any,
};

TourSettingsHeading.defaultProps = {
  children: null,
};

export default withStyles(style, {
  name: 'viewComponents/TourSettings/Heading',
})(TourSettingsHeading);
