import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG, TOTAL_RATING_CONFIG } from './config';

export class RateAverage extends PureComponent {
  render = () => {
    const { children, avg } = this.props;

    return children(avg);
  };
}

RateAverage.propTypes = {
  // hoc props

  // parent props
  children: PropTypes.func.isRequired,

  // resaga props
  avg: PropTypes.number,
};

RateAverage.defaultProps = {
  avg: 0,
};

export default compose(
  resaga(CONFIG),
  resaga(TOTAL_RATING_CONFIG),
)(RateAverage);
