/**
 * Created by stephenkarpinskyj on 20/4/18.
 */

import React from 'react';
import PropTypes from 'prop-types';

import arrayHelpers from 'utils/helpers/arrays';
import DataField from 'ugcomponents/Inputs/DataField/index';

export const getDerivedStateFromProps = (nextProps, prevState) => {
  if (!prevState.currentValues) {
    return { currentValues: nextProps.values };
  }

  return null;
};

/**
 * Controls state of a table of input fields.
 */
const withFieldTable = () => WrappedComponent => {
  class WithFieldTable extends React.Component {
    state = {
      currentValues: null,
    };

    static getDerivedStateFromProps = getDerivedStateFromProps;

    addRow = (obj = { id: Date.now() }) => {
      const { currentValues } = this.state;
      this.setState({
        currentValues: arrayHelpers.mergeAppending(currentValues, [obj]),
      });
    };

    removeRow = index => {
      const { currentValues } = this.state;
      this.setState({
        currentValues: arrayHelpers.removeAt(currentValues, index),
      });
    };

    reset = values => {
      this.setState({ currentValues: values, reset: true });
    };

    render = () => {
      const { tableName, values, ...props } = this.props;
      const { currentValues, reset } = this.state;
      return (
        <div>
          <WrappedComponent
            values={currentValues}
            addRow={this.addRow}
            removeRow={this.removeRow}
            {...props}
          />
          <DataField
            name={`${tableName}Length`}
            value={values ? values.length : 0}
            currentValue={currentValues ? currentValues.length : 0}
          />
          <DataField
            name={`${tableName}Reset`}
            value={false}
            currentValue={reset}
          />
        </div>
      );
    };
  }

  WithFieldTable.propTypes = {
    // parent
    tableName: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.any })), // eslint-disable-line react/no-unused-prop-types
  };

  WithFieldTable.defaultProps = {
    values: null,
  };

  return WithFieldTable;
};

export default withFieldTable;
