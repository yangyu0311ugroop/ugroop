import React from 'react';
import PropTypes from 'prop-types';
import { DEFAULT } from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import { NODE_STORE_HOC } from 'datastore/nodeStore/hoc';
import GridItem from 'components/GridItem';
import { Text } from 'ugcomponents/Inputs';
import { EditableTextForm } from 'smartComponents/Editables';
import inputs from './inputs';

export class LastName extends React.PureComponent {
  getName = () =>
    NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.lastName, this.props);

  handleSubmit = ({ model, onSuccess, onError }) => {
    const { id } = this.props;
    NODE_API_HELPERS.updateNode(
      {
        nodeId: id,
        ...model,
        onSuccess,
        onError,
      },
      this.props,
    );
  };

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
          name={this.getName()}
          value={currentValue || value}
          disabled={readOnly}
          {...inputProps}
        />
      </GridItem>
    );
  };

  renderEditable = () => {
    const { value, extended, readOnly, required } = this.props;

    const requiredProps = LOGIC_HELPERS.ifElse(required, inputs.required, {});
    const extendedProps = LOGIC_HELPERS.ifElse(extended, inputs.extended, {});
    const inputProps = Object.assign(
      {},
      inputs.base,
      requiredProps,
      extendedProps,
    );

    return (
      <GridItem>
        <EditableTextForm
          name={this.getName()}
          value={value}
          {...inputProps}
          {...inputs.editable}
          onSubmit={this.handleSubmit}
          readOnly={readOnly}
        />
      </GridItem>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [VARIANTS.TEXT_FIELD]: this.renderTextField,
      [DEFAULT]: this.renderEditable,
    });
  };
}

LastName.propTypes = {
  // parent
  id: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  extended: PropTypes.bool,
  renderValue: PropTypes.func,
  currentValue: PropTypes.string,

  // resaga value
  value: PropTypes.string,
};

LastName.defaultProps = {
  id: null,
  variant: null,
  readOnly: false,
  extended: false,
  renderValue: value => value,
  currentValue: null,

  value: '',
};

export default NODE_STORE_HOC.selectProp({ path: NODE_PATHS.lastName })(
  LastName,
);
