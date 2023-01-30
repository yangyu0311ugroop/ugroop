import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { FilledTextField } from 'components/Inputs/TextField/components/FilledInputs';
import FText from 'components/Inputs/TextField/components/FilledInputs/components/FText';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import Attachments from 'containers/Portal/components/AddEvent/components/EventForm/parts/Attachments';
import EndDate from 'containers/Portal/components/AddEvent/components/EventForm/parts/EndDate';
import EndMode from 'containers/Portal/components/AddEvent/components/EventForm/parts/EndMode';
import EndTime from 'containers/Portal/components/AddEvent/components/EventForm/parts/EndTime';
import Location from 'containers/Portal/components/AddEvent/components/EventForm/parts/Location';
import NumberURLDescription from 'containers/Portal/components/AddEvent/components/EventForm/parts/NumberURLDescription';
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
import resaga from 'resaga';
import { Select } from 'smartComponents/Inputs';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { Data } from 'ugcomponents/Inputs';
import { BUS_TYPES_OPTIONS, COACH_TYPES_OPTIONS } from 'utils/constants/events';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export class TransportationForm extends PureComponent {
  state = {};

  render = () => {
    const { templateId, formValue, editing } = this.props;

    const node = get(formValue, 'node');
    const data = get(formValue, 'data');
    const temp = get(formValue, 'temp');

    const isCarHire = EVENT_VIEW_HELPERS.isCarHire(data);
    const isCoach = EVENT_VIEW_HELPERS.isCoach(data);
    const isBus = EVENT_VIEW_HELPERS.isBus(data);
    const transportationStartName = EVENT_VIEW_HELPERS.transportationStartName(
      temp,
    );
    const transportationEndName = EVENT_VIEW_HELPERS.transportationEndName(
      temp,
    );
    const subDetailType = EVENT_VIEW_HELPERS.subDetailType(
      data,
      LOGIC_HELPERS.ifElse(isCoach, 'Escorted', 'Private'),
    );

    return (
      <GridContainer direction="column" spacing={2} key={isCarHire}>
        <Data
          currentValue=""
          name={EVENT_STORE_HELPERS.pathToEventInputName(
            EVENT_PATHS.flightBooking,
          )}
        />
        <GridItem>
          <FText
            name={EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.name)}
            label="Event name"
            placeholder="Enter event name"
            autoFocus
            value={EVENT_VIEW_HELPERS.nameProp(data)}
          />
        </GridItem>

        <GridItem>
          <GridContainer direction="column">
            <GridItem>
              <GridContainer>
                <GridItem xs={7}>
                  <StartDate
                    node={node}
                    label={LOGIC_HELPERS.ifElse(
                      isCarHire,
                      'Pick-up date',
                      'Departing date',
                    )}
                    placeholder={LOGIC_HELPERS.ifElse(
                      isCarHire,
                      'Enter pick-up date',
                      'Enter departing date',
                    )}
                  />
                </GridItem>
                <GridItem xs={5}>
                  <StartTime
                    node={node}
                    label={LOGIC_HELPERS.ifElse(
                      isCarHire,
                      'Pick-up time',
                      'Departing time',
                    )}
                    placeholder={LOGIC_HELPERS.ifElse(
                      isCarHire,
                      'Enter pick-up time',
                      'Enter departing time',
                    )}
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
                        label={LOGIC_HELPERS.ifElse(
                          isCarHire,
                          'Drop-off date',
                          'Arriving date',
                        )}
                        placeholder={LOGIC_HELPERS.ifElse(
                          isCarHire,
                          'Enter drop-off date',
                          'Enter arriving date',
                        )}
                      />
                    </GridItem>
                    <GridItem xs={5}>
                      <EndTime
                        node={node}
                        label={LOGIC_HELPERS.ifElse(
                          isCarHire,
                          'Drop-off time',
                          'Arriving time',
                        )}
                        placeholder={LOGIC_HELPERS.ifElse(
                          isCarHire,
                          'Enter drop-off time',
                          'Enter arriving time',
                        )}
                      />
                    </GridItem>
                    <EndMode node={node} />
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>

        {LOGIC_HELPERS.ifElse(
          isCoach,
          <GridItem>
            <Select
              name={EVENT_STORE_HELPERS.pathToEventInputName(
                EVENT_PATHS.subSubType,
              )}
              value={subDetailType}
              label="Type"
              options={COACH_TYPES_OPTIONS}
              component={FilledTextField}
              SelectProps={{ native: true }}
            />
          </GridItem>,
        )}

        {LOGIC_HELPERS.ifElse(
          isBus,
          <GridItem>
            <Select
              name={EVENT_STORE_HELPERS.pathToEventInputName(
                EVENT_PATHS.subSubType,
              )}
              value={subDetailType}
              label="Type"
              options={BUS_TYPES_OPTIONS}
              component={FilledTextField}
              SelectProps={{ native: true }}
            />
          </GridItem>,
        )}

        <GridItem>
          <GridContainer direction="column">
            <GridItem>
              <JText bold black>
                {LOGIC_HELPERS.ifElse(isCarHire, 'Pick-up', 'Departing')}
              </JText>
            </GridItem>
            <GridItem>
              <Location
                // showTimeZone
                data={data}
                node={node}
                position="start"
                label="Place name"
                placeholder="Enter place name"
                value={EVENT_VIEW_HELPERS.transportationStartPlaceName(data)}
              />
            </GridItem>

            <GridItem>
              <FText
                name={EVENT_STORE_HELPERS.pathToEventInputName(
                  EVENT_PATHS.transportationDetailStartName,
                )}
                forceValue={transportationStartName}
                label="Location"
                placeholder="Enter location"
                value={EVENT_VIEW_HELPERS.transportationStartName(data)}
              />
            </GridItem>
          </GridContainer>
        </GridItem>

        <GridItem>
          <GridContainer direction="column">
            <GridItem>
              <JText bold black>
                {LOGIC_HELPERS.ifElse(isCarHire, 'Drop-off', 'Arriving')}
              </JText>
            </GridItem>

            <GridItem>
              <Location
                // showTimeZone
                data={data}
                node={node}
                position="end"
                label="Place name"
                placeholder="Enter place name"
                helperText={transportationEndName}
                value={EVENT_VIEW_HELPERS.transportationEndPlaceName(data)}
              />
            </GridItem>

            <GridItem>
              <FText
                name={EVENT_STORE_HELPERS.pathToEventInputName(
                  EVENT_PATHS.transportationDetailEndName,
                )}
                forceValue={transportationEndName}
                label="Location"
                placeholder="Enter location"
                value={EVENT_VIEW_HELPERS.transportationEndName(data)}
              />
            </GridItem>
          </GridContainer>
        </GridItem>

        <GridItem>
          <NumberURLDescription data={data} />
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

TransportationForm.propTypes = {
  // hoc props

  // parent props
  formValue: PropTypes.object,
  editing: PropTypes.bool,
  templateId: PropTypes.number, // templateId

  // resaga props
};

TransportationForm.defaultProps = {
  formValue: {},
};

export default compose(
  withStyles(styles, { name: 'TransportationForm' }),
  resaga(CONFIG),
)(TransportationForm);
