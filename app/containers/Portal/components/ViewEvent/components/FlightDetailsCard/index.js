import { FLIGHT_TRAVEL_CLASSES_MAP } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { CONFIG } from './config';
import styles from './styles';

export class FlightDetailsCard extends PureComponent {
  hasData = () => {
    const { event } = this.props;

    const travelClass = EVENT_VIEW_HELPERS.travelClass(event);
    const airline = EVENT_VIEW_HELPERS.airline(event);
    const flightNumber = EVENT_VIEW_HELPERS.flightNumber(event);
    const terminal = EVENT_VIEW_HELPERS.terminal(event);
    const gate = EVENT_VIEW_HELPERS.gate(event);

    return Boolean(travelClass || airline || flightNumber || terminal || gate);
  };

  renderValue = value => (
    <GridItem>
      <JText black={!!value} gray={!value} italic={!value} ellipsis>
        {value || 'n/a'}
      </JText>
    </GridItem>
  );

  renderTravelClass = () => {
    const { event } = this.props;

    const value = EVENT_VIEW_HELPERS.travelClass(event) || 'Economy';

    return this.renderValue(FLIGHT_TRAVEL_CLASSES_MAP[value]);
  };

  renderAirline = () => {
    const { event } = this.props;

    const value = EVENT_VIEW_HELPERS.airline(event);

    return this.renderValue(value);
  };

  renderFlightNumber = () => {
    const { event } = this.props;

    const value = EVENT_VIEW_HELPERS.flightNumber(event);

    return this.renderValue(value);
  };

  renderTerminal = () => {
    const { event } = this.props;

    const value = EVENT_VIEW_HELPERS.terminal(event);

    return this.renderValue(value);
  };

  renderGate = () => {
    const { event } = this.props;

    const value = EVENT_VIEW_HELPERS.gate(event);

    return this.renderValue(value);
  };

  render = () => {
    if (!this.hasData()) return null;

    return (
      <GridItem>
        <GridContainer card direction="column" spacing={2}>
          <GridItem>
            <JText bold black>
              Flight details
            </JText>
          </GridItem>

          <GridItem>
            <GridContainer direction="row" spacing={2}>
              <GridItem xs={6}>
                <GridContainer direction="column">
                  <GridItem>
                    <JText gray>Travel class</JText>
                  </GridItem>
                  <GridItem>
                    <JText gray>Airline</JText>
                  </GridItem>
                  <GridItem>
                    <JText gray>Flight number</JText>
                  </GridItem>
                  <GridItem>
                    <JText gray>Departure terminal</JText>
                  </GridItem>
                  <GridItem>
                    <JText gray>Departure gate</JText>
                  </GridItem>
                </GridContainer>
              </GridItem>

              <GridItem xs={6}>
                <GridContainer direction="column">
                  {this.renderTravelClass()}
                  {this.renderAirline()}
                  {this.renderFlightNumber()}
                  {this.renderTerminal()}
                  {this.renderGate()}
                </GridContainer>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };
}

FlightDetailsCard.propTypes = {
  // hoc props
  // classes: PropTypes.object.isRequired,

  // parent props
  event: PropTypes.object,

  // resaga props
};

FlightDetailsCard.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'FlightDetailsCard' }),
  resaga(CONFIG),
)(FlightDetailsCard);
