import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { CONFIG } from './config';

/**
 * Writes calculated data to redux store.
 */
export class MedicalsCalculated extends React.PureComponent {
  componentWillMount = () => {
    this.setValue();
  };

  componentDidUpdate = prevProps => {
    const { id, value, severity } = this.props;
    if (
      prevProps.id !== id ||
      prevProps.severity !== severity ||
      prevProps.value.length !== value.length
    ) {
      this.setValue();
    }
  };

  setValue = () => {
    const { value, severity } = this.props;
    this.props.resaga.setValue({
      calculatedSeverity: severity,
      calculatedCount: value.length,
    });
  };

  render = () => null;
}

MedicalsCalculated.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,

  // parent
  id: PropTypes.number,
  value: PropTypes.array,

  // resaga value
  severity: PropTypes.string,
};

MedicalsCalculated.defaultProps = {
  id: null,
  value: [],

  severity: null,
};

export default resaga(CONFIG)(MedicalsCalculated);
