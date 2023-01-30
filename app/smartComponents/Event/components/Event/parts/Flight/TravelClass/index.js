import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { FLIGHT_TRAVEL_CLASSES, FLIGHT_TRAVEL_CLASSES_MAP } from 'appConstants';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import { EVENT_UTILS } from 'utils/events';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HOC } from 'datastore/eventStore/hoc';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { EditableSelectForm } from 'smartComponents/Editables';
import { Select } from 'smartComponents/Inputs';
import EventPatchData from 'smartComponents/Event/components/EventPatchData';

import inputs from './inputs';

import styles from './styles';

export class TravelClass extends PureComponent {
  handleSubmit = model => {
    TEMPLATE_API_HELPERS.patchEvent(model, this.props);
  };

  getOptions = () => [
    FLIGHT_TRAVEL_CLASSES.ECONOMY,
    FLIGHT_TRAVEL_CLASSES.PREMIUM_ECONOMY,
    FLIGHT_TRAVEL_CLASSES.BUSINESS_CLASS,
    FLIGHT_TRAVEL_CLASSES.FIRST_CLASS,
    FLIGHT_TRAVEL_CLASSES.OTHER,
  ];

  renderValue = () => FLIGHT_TRAVEL_CLASSES_MAP[this.props.value];

  renderLabel = () => (
    <GridItem>
      Render Label {FLIGHT_TRAVEL_CLASSES_MAP[this.props.value]}
    </GridItem>
  );

  renderEditable = () => {
    const { value, dataId } = this.props;
    if (EVENT_UTILS.participantCannotExecuteEvent(value)) return null;

    return (
      <GridItem>
        <EditableSelectForm
          value={value}
          renderValue={this.renderValue}
          options={this.getOptions()}
          onSubmit={this.handleSubmit}
          {...inputs.travelClass}
          {...inputs.travelClassEditable}
        >
          <EventPatchData dataId={dataId} subtype />
        </EditableSelectForm>
      </GridItem>
    );
  };

  renderField = () => {
    const { value } = this.props;
    return (
      <GridItem xs>
        <Select
          {...inputs.travelClass}
          value={value}
          options={this.getOptions()}
        />
      </GridItem>
    );
  };

  render = () => {
    const { variant } = this.props;

    return (
      <ForEachEventVariant
        variant={variant}
        renderField={this.renderField}
        renderEditableForm={this.renderEditable}
        renderLabel={this.renderLabel}
        renderDefault={this.renderEditable}
      />
    );
  };
}

TravelClass.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,
  dataId: PropTypes.number,

  // resaga props
  value: PropTypes.string,
};

TravelClass.defaultProps = {
  variant: '',
};

export default compose(
  withStyles(styles, { name: 'TravelClass' }),
  EVENT_STORE_HOC.selectEventProp({ path: EVENT_PATHS.flightTravelClass }),
)(TravelClass);
