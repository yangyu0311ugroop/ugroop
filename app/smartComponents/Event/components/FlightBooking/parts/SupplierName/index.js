/**
 * Created by stephenkarpinskyj on 7/9/18.
 */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { FLIGHT_BOOKING_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HOC } from 'datastore/eventStore/hoc';
import GridItem from 'components/GridItem';
import { Text } from 'smartComponents/Inputs';
import { EditableTextForm } from 'smartComponents/Editables';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import inputs from './inputs';

export class SupplierName extends React.PureComponent {
  handleSubmit = obj => {
    TEMPLATE_API_HELPERS.patchFlightBooking(obj, this.props);
  };

  renderEditable = () => {
    const { value, readOnly } = this.props;
    return (
      <GridItem>
        <EditableTextForm
          value={value}
          {...inputs.supplierName}
          {...inputs.supplierNameEditable}
          onSubmit={this.handleSubmit}
          readOnly={readOnly}
        />
      </GridItem>
    );
  };

  renderField = () => {
    const { value } = this.props;
    return (
      <GridItem xs>
        <Text value={value} {...inputs.supplierName} />
      </GridItem>
    );
  };

  renderLabelValue = () => {
    const { value, renderEmpty } = this.props;

    if (!value) {
      return LOGIC_HELPERS.ifFunction(renderEmpty);
    }

    return <GridItem>{value}</GridItem>;
  };

  render = () => {
    const { variant } = this.props;
    return (
      <ForEachEventVariant
        variant={variant}
        renderDefault={this.renderEditable}
        renderField={this.renderField}
        renderLabelValue={this.renderLabelValue}
      />
    );
  };
}

SupplierName.propTypes = {
  // parent
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  renderEmpty: PropTypes.func,

  // resaga value
  value: PropTypes.string,
};

SupplierName.defaultProps = {
  variant: null,
  readOnly: false,
};

export default compose(
  EVENT_STORE_HOC.selectFlightBookingProp({
    path: FLIGHT_BOOKING_PATHS.supplierName,
  }),
)(SupplierName);
