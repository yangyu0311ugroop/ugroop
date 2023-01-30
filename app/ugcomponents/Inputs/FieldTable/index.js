/**
 * Created by stephenkarpinskyj on 20/4/18.
 */

import React from 'react';
import PropTypes from 'prop-types';

import withFormContext from 'utils/hoc/formsy/withFormContext';
import Footer from './components/Footer';
import RowTail from './components/RowTail';
import Separator from './components/Separator';

/**
 * Renders a table of input fields (eg. rows of objects with unique id).
 */
export class FieldTable extends React.PureComponent {
  handleRemoveRow = index => () => {
    const { onRemoveRow } = this.props;
    onRemoveRow(index);
  };

  renderRowTail = index => {
    const { isFormDisabled, rowTailProps } = this.props;
    return isFormDisabled() ? null : (
      <RowTail onRemove={this.handleRemoveRow(index)} {...rowTailProps} />
    );
  };

  renderRow = (values, index) => {
    const { onRenderRow } = this.props;
    return (
      <div key={values.id}>
        {onRenderRow(values, index, () => this.renderRowTail(index))}
      </div>
    );
  };

  renderFooter = rowCount => {
    const {
      isFormDisabled,
      onRenderFooter,
      onAddRow,
      footerProps,
    } = this.props;

    if (onRenderFooter) {
      return onRenderFooter(rowCount);
    }

    return isFormDisabled() ? null : (
      <Footer onAdd={onAddRow} {...footerProps} />
    );
  };

  render = () => {
    const { values, onRenderHeader, onSort } = this.props;
    const rowCount = values ? values.length : 0;
    const hasRows = !!rowCount;
    return (
      <React.Fragment>
        {hasRows && onRenderHeader ? onRenderHeader() : null}
        {hasRows ? onSort(values).map(this.renderRow) : null}
        {hasRows ? <Separator /> : null}
        {this.renderFooter(rowCount)}
      </React.Fragment>
    );
  };
}

FieldTable.propTypes = {
  // hoc
  isFormDisabled: PropTypes.func.isRequired,

  // parent
  values: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.any })), // eslint-disable-line react/no-unused-prop-types
  onRenderHeader: PropTypes.func,
  onRenderFooter: PropTypes.func,
  onRenderRow: PropTypes.func.isRequired,
  onAddRow: PropTypes.func,
  onRemoveRow: PropTypes.func,
  onSort: PropTypes.func,
  footerProps: PropTypes.object, // For default footer
  rowTailProps: PropTypes.object,
};

FieldTable.defaultProps = {
  values: null,
  onRenderHeader: null,
  onRenderFooter: null,
  onAddRow: null,
  onRemoveRow: null,
  onSort: values => values,
  footerProps: {},
  rowTailProps: {},
};

export default withFormContext(FieldTable);
