import { FLIGHT_TRAVEL_CLASSES_OPTIONS, THE_DOT } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { FilledTextField } from 'components/Inputs/TextField/components/FilledInputs';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { Select } from 'smartComponents/Inputs';
import Icon from 'ugcomponents/Icon';
import SimpleRTE, { StyledSimpleRTE } from 'ugcomponents/Inputs/SimpleRTE';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { isEmptyRTE } from 'utils/helpers/RTE';
import JButton from 'viewComponents/Button/variants/JButton';
import { CONFIG } from './config';
import styles from './styles';

export const getDefaultValues = props => {
  const { defaultValues } = props;

  return defaultValues;
};

export class FlightDetails extends PureComponent {
  state = {
    ...getDefaultValues(this.props),
  };

  setAdding = () => this.setState({ adding: true });

  cancelAdding = () => this.setState({ adding: false });

  setTravelClass = e => this.setState({ travelClass: e });

  setAirline = e => this.setState({ airline: e.target.value });

  setDescription = e => this.setState({ description: e });

  setFlightNumber = e => this.setState({ flightNumber: e.target.value });

  setTerminal = e => this.setState({ terminal: e.target.value });

  setGate = e => this.setState({ gate: e.target.value });

  saveDetail = () => {
    const { onChange } = this.props;

    this.setState({ adding: false });
    LOGIC_HELPERS.ifFunction(onChange, [this.state]);
  };

  render = () => {
    const { classes } = this.props;
    const {
      travelClass,
      airline,
      flightNumber,
      terminal,
      gate,
      description,
      adding,
    } = this.state;

    if (adding) {
      return (
        <GridItem>
          <div className={classes.addingDiv}>
            <GridContainer direction="column">
              <GridItem>
                <JText bold black>
                  Flight Details
                </JText>
              </GridItem>

              <GridItem>
                <Select
                  name={EVENT_STORE_HELPERS.pathToEventInputName(
                    EVENT_PATHS.flightTravelClass,
                  )}
                  value={travelClass}
                  label="Travel class"
                  options={FLIGHT_TRAVEL_CLASSES_OPTIONS}
                  component={FilledTextField}
                  SelectProps={{ native: true }}
                  onChange={this.setTravelClass}
                />
              </GridItem>

              <GridItem>
                <GridContainer alignItems="center">
                  <GridItem xs={12} sm={6}>
                    <FilledTextField
                      label="Airline"
                      placeholder="Enter airline"
                      value={airline}
                      onChange={this.setAirline}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={6}>
                    <FilledTextField
                      label="Flight number"
                      placeholder="Enter flight number"
                      value={flightNumber}
                      onChange={this.setFlightNumber}
                    />
                  </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem>
                <GridContainer alignItems="center">
                  <GridItem xs={12} sm={6}>
                    <FilledTextField
                      label="Departure terminal"
                      placeholder="Enter departure terminal"
                      value={terminal}
                      onChange={this.setTerminal}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={6}>
                    <FilledTextField
                      label="Departure gate"
                      placeholder="Enter departure gate"
                      value={gate}
                      onChange={this.setGate}
                    />
                  </GridItem>
                </GridContainer>
              </GridItem>

              <GridItem>
                <SimpleRTE
                  name="description"
                  placeholder="Tell some more about this.."
                  filled
                  value={description}
                  onChange={this.setDescription}
                />
              </GridItem>

              <GridItem>
                <GridContainer alignItems="center">
                  <GridItem xs />
                  <GridItem>
                    <JButton onClick={this.cancelAdding}>Cancel</JButton>
                  </GridItem>
                  <GridItem>
                    <JButton
                      block
                      bg="blue"
                      padding="lg"
                      onClick={this.saveDetail}
                    >
                      Save
                    </JButton>
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </div>
        </GridItem>
      );
    }

    if (!travelClass && !airline && !flightNumber && !terminal && !gate) {
      return (
        <GridItem>
          <JButton onClick={this.setAdding}>
            <GridContainer alignItems="center" wrap="nowrap">
              <GridItem>
                <Icon icon="lnr-plus" size="xsmall" color="blue" bold />
              </GridItem>
              <GridItem>
                <GridContainer direction="column" spacing={0}>
                  <GridItem>
                    <JText blue>Flight Details</JText>
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </JButton>
        </GridItem>
      );
    }

    return (
      <GridItem>
        <GridContainer direction="column" spacing={0}>
          <GridItem>
            <GridContainer alignItems="center">
              <GridItem>
                <JText gray>
                  {LOGIC_HELPERS.ifElse(travelClass, travelClass, 'Economy')}{' '}
                  {LOGIC_HELPERS.ifElse(
                    [airline, flightNumber],
                    `${THE_DOT} ${airline} ${flightNumber}`,
                    null,
                    true,
                  )}{' '}
                  {LOGIC_HELPERS.ifElse(
                    terminal,
                    `${THE_DOT} Terminal ${terminal}`,
                  )}{' '}
                  {LOGIC_HELPERS.ifElse(gate, `${THE_DOT} Gate ${gate}`)}
                </JText>
              </GridItem>
              <GridItem>
                <JText noUnderlined link onClick={this.setAdding}>
                  <Icon size="xsmall" icon="lnr-pencil" />
                </JText>
              </GridItem>
            </GridContainer>
          </GridItem>
          {LOGIC_HELPERS.ifElse(
            !isEmptyRTE(description),
            <GridItem>
              <StyledSimpleRTE
                value={description}
                readOnly
                isMinHeightCollapse
              />
            </GridItem>,
          )}
        </GridContainer>
      </GridItem>
    );
  };
}

FlightDetails.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  // eslint-disable-next-line react/no-unused-prop-types
  defaultValues: PropTypes.object,
  onChange: PropTypes.func,

  // resaga props
};

FlightDetails.defaultProps = {
  defaultValues: {
    adding: false,
  },
};

export default compose(
  withStyles(styles, { name: 'FlightDetails' }),
  resaga(CONFIG),
)(FlightDetails);
