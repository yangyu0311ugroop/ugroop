import React from 'react';
import PropTypes from 'prop-types';
import { MOMENT_HELPERS } from 'utils/helpers/moment';

export class DateTimeFromNow extends React.PureComponent {
  render = () => {
    const { dateTime } = this.props;
    return (
      !!dateTime && (
        <span title={MOMENT_HELPERS.renderDayDateTime(dateTime)}>
          {MOMENT_HELPERS.renderFromNow(dateTime)}
        </span>
      )
    );
  };
}

DateTimeFromNow.propTypes = {
  // parent
  dateTime: PropTypes.string,
};

DateTimeFromNow.defaultProps = {
  dateTime: null,
};

export default DateTimeFromNow;
