import React from 'react';
import PropTypes from 'prop-types';
import { DEFAULT } from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import GridItem from 'components/GridItem';
import { Text } from 'ugcomponents/Inputs';
import omit from 'lodash/omit';
import inputs from './inputs';
import EditableRTE from '../EditableRTE';

const nodePath = ['hashkeyDescription'];

export class DescriptionHashkey extends React.PureComponent {
  renderTextOnly = () => {
    const { value, renderValue } = this.props;
    return !!value && renderValue(value);
  };

  renderTextField = () => {
    const { value, extended, required, currentValue, readOnly } = this.props;

    const requiredProps = LOGIC_HELPERS.ifElse(required, inputs.required, {});
    const extendedProps = LOGIC_HELPERS.ifElse(extended, inputs.extended, {});
    const inputProps = Object.assign(
      {},
      inputs.base,
      requiredProps,
      extendedProps,
    );

    return (
      <GridItem xs>
        <Text
          name="hashkeyDesc"
          value={currentValue || value}
          disabled={readOnly}
          {...inputProps}
        />
      </GridItem>
    );
  };

  renderEditable = () => (
    <EditableRTE
      nodePath={nodePath}
      headingLabel="Successful Registration Message"
      typeLabel="confirmation"
      emptyPlaceholder="Click here to enter a confirmation message"
      placeholder="Describe the confirmation message"
      hashKeyDesc
      dense
      {...omit(this.props, ['classes'])}
    />
  );

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [VARIANTS.TEXT_FIELD]: this.renderTextField,
      [DEFAULT]: this.renderEditable,
    });
  };
}

DescriptionHashkey.propTypes = {
  // parent
  id: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  extended: PropTypes.bool,
  renderValue: PropTypes.func,
  currentValue: PropTypes.string,
  resaga: PropTypes.object,

  // resaga value
  value: PropTypes.string,
  hashkeyDescription: PropTypes.string,
};

DescriptionHashkey.defaultProps = {
  id: null,
  variant: null,
  readOnly: false,
  extended: false,
  renderValue: value => value,
  currentValue: null,

  hashkeyDescription: '',
};

export default DescriptionHashkey;
