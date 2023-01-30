import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG, TOUR_DATES_CONFIG, SELECTED_TOUR_CONFIG } from './config';

export class FilterIdsByTourDate extends PureComponent {
  render = () => {
    const { children, ids, filteredIds } = this.props;
    return children({ ids, filteredIds });
  };
}

FilterIdsByTourDate.propTypes = {
  // parent props
  children: PropTypes.func.isRequired,
  ids: PropTypes.array,

  // resaga props
  filteredIds: PropTypes.array,
};

FilterIdsByTourDate.defaultProps = {
  ids: [],
  filteredIds: [],
};

export default compose(
  resaga(SELECTED_TOUR_CONFIG),
  resaga(TOUR_DATES_CONFIG),
  resaga(CONFIG),
)(FilterIdsByTourDate);
