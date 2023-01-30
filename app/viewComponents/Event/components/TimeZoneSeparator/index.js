import React from 'react';
import PropTypes from 'prop-types';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import SeparatorLabel from '../SeparatorLabel';

export class TimeZoneSeparator extends React.PureComponent {
  render = () => {
    const { date, ...rest } = this.props;
    return (
      !!date && (
        <SeparatorLabel title={MOMENT_HELPERS.renderZoneOffset(date)} {...rest}>
          {MOMENT_HELPERS.renderZone(date)}
        </SeparatorLabel>
      )
    );
  };
}

TimeZoneSeparator.propTypes = {
  // parent
  date: PropTypes.any,
};

TimeZoneSeparator.defaultProps = {
  date: null,
};

export default TimeZoneSeparator;
