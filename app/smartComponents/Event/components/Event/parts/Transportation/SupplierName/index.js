import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import GridItem from 'components/GridItem/index';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HOC } from 'datastore/eventStore/hoc';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { TRANSPORTATION_SUPPLIER_NAME_INPUTS } from 'smartComponents/Event/components/Event/parts/Transportation/SupplierName/inputs';

import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { Text } from 'smartComponents/Inputs';
import { EditableTextForm } from 'smartComponents/Editables';
import EventPatchData from 'smartComponents/Event/components/EventPatchData';

export class SupplierName extends PureComponent {
  handleSubmit = obj => {
    TEMPLATE_API_HELPERS.patchEvent(obj, this.props);
  };

  handleField = () => {
    const { value } = this.props;

    return (
      <GridItem xs={12} sm>
        <Text value={value} {...TRANSPORTATION_SUPPLIER_NAME_INPUTS.field} />
      </GridItem>
    );
  };

  handleEditable = () => {
    const { value, dataId, readOnly } = this.props;

    return (
      <GridItem>
        <EditableTextForm
          value={value}
          {...TRANSPORTATION_SUPPLIER_NAME_INPUTS.editable}
          readOnly={readOnly}
          onSubmit={this.handleSubmit}
        >
          <EventPatchData dataId={dataId} subtype />
        </EditableTextForm>
      </GridItem>
    );
  };

  render = () => {
    const { variant } = this.props;

    return (
      <ForEachEventVariant
        variant={variant}
        renderField={this.handleField}
        renderDefault={this.handleEditable}
      />
    );
  };
}

SupplierName.propTypes = {
  // parent props
  variant: PropTypes.string,
  dataId: PropTypes.number,
  readOnly: PropTypes.bool,

  // resaga props
  value: PropTypes.string,
};

SupplierName.defaultProps = {
  variant: '',
  value: '',
  readOnly: false,
  dataId: null,
};

export default compose(
  EVENT_STORE_HOC.selectEventProp({
    path: EVENT_PATHS.transportationDetailSupplierName,
  }),
)(SupplierName);
