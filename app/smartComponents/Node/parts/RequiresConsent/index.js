import React from 'react';
import PropTypes from 'prop-types';
import { DEFAULT } from 'appConstants';
import { SIZE_CONSTANTS } from 'sizeConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HOC } from 'datastore/nodeStore/hoc';
import { Checkbox } from 'ugcomponents/Inputs';
import inputs from './inputs';

export class RequiresConsent extends React.PureComponent {
  renderCheckboxField = () => {
    const { value, onChange } = this.props;
    return (
      <Checkbox
        value={value}
        onChange={onChange}
        compact
        size={SIZE_CONSTANTS.SM}
        {...inputs.base}
      />
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderCheckboxField,
    });
  };
}

RequiresConsent.propTypes = {
  // parent
  variant: PropTypes.string,

  // resaga value
  value: PropTypes.bool,
  onChange: PropTypes.func,
};

RequiresConsent.defaultProps = {
  variant: null,

  value: false,
  onChange: () => {},
};

export default NODE_STORE_HOC.selectProp({ path: NODE_PATHS.requiresConsent })(
  RequiresConsent,
);
