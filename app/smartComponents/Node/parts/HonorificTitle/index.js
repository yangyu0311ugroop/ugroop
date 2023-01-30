import React from 'react';
import PropTypes from 'prop-types';
import { DEFAULT } from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HOC } from 'datastore/nodeStore/hoc';
import GridItem from 'components/GridItem';
import { Text } from 'ugcomponents/Inputs';
import {
  EditableSelectForm,
  EditableTextForm,
} from 'smartComponents/Editables';
import inputs from './inputs';
import { TITLE_OPTIONS } from './constants';

export class HonorificTitle extends React.PureComponent {
  getTextProps = () => {
    if (!this.TextProps) {
      this.TextProps = {
        // TODO: Make height scale properly
        // multiline: true,
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

  renderTextOnly = () => {
    const { value } = this.props;
    return <span>{value}</span>;
  };

  renderTextField = () => {
    const { value } = this.props;
    return (
      <GridItem xs>
        <Text value={value} {...inputs.base} {...inputs.field} />
      </GridItem>
    );
  };

  renderEditableInline = () => {
    const { value, readOnly } = this.props;
    return (
      <GridItem>
        <EditableTextForm
          value={value}
          TextProps={this.getTextProps()}
          {...inputs.base}
          {...inputs.editable}
          onSubmit={this.handleSubmit}
          readOnly={readOnly}
        />
      </GridItem>
    );
  };

  renderEditableOptions = () =>
    // const { extraOptions } = this.props;
    [
      ...Object.entries(TITLE_OPTIONS).map(([value, children]) => ({
        value,
        children,
      })),
    ];

  renderEditable = () => {
    const { readOnly, value } = this.props;
    return (
      <GridItem>
        <EditableSelectForm
          value={value}
          {...inputs.base}
          {...inputs.editable}
          options={this.renderEditableOptions()}
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

HonorificTitle.propTypes = {
  // parent
  id: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,

  // resaga value
  value: PropTypes.string,
};

HonorificTitle.defaultProps = {
  id: null,
  variant: null,
  readOnly: false,

  value: '',
};

export default NODE_STORE_HOC.selectProp({ path: NODE_PATHS.honorificTitle })(
  HonorificTitle,
);
