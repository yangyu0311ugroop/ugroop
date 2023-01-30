import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import FText from 'components/Inputs/TextField/components/FilledInputs/components/FText';
import Attachments from 'containers/Portal/components/AddEvent/components/EventForm/parts/Attachments';
import EndDate from 'containers/Portal/components/AddEvent/components/EventForm/parts/EndDate';
import EndMode from 'containers/Portal/components/AddEvent/components/EventForm/parts/EndMode';
import EndTime from 'containers/Portal/components/AddEvent/components/EventForm/parts/EndTime';
import Location from 'containers/Portal/components/AddEvent/components/EventForm/parts/Location';
import Reservation from 'containers/Portal/components/AddEvent/components/EventForm/parts/Reservation';
import AmountsForm from 'containers/Portal/components/AddEvent/components/EventForm/parts/Reservation/components/AmountsForm';
import StartDate from 'containers/Portal/components/AddEvent/components/EventForm/parts/StartDate';
import StartMode from 'containers/Portal/components/AddEvent/components/EventForm/parts/StartMode';
import StartTime from 'containers/Portal/components/AddEvent/components/EventForm/parts/StartTime';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { Data } from 'ugcomponents/Inputs';
import SimpleRTE from 'ugcomponents/Inputs/SimpleRTE';

export class AccommodationForm extends PureComponent {
  state = {};

  render = () => {
    const { templateId, formValue, editing } = this.props;

    const node = get(formValue, 'node');
    const data = get(formValue, 'data');
    const temp = get(formValue, 'temp');

    const number = EVENT_VIEW_HELPERS.supplierPhoneNumber(temp);
    const website = EVENT_VIEW_HELPERS.url(temp);
    const address = EVENT_VIEW_HELPERS.locationName(temp);

    return (
      <GridContainer direction="column" spacing={2}>
        <Data
          currentValue=""
          name={EVENT_STORE_HELPERS.pathToEventInputName(
            EVENT_PATHS.flightBooking,
          )}
        />
        <GridItem>
          <GridContainer direction="column">
            <GridItem>
              <FText
                name={EVENT_STORE_HELPERS.pathToEventInputName(
                  EVENT_PATHS.name,
                )}
                label="Event name"
                placeholder="Enter event name"
                value={EVENT_VIEW_HELPERS.nameProp(data)}
              />
            </GridItem>

            <GridItem>
              <GridContainer>
                <GridItem xs={7}>
                  <StartDate
                    node={node}
                    label="Arriving date"
                    placeholder="Enter arriving date"
                  />
                </GridItem>
                <GridItem xs={5}>
                  <StartTime
                    node={node}
                    label="Check-in time"
                    placeholder="Enter check-in time"
                  />
                </GridItem>

                <StartMode node={node} />
              </GridContainer>
            </GridItem>

            <GridItem>
              <GridContainer>
                <GridItem xs={7}>
                  <EndDate
                    data={data}
                    node={node}
                    label="Departing date"
                    placeholder="Enter departing date"
                  />
                </GridItem>
                <GridItem xs={5}>
                  <EndTime
                    node={node}
                    label="Checkout time"
                    placeholder="Enter checkout time"
                  />
                </GridItem>
                <EndMode node={node} />
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>

        <GridItem>
          <GridContainer direction="column">
            <GridItem>
              <Location
                data={data}
                node={node}
                // showTimeZone
                label="Accommodation name"
                placeholder="Enter accommodation name"
                value={EVENT_VIEW_HELPERS.locationPlaceName(data)}
              />
            </GridItem>

            <GridItem>
              <FText
                name={EVENT_STORE_HELPERS.pathToEventInputName(
                  EVENT_PATHS.locationName,
                )}
                forceValue={address}
                label="Location"
                placeholder="Enter location"
                value={EVENT_VIEW_HELPERS.locationName(data)}
              />
            </GridItem>

            <GridItem>
              <GridContainer alignItems="center">
                <GridItem xs={5}>
                  <FText
                    name={EVENT_STORE_HELPERS.pathToEventInputName(
                      EVENT_PATHS.supplierPhone,
                    )}
                    forceValue={number}
                    label="Phone"
                    placeholder="Enter phone"
                    value={EVENT_VIEW_HELPERS.supplierPhoneNumber(data)}
                  />
                </GridItem>
                <GridItem xs={7}>
                  <FText
                    name={EVENT_STORE_HELPERS.pathToEventInputName(
                      EVENT_PATHS.url,
                    )}
                    forceValue={website}
                    label="Website"
                    placeholder="Enter website"
                    value={EVENT_VIEW_HELPERS.url(data)}
                  />
                </GridItem>
              </GridContainer>
            </GridItem>

            <GridItem>
              <GridContainer alignItems="center" spacing={1}>
                <GridItem xs={6}>
                  <FText
                    type="number"
                    name={EVENT_STORE_HELPERS.pathToEventInputName(
                      EVENT_PATHS.numberOfRooms,
                    )}
                    label="Number of rooms"
                    placeholder="Enter number of rooms"
                    value={EVENT_VIEW_HELPERS.numberOfRooms(data)}
                  />
                </GridItem>
                <GridItem xs={6}>
                  <FText
                    name={EVENT_STORE_HELPERS.pathToEventInputName(
                      EVENT_PATHS.roomType,
                    )}
                    label="Room type"
                    placeholder="Enter room type"
                    value={EVENT_VIEW_HELPERS.roomType(data)}
                  />
                </GridItem>
              </GridContainer>
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
          <AmountsForm popper={editing} templateId={templateId} data={data} />
        </GridItem>

        <GridItem>
          <Attachments data={data} editing={editing} />
        </GridItem>

        <GridItem>
          <Reservation data={data} editing={editing} />
        </GridItem>
      </GridContainer>
    );
  };
}

AccommodationForm.propTypes = {
  // hoc props
  // classes: PropTypes.object.isRequired,

  // parent props
  formValue: PropTypes.object,
  editing: PropTypes.bool,
  templateId: PropTypes.number, // templateId

  // resaga props
};

AccommodationForm.defaultProps = {
  formValue: {},
};

export default compose()(AccommodationForm);
// withStyles(styles, { name: 'AccommodationForm' }),
// resaga(CONFIG),
