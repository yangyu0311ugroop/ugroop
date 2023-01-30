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

export class FirstName extends React.PureComponent {
  getName = () =>
    NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.firstName, this.props);

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
    const {
      value,
      extended,
      required,
      autoFocus,
      currentValue,
      readOnly,
    } = this.props;
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
          {...inputProps}
          autoFocus={autoFocus}
          disabled={readOnly}
        />
      </GridItem>
    );
  };

  renderEditable = () => {
    const { value, extended, readOnly, required, autoFocus } = this.props;
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
          autoFocus={autoFocus}
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

FirstName.propTypes = {
  // parent
  id: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  renderValue: PropTypes.func,
  required: PropTypes.bool,
  extended: PropTypes.bool,
  autoFocus: PropTypes.bool,
  currentValue: PropTypes.string,

  // resaga value
  value: PropTypes.string,
};

FirstName.defaultProps = {
  id: null,
  variant: null,
  readOnly: false,
  renderValue: value => value,
  required: false,
  extended: false,
  autoFocus: true,
  currentValue: null,

  value: '',
};

export default NODE_STORE_HOC.selectProp({ path: NODE_PATHS.firstName })(
  FirstName,
);
