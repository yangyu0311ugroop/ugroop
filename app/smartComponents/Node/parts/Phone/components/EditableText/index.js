import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { EditableTextForm } from 'smartComponents/Editables';
import { Phone, PhoneActionButtons } from 'smartComponents/Inputs';
import inputs from '../../inputs';

export class PhoneEditableText extends React.PureComponent {
  // TODO: Simplify phone input usage, this copy-pastes a lot from Event/SupplierPhone
  getTextProps = () => {
    if (!this.TextProps) {
      this.TextProps = {
        inline: true,
        inputProps: undefined,
      };
    }
    return this.TextProps;
  };

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

  renderActions = () => {
    const { value } = this.props;
    return <PhoneActionButtons value={value} />;
  };

  render = () => {
    const { readOnly, value, renderValue } = this.props;
    return (
      <EditableTextForm
        value={value}
        renderValue={renderValue}
        renderActions={this.renderActions}
        TextComponent={Phone}
        TextProps={this.getTextProps()}
        {...inputs.editable}
        readOnly={readOnly}
        onSubmit={this.handleSubmit}
      />
    );
  };
}

PhoneEditableText.propTypes = {
  // parent
  id: PropTypes.number,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  renderValue: PropTypes.func,
};

PhoneEditableText.defaultProps = {
  id: null,
  value: null,
  readOnly: false,
  renderValue: () => null,
};

export default resaga()(PhoneEditableText);
