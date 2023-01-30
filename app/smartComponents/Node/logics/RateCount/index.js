import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG, FILTER_RATE_COUNT } from './config';

export class RateCount extends PureComponent {
  render = () => {
    const { children, count } = this.props;

    return children(count);
  };
}

RateCount.propTypes = {
  // hoc props

  // parent props
  children: PropTypes.func.isRequired,

  // resaga props
  count: PropTypes.number,
};

RateCount.defaultProps = {
  count: 0,
};

export default compose(
  resaga(CONFIG),
  resaga(FILTER_RATE_COUNT),
)(RateCount);
