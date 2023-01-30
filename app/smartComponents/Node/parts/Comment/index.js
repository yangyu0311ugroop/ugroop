import React from 'react';
import PropTypes from 'prop-types';
import { DEFAULT } from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HOC } from 'datastore/nodeStore/hoc';
import GridItem from 'components/GridItem';
import { H4 } from 'viewComponents/Typography';
import { Text } from 'ugcomponents/Inputs';
import { EditableTextForm } from 'smartComponents/Editables';
import inputs from './inputs';

export class Comment extends React.PureComponent {
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
    return (
      !!value && (
        <GridItem>
          <H4 dense weight="bold">
            {value}
          </H4>
        </GridItem>
      )
    );
  };

  renderTextField = () => {
    const { value } = this.props;
    return (
      <GridItem xs>
        <Text value={value} {...inputs.base} {...inputs.field} />
      </GridItem>
    );
  };

  renderEditable = () => {
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

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [VARIANTS.TEXT_FIELD]: this.renderTextField,
      [DEFAULT]: this.renderEditable,
    });
  };
}

Comment.propTypes = {
  // parent
  id: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,

  // resaga value
  value: PropTypes.string,
};

Comment.defaultProps = {
  id: null,
  variant: null,
  readOnly: false,

  value: '',
};

export default NODE_STORE_HOC.selectProp({ path: NODE_PATHS.comment })(Comment);
