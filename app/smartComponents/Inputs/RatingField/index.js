import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { compose } from 'redux';
import { withFormsy } from 'formsy-react';
import omit from 'lodash/omit';

import { RatingField as Rating } from 'viewComponents/Inputs';

export class RatingField extends Component {
  omitOwnProps = () =>
    omit(this.props, ['classes', 'setValue', 'value', 'getValue']);

  handleSelect = (_, value) => {
    this.props.setValue(value);
  };

  render = () => {
    const { getValue } = this.props;

    return (
      <Rating
        onChange={this.handleSelect}
        value={getValue()}
        {...this.omitOwnProps()}
      />
    );
  };
}

RatingField.propTypes = {
  // hoc props
  setValue: PropTypes.func.isRequired,
  getValue: PropTypes.func.isRequired,

  // parent props

  // resaga props
};

RatingField.defaultProps = {};

export default compose(withFormsy)(RatingField);
