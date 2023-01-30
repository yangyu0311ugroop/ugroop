import { DEFAULT } from 'appConstants';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HOC } from 'datastore/eventStore/hoc';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { COMMON_SAMEASORIGIN_INPUTS } from 'smartComponents/Event/components/Event/parts/Transportation/SameAsOrigin/inputs';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

import { Checkbox } from 'ugcomponents/Inputs';

export class SameAsOrigin extends PureComponent {
  handleOnChange = ev => {
    const { onChange } = this.props;

    LOGIC_HELPERS.ifFunction(onChange, [ev]);
  };

  renderField = () => {
    const { sameAsOrigin } = this.props;

    return (
      <Checkbox
        compact
        onChange={this.handleOnChange}
        value={sameAsOrigin}
        {...COMMON_SAMEASORIGIN_INPUTS.field}
      />
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderField,
    });
  };
}

SameAsOrigin.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,
  onChange: PropTypes.func,

  // resaga props
  sameAsOrigin: PropTypes.bool,
};

SameAsOrigin.defaultProps = {
  variant: '',
  sameAsOrigin: false,
};

export default compose(
  EVENT_STORE_HOC.selectEventProp({
    path: EVENT_PATHS.sameAsOrigin,
    outputProp: 'sameAsOrigin',
  }),
)(SameAsOrigin);
