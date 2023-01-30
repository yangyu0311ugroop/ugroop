/**
 * Created by stephenkarpinskyj on 30/9/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { EditableLabel, EditablePlaceholder } from 'viewComponents/Editable';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { FlightIds } from 'smartComponents/Node/logics';
import Create from './components/Create';
import Flight from './components/Flight';
import m from './messages';

export class FlightBookingFlights extends React.PureComponent {
  renderFlight = (id, index) => {
    const { variant } = this.props;

    return <Flight key={id} id={id} index={index} variant={variant} />;
  };

  renderPlaceholder = () => (
    <EditablePlaceholder>
      <M {...m.placeholder} />
    </EditablePlaceholder>
  );

  renderEditableFlights = flightIds =>
    flightIds.length
      ? flightIds.map(this.renderFlight)
      : this.renderPlaceholder();

  renderCreateButton = () => {
    const { dataId } = this.props;
    return <Create dataId={dataId} />;
  };

  renderEditableLabel = () => (
    <GridContainer wrap="nowrap">
      <GridItem>
        <EditableLabel>
          <M {...m.label} />
        </EditableLabel>
      </GridItem>
      <GridItem xs />
      <GridItem>{this.renderCreateButton()}</GridItem>
    </GridContainer>
  );

  renderEditable = () => {
    const { dataId } = this.props;
    return (
      <GridItem>
        <GridContainer direction="column" spacing={0}>
          <GridItem>{this.renderEditableLabel()}</GridItem>
          <FlightIds flightBookingDataId={dataId}>
            {this.renderEditableFlights}
          </FlightIds>
        </GridContainer>
      </GridItem>
    );
  };

  renderLabelHeading = () => {
    const { dataId, renderFlights } = this.props;

    return (
      <GridContainer alignItems="center">
        <FlightIds flightBookingDataId={dataId}>{renderFlights}</FlightIds>
      </GridContainer>
    );
  };

  render = () => {
    const { variant } = this.props;
    return (
      <ForEachEventVariant
        variant={variant}
        renderDefault={this.renderEditable}
        renderLabelHeading={this.renderLabelHeading}
      />
    );
  };
}

FlightBookingFlights.propTypes = {
  // parent
  dataId: PropTypes.number,
  variant: PropTypes.string,
  renderFlights: PropTypes.func,
};

FlightBookingFlights.defaultProps = {
  dataId: 0,
  variant: null,
};

export default FlightBookingFlights;
