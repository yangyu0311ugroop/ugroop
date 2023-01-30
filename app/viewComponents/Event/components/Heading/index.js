/**
 * Created by stephenkarpinskyj on 5/8/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { H2 } from 'viewComponents/Typography';

export class EventHeading extends React.PureComponent {
  render = () => {
    const { children, Typography } = this.props;
    return (
      children && (
        <Typography weight="bold" dense>
          {children}
        </Typography>
      )
    );
  };
}

EventHeading.propTypes = {
  // parent
  children: PropTypes.any,
  Typography: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]),
};

EventHeading.defaultProps = {
  children: null,
  Typography: H2,
};

export default EventHeading;
