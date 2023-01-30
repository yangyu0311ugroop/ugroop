import React from 'react';
import PropTypes from 'prop-types';
import { DEFAULT } from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HOC } from 'datastore/nodeStore/hoc';
import GridItem from 'components/GridItem';
import { Email as EmailField } from 'smartComponents/Inputs';
import { EditableTextForm } from 'smartComponents/Editables';
import inputs from './inputs';
import { NODE_STORE_HELPERS } from '../../../../datastore/nodeStore/helpers';

export class Email extends React.PureComponent {
  getName = () =>
    NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.email, this.props);

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
    const { value } = this.props;
    return !!value && <GridItem>{value}</GridItem>;
  };

  renderValue = () => this.props.value;

  renderTextField = () => {
    const { value, required, currentValue } = this.props;

    const requiredProps = LOGIC_HELPERS.ifElse(required, inputs.required, {});

    return (
      <GridItem xs>
        <EmailField
          name={this.getName()}
          value={currentValue || value}
          onChange={this.handleChange}
          {...inputs.base}
          {...requiredProps}
        />
      </GridItem>
    );
  };

  renderEditable = () => {
    const { children, value, readOnly, required } = this.props;

    const requiredProps = LOGIC_HELPERS.ifElse(required, inputs.required, {});

    return (
      <GridItem xs>
        <EditableTextForm
          value={value}
          TextComponent={EmailField}
          name={this.getName()}
          {...inputs.base}
          {...inputs.editable}
          {...requiredProps}
          onSubmit={this.handleSubmit}
          readOnly={readOnly}
          editableSibling={!!value && children}
        />
      </GridItem>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.VALUE]: this.renderValue,
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [VARIANTS.TEXT_FIELD]: this.renderTextField,
      [DEFAULT]: this.renderEditable,
    });
  };
}

Email.propTypes = {
  // parent
  children: PropTypes.any,
  id: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  onLogin: PropTypes.func,

  // resaga value
  value: PropTypes.string,
  currentValue: PropTypes.string,
};

Email.defaultProps = {
  children: null,
  id: null,
  variant: null,
  readOnly: false,
  onLogin: () => {},

  value: '',
  currentValue: null,
};

export default NODE_STORE_HOC.selectProp({ path: NODE_PATHS.email })(Email);
