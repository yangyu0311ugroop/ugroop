import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import DayDate from 'smartComponents/Node/types/Day/components/DayDate';
import { CONFIG } from './config';
import styles from './styles';

export class FlightHeader extends PureComponent {
  renderFlightText = () => {
    const { tripType, index } = this.props;

    if (tripType === 'return') {
      return '';
    }

    if (tripType === 'oneway') {
      return 'Flight';
    }

    // multi
    return `Flight ${index + 1}`;
  };

  renderRemoveFlight = () => {
    const { tripType, flights, onRemoveFlight, index } = this.props;

    if (tripType !== 'multi') return null;
    if (flights.length < 2) return null;

    return (
      <GridItem>
        <JText danger onClick={onRemoveFlight(index)}>
          Remove flight
        </JText>
      </GridItem>
    );
  };

  render = () => {
    const { classes, from, to, departDayId, tripType } = this.props;

    if (!from.iataCode || !to.iataCode)
      return (
        <GridItem>
          <div className={classes.header}>
            <GridContainer alignItems="center" spacing={1}>
              <GridItem xs>
                <JText dark>Enter flight</JText>
              </GridItem>
              {this.renderRemoveFlight()}
            </GridContainer>
          </div>
        </GridItem>
      );

    return (
      <GridItem>
        <div className={classes.header}>
          <GridContainer alignItems="center" spacing={1}>
            <GridItem xs>
              <GridContainer wrap="nowrap">
                <GridItem xs>
                  <JText bold dark>
                    {from.iataCode || '???'} - {to.iataCode || '???'}
                  </JText>
                </GridItem>
                {tripType !== 'multi' && departDayId && (
                  <GridItem>
                    <JText gray>
                      <DayDate id={departDayId} />
                    </JText>
                  </GridItem>
                )}
              </GridContainer>
            </GridItem>
            {this.renderRemoveFlight()}
          </GridContainer>
        </div>
      </GridItem>
    );
  };
}

FlightHeader.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  from: PropTypes.object,
  to: PropTypes.object,
  flights: PropTypes.array,
  tripType: PropTypes.string,
  onRemoveFlight: PropTypes.func,
  index: PropTypes.number,
  departDayId: PropTypes.number,

  // resaga props
};

FlightHeader.defaultProps = {
  from: {},
  to: {},
  flights: [],
};

export default compose(
  withStyles(styles, { name: 'FlightHeader' }),
  resaga(CONFIG),
)(FlightHeader);
