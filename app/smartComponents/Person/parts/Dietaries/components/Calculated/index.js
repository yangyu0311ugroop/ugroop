import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { CONFIG } from './config';

/**
 * Writes calculated data to redux store.
 */
export class DietariesCalculated extends React.PureComponent {
  componentWillMount = () => {
    this.setValue();
  };

  componentDidUpdate = prevProps => {
    const { id, value } = this.props;
    if (prevProps.id !== id || prevProps.value.length !== value.length) {
      this.setValue();
    }
  };

  setValue = () => {
    const { value } = this.props;
    this.props.resaga.setValue({
      calculatedCount: value.length,
    });
  };

  render = () => null;
}

DietariesCalculated.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,

  // parent
  id: PropTypes.number,
  value: PropTypes.array,
};

DietariesCalculated.defaultProps = {
  id: null,
  value: [],
};

export default resaga(CONFIG)(DietariesCalculated);
