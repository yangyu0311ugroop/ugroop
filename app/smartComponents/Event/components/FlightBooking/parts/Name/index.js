/**
 * Created by stephenkarpinskyj on 7/9/18.
 */

import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import GridItem from 'components/GridItem';
import { FLIGHT_BOOKING_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HOC } from 'datastore/eventStore/hoc';
import PropTypes from 'prop-types';
import React from 'react';
import { EditableTextForm } from 'smartComponents/Editables';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { Text } from 'smartComponents/Inputs';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { EventHeading } from 'viewComponents/Event/components/Heading';
import inputs from './inputs';

export class Name extends React.PureComponent {
  handleSubmit = obj => {
    TEMPLATE_API_HELPERS.patchFlightBooking(obj, this.props);
  };

  renderHeadingValue = value => <EventHeading>{value}</EventHeading>;

  renderPlaceholder = () => this.props.editablePlaceholder;

  renderEditableHeadingForm = () => {
    const { value, readOnly } = this.props;
    return (
      <GridItem>
        <EditableTextForm
          value={value}
          Typography="H2"
          placeholder={this.renderPlaceholder()}
          renderValue={this.renderHeadingValue}
          onSubmit={this.handleSubmit}
          readOnly={readOnly}
          {...inputs.name}
        />
      </GridItem>
    );
  };

  renderField = () => {
    const { value } = this.props;
    return (
      <GridItem xs>
        <Text value={value} {...inputs.name} {...inputs.nameField} />
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

  renderValueOnly = () => {
    const { component: Component, value, className } = this.props;

    return value && <Component className={className}>{value}</Component>;
  };

  render = () => {
    const { variant } = this.props;
    return (
      <ForEachEventVariant
        variant={variant}
        renderDefault={this.renderField}
        renderEditableHeadingForm={this.renderEditableHeadingForm}
        renderLabelValue={this.renderLabelValue}
        renderValueOnly={this.renderValueOnly}
      />
    );
  };
}

Name.propTypes = {
  // parent
  variant: PropTypes.string,
  editablePlaceholder: PropTypes.string,
  readOnly: PropTypes.bool,
  component: PropTypes.string,
  className: PropTypes.string,
  renderEmpty: PropTypes.func,

  // resaga value
  value: PropTypes.string,
};

Name.defaultProps = {
  component: 'span',
  variant: null,
  editablePlaceholder: 'Click to name this booking',
  readOnly: false,
};

export default EVENT_STORE_HOC.selectFlightBookingProp({
  path: FLIGHT_BOOKING_PATHS.name,
})(Name);
