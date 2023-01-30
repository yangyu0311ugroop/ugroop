import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG, GET_KEYPATH } from './config';

export class FilterRatings extends PureComponent {
  render = () => {
    const { children, filteredRatings } = this.props;

    return children(filteredRatings);
  };
}

FilterRatings.propTypes = {
  // hoc props

  // parent props
  children: PropTypes.func.isRequired,

  // resaga props
  filteredRatings: PropTypes.array,
};

FilterRatings.defaultProps = {
  filteredRatings: [],
};

export default compose(
  resaga(GET_KEYPATH),
  resaga(CONFIG),
)(FilterRatings);
