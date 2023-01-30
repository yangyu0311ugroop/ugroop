import { FLIGHT_TRAVEL_CLASSES_OPTIONS } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import PropTypes from 'prop-types';
import GridItem from 'components/GridItem/index';
import { FilledTextField } from 'components/Inputs/TextField/components/FilledInputs';
import FText from 'components/Inputs/TextField/components/FilledInputs/components/FText';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { Select } from 'smartComponents/Inputs';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import Icon from 'ugcomponents/Icon';
import { Data } from 'ugcomponents/Inputs';
import JButton from 'viewComponents/Button/variants/JButton';
import { CONFIG } from './config';
import styles from './styles';

export const defaultValue = props => {
  const { data } = props;

  return (
    EVENT_VIEW_HELPERS.travelClass(data) ||
    EVENT_VIEW_HELPERS.airline(data) ||
    EVENT_VIEW_HELPERS.flightNumber(data) ||
    EVENT_VIEW_HELPERS.terminal(data) ||
    EVENT_VIEW_HELPERS.gate(data)
  );
};

export class FlightDetails extends PureComponent {
  state = {
    adding: defaultValue(this.props),
  };

  setAdding = () => this.setState({ adding: true });

  render = () => {
    const { data } = this.props;
    const { adding } = this.state;

    if (!adding) {
      return (
        <>
          <JButton onClick={this.setAdding}>
            <GridContainer alignItems="center" wrap="nowrap">
              <GridItem>
                <Icon icon="lnr-plus" size="xsmall" color="blue" bold />
              </GridItem>
              <GridItem>
                <GridContainer direction="column" spacing={0}>
                  <GridItem>
                    <JText blue>Flight details</JText>
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </JButton>
          <Data
            currentValue=""
            name={EVENT_STORE_HELPERS.pathToEventInputName(
              EVENT_PATHS.flightNumber,
            )}
          />
        </>
      );
    }

    return (
      <GridContainer direction="column">
        <GridItem>
          <GridContainer direction="column" spacing={0}>
            <GridItem>
              <JText bold black>
                Flight details
              </JText>
            </GridItem>

            <GridItem>
              <JText gray italic nowrap={false}>
                Your edits in uGroop won{`'`}t change the actual booking.
              </JText>
            </GridItem>
          </GridContainer>
        </GridItem>

        <GridItem>
          <Select
            name={EVENT_STORE_HELPERS.pathToEventInputName(
              EVENT_PATHS.flightTravelClass,
            )}
            value={EVENT_VIEW_HELPERS.travelClass(data) || 'Economy'}
            label="Travel class"
            options={FLIGHT_TRAVEL_CLASSES_OPTIONS}
            component={FilledTextField}
            SelectProps={{ native: true }}
          />
        </GridItem>

        <GridItem>
          <GridContainer alignItems="center">
            <GridItem xs={12} sm={6}>
              <FText
                name={EVENT_STORE_HELPERS.pathToEventInputName(
                  EVENT_PATHS.airline,
                )}
                label="Airline"
                placeholder="Enter airline"
                value={EVENT_VIEW_HELPERS.airline(data)}
              />
            </GridItem>
            <GridItem xs={12} sm={6}>
              <FText
                name={EVENT_STORE_HELPERS.pathToEventInputName(
                  EVENT_PATHS.flightNumber,
                )}
                label="Flight number"
                placeholder="Enter flight number"
                value={EVENT_VIEW_HELPERS.flightNumber(data)}
              />
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <GridContainer alignItems="center">
            <GridItem xs={12} sm={6}>
              <FText
                name={EVENT_STORE_HELPERS.pathToEventInputName(
                  EVENT_PATHS.terminal,
                )}
                label="Departure terminal"
                placeholder="Enter departure terminal"
                value={EVENT_VIEW_HELPERS.terminal(data)}
              />
            </GridItem>
            <GridItem xs={12} sm={6}>
              <FText
                name={EVENT_STORE_HELPERS.pathToEventInputName(
                  EVENT_PATHS.gate,
                )}
                label="Departure gate"
                placeholder="Enter departure gate"
                value={EVENT_VIEW_HELPERS.gate(data)}
              />
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };
}

FlightDetails.propTypes = {
  // hoc props
  // classes: PropTypes.object.isRequired,
  // parent props
  data: PropTypes.object,

  // resaga props
};

FlightDetails.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'FlightDetails' }),
  resaga(CONFIG),
)(FlightDetails);
