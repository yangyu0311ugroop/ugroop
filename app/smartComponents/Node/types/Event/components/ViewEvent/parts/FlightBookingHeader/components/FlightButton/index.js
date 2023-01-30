import { THE_BIG_DOT, THE_LONG_DASH } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import AttachmentsCard from 'containers/Portal/components/ViewEvent/components/AttachmentsCard';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import DayDate from 'smartComponents/Node/types/Day/components/DayDate';
import { EVENT_DATA_HELPERS } from 'smartComponents/Node/types/Event/dataHelpers';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import Icon from 'ugcomponents/Icon';
import { StyledSimpleRTE } from 'ugcomponents/Inputs';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { isEmptyRTE } from 'utils/helpers/RTE';
import { DATA_ID_CONFIG, CONFIG } from './config';
import styles from './styles';

export class FlightButton extends PureComponent {
  handleClick = () => {
    const { id, parentNodeId, onClick } = this.props;

    LOGIC_HELPERS.ifFunction(onClick, [id, parentNodeId]);
  };

  renderDetail = () => {
    const { classes, data } = this.props;

    const arr = [];

    const airline = EVENT_VIEW_HELPERS.airline(data);
    const flightNumber = EVENT_VIEW_HELPERS.flightNumber(data);
    if (airline || flightNumber) {
      arr.push(`${airline || ''} ${flightNumber || ''}`);
    }

    const travelClass = EVENT_VIEW_HELPERS.travelClass(data);
    if (travelClass) {
      arr.push(travelClass);
    }

    const terminal = EVENT_VIEW_HELPERS.terminal(data);
    if (terminal) {
      arr.push(`Terminal ${terminal}`);
    }

    const gate = EVENT_VIEW_HELPERS.gate(data);
    if (gate) {
      arr.push(`Gate ${gate}`);
    }

    if (!arr.length) return null;

    return (
      <GridItem>
        <div className={classes.detail}>
          <JText gray>{arr.join(` ${THE_BIG_DOT} `)}</JText>
        </div>
      </GridItem>
    );
  };

  renderEmptyRoute = () => {
    const { index } = this.props;

    return (
      <GridItem>
        <b>Flight {index + 1}</b>
      </GridItem>
    );
  };

  renderRoute = () => {
    const { data } = this.props;

    const cityNameStart = EVENT_VIEW_HELPERS.cityNameStart(data);
    const cityNameEnd = EVENT_VIEW_HELPERS.cityNameEnd(data);

    if (!cityNameStart || !cityNameEnd) {
      return this.renderEmptyRoute();
    }

    const startShort = cityNameStart.split(', ')[0];
    const endShort = cityNameEnd.split(', ')[0];

    if (!startShort && !endShort) {
      return this.renderEmptyRoute();
    }

    return (
      <GridItem>
        <b>
          {startShort || '???'} {THE_LONG_DASH} {endShort || '???'}
        </b>
      </GridItem>
    );
  };

  render = () => {
    const { classes, dataId, node, data, parentNodeId } = this.props;

    const airportIATAStart = EVENT_VIEW_HELPERS.airportIATAStart(data, '???');
    const airportIATAEnd = EVENT_VIEW_HELPERS.airportIATAEnd(data, '???');
    const cityNameStart = EVENT_VIEW_HELPERS.cityNameStart(data);
    const cityNameEnd = EVENT_VIEW_HELPERS.cityNameEnd(data);
    const description = EVENT_VIEW_HELPERS.description(data);
    const startTime = EVENT_VIEW_HELPERS.startTime(node);
    const endTime = EVENT_VIEW_HELPERS.endTime(node);
    const endTimeValue = EVENT_VIEW_HELPERS.endTimeValue(node);
    const days = EVENT_DATA_HELPERS.durationToDays(endTimeValue);

    const duration = EVENT_VIEW_HELPERS.eventDuration(node);
    const journeyTime = MOMENT_HELPERS.renderDurationHoursMinutes(duration);

    return (
      <GridItem>
        <GridContainer direction="column" spacing={1}>
          <GridItem>
            <JText gray>
              <GridContainer alignItems="center">
                {this.renderRoute()}
                <GridItem>
                  <DayDate id={parentNodeId} showDayIndex showToday />
                </GridItem>
              </GridContainer>
            </JText>
          </GridItem>
          <GridItem>
            <GridContainer
              alignItems="center"
              className={classnames(classes.card, classes.arrowHover)}
              onClick={this.handleClick}
            >
              <GridItem xs>
                <GridContainer direction="column" spacing={2}>
                  <GridItem>
                    <GridContainer direction="column" spacing={1}>
                      {this.renderDetail()}
                      <GridItem>
                        <GridContainer alignItems="center" spacing={2}>
                          <GridItem className={classes.time}>
                            <JText sm gray>
                              {journeyTime}
                            </JText>
                          </GridItem>
                          <GridItem>
                            <div className={classes.ruler}>
                              &nbsp;
                              <br />
                              &nbsp;
                            </div>
                          </GridItem>
                          <GridItem>
                            <GridContainer direction="column" spacing={1}>
                              <GridItem>
                                <JText danger>{startTime}</JText>
                              </GridItem>
                              <GridItem>
                                <JText danger>{endTime}</JText>
                              </GridItem>
                            </GridContainer>
                          </GridItem>
                          <GridItem>
                            <GridContainer direction="column" spacing={1}>
                              <GridItem>
                                <JText dark>
                                  <b>{airportIATAStart}</b> {cityNameStart}
                                </JText>
                              </GridItem>
                              <GridItem>
                                <JText dark>
                                  <b>{airportIATAEnd}</b> {cityNameEnd}
                                </JText>
                              </GridItem>
                            </GridContainer>
                          </GridItem>
                        </GridContainer>
                      </GridItem>
                    </GridContainer>
                  </GridItem>

                  <GridItem>
                    <GridContainer alignItems="center" spacing={2}>
                      <GridItem>
                        <JText sm dark>
                          <JText bold>
                            Arrives {days > 0 ? 'next day' : 'same day'}:
                          </JText>{' '}
                          <DayDate
                            id={parentNodeId}
                            showDayIndex
                            showToday
                            offset={`P${days}D`}
                          />
                        </JText>
                      </GridItem>
                      {days > 0 && (
                        <GridItem>
                          <JText sm danger>
                            <Icon size="xsmall" icon="lnr-warning" /> Overnight
                            Flight
                          </JText>
                        </GridItem>
                      )}
                    </GridContainer>
                  </GridItem>

                  {!isEmptyRTE(description) && (
                    <GridItem>
                      <StyledSimpleRTE
                        value={description}
                        readOnly
                        renderSeeMore
                      />
                    </GridItem>
                  )}

                  <AttachmentsCard card={false} id={dataId} data={data} />
                </GridContainer>
              </GridItem>
              <GridItem className={classes.nextButton}>
                <Icon icon="lnr-arrow-right" className={classes.content} />
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };
}

FlightButton.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  data: PropTypes.object,
  node: PropTypes.object,
  id: PropTypes.number,
  dataId: PropTypes.number,
  index: PropTypes.number,
  parentNodeId: PropTypes.number,
  onClick: PropTypes.func,

  // resaga props
};

FlightButton.defaultProps = {
  data: {},
  node: {},
};

export default compose(
  withStyles(styles, { name: 'FlightButton' }),
  resaga(DATA_ID_CONFIG),
  resaga(CONFIG),
)(FlightButton);
