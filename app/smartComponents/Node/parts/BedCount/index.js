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
import omit from 'lodash/omit';
import inputs from './inputs';
import { pluralizeText } from '../../../../utils/stringAdditions';
import { Number as NumberInput } from '../../../Inputs';

export class BedCount extends React.PureComponent {
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

  renderEditableValue = value =>
    `${value} ${pluralizeText('bed', Number.parseInt(value, 10), true)}`;

  renderEditable = () => {
    const { value, readOnly, noLabel } = this.props;
    return (
      <GridItem>
        <EditableTextForm
          value={value}
          renderValue={this.renderEditableValue}
          TextComponent={NumberInput}
          inline
          {...inputs.base}
          //  {...inputs.editable}
          {...LOGIC_HELPERS.ifElse(
            noLabel,
            omit(inputs.editable, ['label']),
            inputs.editable,
          )}
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

BedCount.propTypes = {
  // parent
  id: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  noLabel: PropTypes.bool,

  // resaga value
  value: PropTypes.string,
};

BedCount.defaultProps = {
  id: null,
  variant: null,
  readOnly: false,

  value: '',
};

export default NODE_STORE_HOC.selectProp({ path: NODE_PATHS.bedCount })(
  BedCount,
);
