import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import {
  FilledTextField,
  FilledVTextField,
} from 'components/Inputs/TextField/components/FilledInputs';
import Attachments from 'containers/Portal/components/AddEvent/components/EventForm/parts/Attachments';
import EndDate from 'containers/Portal/components/AddEvent/components/EventForm/parts/EndDate';
import EndMode from 'containers/Portal/components/AddEvent/components/EventForm/parts/EndMode';
import EndTime from 'containers/Portal/components/AddEvent/components/EventForm/parts/EndTime';
import FlightDetails from 'containers/Portal/components/AddEvent/components/EventForm/parts/FlightDetails';
import StartDate from 'containers/Portal/components/AddEvent/components/EventForm/parts/StartDate';
import StartMode from 'containers/Portal/components/AddEvent/components/EventForm/parts/StartMode';
import StartTime from 'containers/Portal/components/AddEvent/components/EventForm/parts/StartTime';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import bookingUtils, {
  EMPTY,
} from 'smartComponents/Event/components/Event/parts/Flight/Booking/utils';
import { Select } from 'smartComponents/Inputs';
import IATASearchField from 'smartComponents/Inputs/IATASearchField';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import SimpleRTE from 'ugcomponents/Inputs/SimpleRTE';
import { CONFIG } from './config';

export class FlightForm extends PureComponent {
  state = {};

  componentWillMount = () => {
    this.startCityNameProps = {
      name: EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.startCityName),
    };
    this.startIataCodeProps = {
      name: EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.startIataCode),
    };
    this.startTimeZoneIdProps = {
      name: EVENT_STORE_HELPERS.pathToEventInputName(
        NODE_PATHS.startTimeZoneId,
      ),
    };
    this.endCityNameProps = {
      name: EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.endCityName),
    };
    this.endIataCodeProps = {
      name: EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.endIataCode),
    };
    this.endTimeZoneIdProps = {
      name: EVENT_STORE_HELPERS.pathToEventInputName(NODE_PATHS.endTimeZoneId),
    };
  };

  render = () => {
    const { formValue, editing, flightBookingIds } = this.props;

    const node = get(formValue, 'node');
    const data = get(formValue, 'data');

    return (
      <GridContainer direction="column" spacing={2}>
        <GridItem>
          <Select
            value={EVENT_VIEW_HELPERS.flightBookingId(data) || EMPTY}
            name={EVENT_STORE_HELPERS.pathToEventInputName(
              EVENT_PATHS.flightBooking,
            )}
            label="Flight Itinerary"
            options={bookingUtils.renderBookingOptions(flightBookingIds, true)}
            component={FilledTextField}
          />
        </GridItem>

        <GridItem>
          <GridContainer direction="column">
            <GridItem>
              <GridContainer>
                <GridItem xs={7}>
                  <StartDate
                    node={node}
                    label="Departing date"
                    placeholder="Enter departing date"
                  />
                </GridItem>
                <GridItem xs={5}>
                  <StartTime
                    node={node}
                    label="Departing time"
                    placeholder="Enter departing time"
                  />
                </GridItem>
                <StartMode node={node} />
              </GridContainer>
            </GridItem>
            <GridItem>
              <GridContainer direction="column" spacing={0}>
                <GridItem>
                  <GridContainer>
                    <GridItem xs={7}>
                      <EndDate
                        data={data}
                        node={node}
                        label="Arriving date"
                        placeholder="Enter arriving date"
                      />
                    </GridItem>
                    <GridItem xs={5}>
                      <EndTime
                        node={node}
                        label="Arriving time"
                        placeholder="Enter arriving time"
                      />
                    </GridItem>
                    <EndMode node={node} />
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>

        <GridItem>
          <GridContainer direction="column">
            <GridItem>
              <IATASearchField
                name={EVENT_STORE_HELPERS.pathToEventInputName(
                  EVENT_PATHS.startAirportName,
                )}
                label="Departing airport"
                placeholder="Enter departing airport"
                component={FilledVTextField}
                value={EVENT_VIEW_HELPERS.airportStart(data)}
                cityName={EVENT_VIEW_HELPERS.cityNameStart(data)}
                iataCode={EVENT_VIEW_HELPERS.airportIATAStart(data)}
                timeZoneId={EVENT_VIEW_HELPERS.startTimeZoneId(data)}
                cityNameProps={this.startCityNameProps}
                iataCodeProps={this.startIataCodeProps}
                timeZoneIdProps={this.startTimeZoneIdProps}
              />
            </GridItem>
            <GridItem>
              <IATASearchField
                name={EVENT_STORE_HELPERS.pathToEventInputName(
                  EVENT_PATHS.endAirportName,
                )}
                label="Arriving airport"
                placeholder="Enter arriving airport"
                component={FilledVTextField}
                value={EVENT_VIEW_HELPERS.airportEnd(data)}
                cityName={EVENT_VIEW_HELPERS.cityNameEnd(data)}
                iataCode={EVENT_VIEW_HELPERS.airportIATAEnd(data)}
                timeZoneId={EVENT_VIEW_HELPERS.endTimeZoneId(data)}
                cityNameProps={this.endCityNameProps}
                iataCodeProps={this.endIataCodeProps}
                timeZoneIdProps={this.endTimeZoneIdProps}
              />
            </GridItem>
            <GridItem>
              <SimpleRTE
                name={EVENT_STORE_HELPERS.pathToEventInputName(
                  EVENT_PATHS.description,
                )}
                placeholder="Tell some more about this.."
                filled
                value={EVENT_VIEW_HELPERS.description(data)}
              />
            </GridItem>
          </GridContainer>
        </GridItem>

        <GridItem>
          <FlightDetails data={data} />
        </GridItem>

        <GridItem>
          <Attachments data={data} editing={editing} />
        </GridItem>
      </GridContainer>
    );
  };
}

FlightForm.propTypes = {
  // hoc props
  // classes: PropTypes.object.isRequired,
  // resaga: PropTypes.object.isRequired,

  // parent props
  formValue: PropTypes.object,
  editing: PropTypes.bool,
  flightBookingIds: PropTypes.array,

  // resaga props
};

FlightForm.defaultProps = {
  formValue: {},
  flightBookingIds: [],
};

export default compose(
  // withStyles(styles, { name: 'FlightForm' }),
  resaga(CONFIG),
)(FlightForm);
