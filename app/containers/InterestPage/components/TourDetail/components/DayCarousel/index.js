import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DayImg from '../DayImg';

export class DayCarousel extends PureComponent {
  render() {
    const { dayIds } = this.props;
    const ids = dayIds.slice(0, 3);

    return ids.map((id, index) => (
      <DayImg id={id} key={id} dayCount={index + 1} selected={index === 0} />
    ));
  }
}

DayCarousel.propTypes = {
  // parent props
  dayIds: PropTypes.array.isRequired,
};

export default DayCarousel;
