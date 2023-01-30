import Radio from '@material-ui/core/Radio';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Hr from 'components/Hr';
import {
  FilledTextField,
  FilledVTextField,
} from 'components/Inputs/TextField/components/FilledInputs';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import DateSelect from 'containers/Portal/components/AddEvent/components/EventForm/forms/FlightBookingForm/components/DateSelect';
import FlightDetails from 'containers/Portal/components/AddEvent/components/EventForm/forms/FlightBookingForm/components/FlightDetails';
import FlightHeader from 'containers/Portal/components/AddEvent/components/EventForm/forms/FlightBookingForm/components/FlightHeader';
import Attachments from 'containers/Portal/components/AddEvent/components/EventForm/parts/Attachments';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import first from 'lodash/first';
import get from 'lodash/get';
import last from 'lodash/last';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { Time } from 'smartComponents/Inputs';
import IATASearchField from 'smartComponents/Inputs/IATASearchField';
import DayDate from 'smartComponents/Node/types/Day/components/DayDate';
import Icon from 'ugcomponents/Icon';
import ValidationRadioGroup from 'ugcomponents/Inputs/ValidationRadioGroup';
import { EVENT_HELPERS } from 'utils/helpers/events';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import JButton from 'viewComponents/Button/variants/JButton';
import { CONFIG, TEMPLATE_ID_CONFIG } from './config';
import styles from './styles';

export const getDefaultValues = props => {
  const { defaultValues, selectedDayId } = props;

  return {
    ...defaultValues,
    tripType: '',
    outboundDayId: selectedDayId,
    flights: [
      {
        departDayId: selectedDayId,
        arriveDayId: selectedDayId,
        ...defaultValues.flights[0],
      },
      {
        departDayId: selectedDayId,
        arriveDayId: selectedDayId,
        ...defaultValues.flights[1],
      },
    ],
  };
};

export class Step1 extends PureComponent {
  state = {
    ...getDefaultValues(this.props),
  };

  componentWillUnmount = () => {
    const { onUnmount } = this.props;

    LOGIC_HELPERS.ifFunction(onUnmount, [this.state]);
  };

  generateItinerary = () => {
    const { flights } = this.state;

    // reduce same route flights to one array
    const agg = flights.reduce((arr, f, index) => {
      const copied = arr.slice();

      const prevTo = get(flights[index - 1], 'to.iataCode');
      const from = get(f, 'from.iataCode', '???');
      const to = get(f, 'to.iataCode', '???');

      // first one or change route, add to array
      if (prevTo === '???' || prevTo !== from) {
        copied.push([from, to]);
      } else {
        // same route, alter array
        copied[copied.length - 1].push(to);
      }

      return copied;
    }, []);

    return agg.map(fs => fs.join(' - ')).join(', ');
  };

  changeFlightAtIndex = (flightIndex, value = {}) => {
    // this.validateAndChangeTime(flightIndex, value);

    this.setState(({ flights: f }) => ({
      flights: [
        ...f.slice(0, flightIndex),
        { ...f[flightIndex], ...value },
        ...f.slice(flightIndex + 1),
      ],
    }));
  };

  validateAndChangeTime = (index, data = {}) => {
    const { dayIds } = this.props;
    const { flights } = this.state;

    const flight = flights[index];

    if (!flight) return null;

    const newFlight = { ...flight, ...data };

    const canBeSameDay = EVENT_HELPERS.canBeSameDay(newFlight, this.props);

    // change arrive date if not valid time
    const departDayIndex = dayIds.indexOf(flight.departDayId);
    const arriveDayIndex =
      departDayIndex + LOGIC_HELPERS.ifElse(canBeSameDay, 0, 1);
    const arriveDayId = dayIds[arriveDayIndex];

    return this.changeFlightAtIndex(index, {
      ...newFlight,
      departDayIndex,
      arriveDayId,
      arriveDayIndex,
    });
  };

  addFlight = (lastFlight = {}) => {
    const {
      to,
      departDayId,
      departDayIndex,
      arriveDayId,
      arriveDayIndex,
    } = lastFlight;

    const dayId = arriveDayId || departDayId;
    const dayIndex = arriveDayIndex || departDayIndex;

    this.setState(({ flights: f }) => ({
      flights: f.concat({
        from: to,
        departDayId: dayId,
        departDayIndex: dayIndex,
        arriveDayId: dayId,
        arriveDayIndex: dayIndex,
      }),
    }));
  };

  addReturnFlights = () => {
    const returnFlights = this.calcReturnFlights();

    this.setState(({ flights: f }) => ({
      flights: f.concat(returnFlights),
    }));
  };

  calcReturnFlights = () => {
    const { flights } = this.state;

    const returnFlights = [];

    for (let i = flights.length - 1; i >= 0; i -= 1) {
      const fromIata = get(flights[i], 'from.iataCode');
      const toIata = get(flights[i], 'to.iataCode');

      if (fromIata && toIata) {
        returnFlights.concat({
          ...flights[i],
          from: flights[i].to,
          to: flights[i].from,
        });
      }
    }

    return returnFlights;
  };

  createOneWay = () => {
    this.setState(
      {
        creating: true,
      },
      this.createBooking,
    );
  };

  createBooking = () => {
    const { templateId } = this.props;
    const { addBooking } = this.state;

    if (addBooking !== 'yes') {
      return this.createEvent();
    }

    const model = EVENT_HELPERS.normaliseFlightBooking(this.state);

    this.setState({ createBooking: true });

    return TEMPLATE_API_HELPERS.createFlightBooking(
      {
        templateId,
        model,
        onSuccess: this.createEvent,
      },
      this.props,
    );
  };

  createEvent = result => {
    let bookingId;

    this.setState({ createBooking: false });

    const bookings = get(result, 'flightBookings', {});

    if (bookings) {
      const key = Object.keys(bookings)[0];
      bookingId = get(bookings, `${key}.id`);
    }

    this.setState({
      createBooking: false,
    });

    this.createNextFlight(bookingId);
  };

  createNextFlight = bookingId => {
    const { onClose } = this.props;
    const { flights, createFlightCount = 0 } = this.state;

    if (createFlightCount === flights.length) {
      LOGIC_HELPERS.ifFunction(onClose);
      return this.setState({
        creating: false,
        createFlights: false,
        createFlightCount: 0,
      });
    }

    return this.createFlight(flights[createFlightCount], bookingId);
  };

  createFlight = (flight, bookingId) => {
    const { templateId } = this.props;

    const model = EVENT_HELPERS.normaliseFlight(flight, bookingId);

    this.setState({ createFlights: true, createBooking: false });

    const { data, node } = model;

    TEMPLATE_API_HELPERS.createEvent(
      {
        templateId,
        model: { data: EVENT_HELPERS.convertAttachments(data), node },
        onSuccess: () => {
          this.setState(
            ({ createFlightCount }) => ({
              creating: true,
              createFlightCount: createFlightCount + 1,
            }),
            () => this.createNextFlight(bookingId),
          );
        },
      },
      this.props,
    );
  };

  handleCreateEventSuccess = ({ node }) => {
    const { timelineId, onClose, portalId } = this.props;

    this.setState({ creating: false });

    LOGIC_HELPERS.ifFunction(onClose);

    const id = Number.parseInt(Object.keys(node)[0], 10);
    const dayId = get(node, `${id}.parentNodeId`);

    PORTAL_HELPERS.openViewEvent(
      {
        id,
        dayId: LOGIC_HELPERS.ifElse(dayId !== timelineId, dayId, 0),
      },
      this.props,
      portalId,
    );
  };

  renderReturnFlights = () => {
    const returnFlights = this.calcReturnFlights();

    if (!returnFlights.length) return null;

    return `(${returnFlights
      .filter(({ from, to }) => from && to)
      .map(({ from, to }) => `${from.iataCode}-${to.iataCode}`)
      .join(' => ')})`;
  };

  removeFlightAtIndex = index => () => {
    this.setState(({ flights: f }) => {
      if (f.length <= 1) return null;

      return {
        flights: [...f.slice(0, index), ...f.slice(index + 1)],
      };
    });
  };

  switchAirports = (index, from, to) => () => {
    this.validateAndChangeTime(index, {
      from: to,
      to: from,
    });
    this.validateAndChangeTime(index + 1, {
      from,
      to,
    });
  };

  renderTimeZone = stop => {
    const timezone = get(stop, 'data.timezone');

    if (!timezone) return '';

    return `(GMT${timezone < 0 ? '' : '+'}${timezone})`;
  };

  renderFormButtons = () => {
    const { classes, onClose } = this.props;
    const {
      flights,
      createBooking,
      createFlight,
      createFlightCount,
      creating,
      addBooking,
      tripType,
    } = this.state;

    if (!tripType) return null;

    return (
      <GridItem>
        <div className={classes.formButtons}>
          <GridContainer alignItems="center">
            <GridItem>
              <JButton block bg="gray" padding="lg" bold onClick={onClose}>
                Discard
              </JButton>
            </GridItem>
            <GridItem xs>
              <JButton
                disabled={!addBooking || creating}
                block
                bg="blue"
                padding="lg"
                bold
                onClick={() => this.createOneWay()}
              >
                {createBooking && 'Creating Booking'}
                {createFlight &&
                  `Creating Flight (${createFlightCount}/${flights.length})`}
                {!createBooking && !createFlight && 'Create Flight'}
              </JButton>
            </GridItem>
          </GridContainer>
        </div>
      </GridItem>
    );
  };

  renderSwitchAirports = (index, from, to) => {
    const { tripType } = this.state;

    if (!from.iataCode || !to.iataCode) {
      return null;
    }

    const isReturnFlight = tripType === 'return' && index === 1;

    if (isReturnFlight) {
      return null;
    }

    return (
      <GridItem>
        <JButton onClick={this.switchAirports(index, from, to)}>
          <Icon rotate90 icon="lnr-tab" size="normal" color="blue" />
        </JButton>
      </GridItem>
    );
  };

  renderValidateTime = flight => {
    const { arriveDayId, arriveTime, departTime } = flight;

    if (!arriveTime || !departTime) return null;

    const canBeSameDay = EVENT_HELPERS.canBeSameDay(flight);
    const duration = EVENT_HELPERS.validateTime(flight, canBeSameDay);
    const journeyTime = MOMENT_HELPERS.renderDurationHoursMinutes(duration);

    if (!duration) return null;

    if (duration && duration.asMilliseconds() < 0)
      return (
        <GridItem>
          <GridContainer alignItems="center" wrap="nowrap">
            <GridItem>
              <Icon icon="lnr-warning" color="warning" />
            </GridItem>
            <GridItem>
              <JText warning>Arrive time is before depart time</JText>
            </GridItem>
          </GridContainer>
        </GridItem>
      );

    return (
      <GridItem>
        <GridContainer alignItems="center" wrap="nowrap">
          <GridItem xs>
            <JText gray>Journey time: {journeyTime}</JText>{' '}
            {!canBeSameDay && <JText danger>(Overnight Flight)</JText>}
          </GridItem>
          {canBeSameDay ? (
            <GridItem>
              <JText gray>Arrive same day</JText>
            </GridItem>
          ) : (
            <GridItem>
              <JText gray>
                Arrive <DayDate id={arriveDayId} />
              </JText>
            </GridItem>
          )}
        </GridContainer>
      </GridItem>
    );
  };

  renderFlight = (flight, index, prevFlight = {}) => {
    const { tripType, flights } = this.state;

    const prevOrigin = get(prevFlight, 'from', {});
    const prevDestination = get(prevFlight, 'to', {});

    let from = get(flight, 'from');
    let to = get(flight, 'to');
    const departDayId = get(flight, 'departDayId');

    if (tripType === 'multi') {
      if (!from) from = prevDestination;
    } else if (tripType === 'return') {
      if (!from) from = prevDestination;
      if (!to) to = prevOrigin;
    }

    if (!from) from = {};
    if (!to) to = {};

    return (
      <GridItem>
        <GridContainer direction="column">
          <FlightHeader
            departDayId={departDayId}
            from={from}
            to={to}
            flights={flights}
            tripType={tripType}
            index={index}
            onRemoveFlight={this.removeFlightAtIndex}
          />

          {tripType === 'multi' && (
            <>
              <GridItem>
                <GridContainer alignItems="center">
                  <GridItem xs>
                    <GridContainer direction="column">
                      <GridItem>
                        <IATASearchField
                          name="temp.fromValue"
                          label="From"
                          placeholder="Enter departing airport"
                          component={FilledVTextField}
                          value={from.airportName}
                          cityName={from.cityName}
                          iataCode={from.iataCode}
                          timeZoneId={from.timeZoneId}
                          onChange={a => {
                            this.validateAndChangeTime(index, {
                              from: a,
                              departTime: null,
                              arriveTime: null,
                            });
                          }}
                        />
                      </GridItem>
                      <GridItem>
                        <IATASearchField
                          name="temp.toValue"
                          label="To"
                          placeholder="Enter arriving airport"
                          component={FilledVTextField}
                          value={to.airportName}
                          cityName={to.cityName}
                          iataCode={to.iataCode}
                          timeZoneId={to.timeZoneId}
                          onChange={a => {
                            this.validateAndChangeTime(index, {
                              to: a,
                              departTime: null,
                              arriveTime: null,
                            });
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                  </GridItem>

                  {from.iataCode && to.iataCode && (
                    <GridItem>
                      <JButton
                        onClick={() => {
                          this.switchAirports(index, from, to)();
                        }}
                      >
                        <Icon
                          rotate90
                          icon="lnr-tab"
                          size="normal"
                          color="blue"
                        />
                      </JButton>
                    </GridItem>
                  )}
                </GridContainer>
              </GridItem>

              <GridItem>
                <DateSelect
                  key={departDayId}
                  value={departDayId}
                  label="Depart date"
                  placeholder="Enter departing date"
                  onChange={(dayId, i) => {
                    this.validateAndChangeTime(index, {
                      departDayId: dayId,
                      departDayIndex: i,
                    });
                  }}
                />
              </GridItem>
            </>
          )}

          <GridItem>
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                <GridContainer wrap="nowrap">
                  <GridItem xs>
                    <Time
                      name="departTime"
                      label={`Depart ${this.renderTimeZone(from)}`}
                      placeholder="Enter departing time"
                      textComponent={FilledVTextField}
                      onChange={time => {
                        this.validateAndChangeTime(index, { departTime: time });
                      }}
                    />
                  </GridItem>
                  <GridItem xs>
                    <Time
                      name="arriveTime"
                      label={`Arrive ${this.renderTimeZone(to)}`}
                      placeholder="Enter arriving time"
                      textComponent={FilledVTextField}
                      onChange={time => {
                        this.validateAndChangeTime(index, { arriveTime: time });
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </GridItem>

          {this.renderValidateTime(flight)}

          <FlightDetails
            defaultValues={flight}
            onChange={values => {
              this.changeFlightAtIndex(index, values);
            }}
          />

          <GridItem>
            <Attachments
              onChange={values => {
                this.changeFlightAtIndex(index, values);
              }}
            />
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  genItinerary = () => {
    const { flights } = this.state;

    return flights
      .reduce((arr, flight, index) => {
        const prevIata = get(flights[index - 1], 'to.iataCode');
        const curOriginIata = get(flight, 'from.iataCode');
        const curDestinationIata = get(flight, 'to.iataCode');

        let newArr = arr.slice();

        // first flight or route change
        if (!newArr[arr.length - 1] || prevIata !== curOriginIata) {
          newArr = newArr.concat(`${curOriginIata} - ${curDestinationIata}`);

          return newArr;
        }

        // concat to current string
        newArr[arr.length - 1] = `${
          arr[arr.length - 1]
        } - ${curDestinationIata}`;

        return newArr;
      }, [])
      .join(', ');
  };

  changeAdding = addBooking => {
    this.setState({
      addBooking,
      itinerary: LOGIC_HELPERS.ifElse(addBooking, this.genItinerary(), ''),
    });
  };

  renderFlightForm = () => {
    const {
      tripType,
      addBooking,
      itinerary,
      number,
      passengerCount,
      bookingBy,
      flights,
    } = this.state;

    return (
      <>
        <Hr half />

        <GridItem>
          <GridContainer direction="column" spacing={3}>
            <>
              <GridItem>
                <GridContainer direction="column" spacing={2}>
                  {flights.map((flight, index) =>
                    this.renderFlight(flight, index, flights[index - 1]),
                  )}
                </GridContainer>
              </GridItem>

              {tripType === 'multi' && (
                <>
                  <Hr half />

                  <GridItem>
                    <JButton
                      onClick={() => {
                        this.addFlight(last(flights));
                      }}
                    >
                      <JText noUnderlined link>
                        <Icon icon="lnr-plus" size="normal" paddingRight bold />{' '}
                        Add another flight
                      </JText>
                    </JButton>
                  </GridItem>
                </>
              )}

              <Hr half />

              <GridItem>
                <GridContainer direction="column" spacing={0}>
                  <GridItem>
                    <ValidationRadioGroup
                      name="temp.booked"
                      row
                      noMargin
                      required
                      options={{ yes: 'Yes', no: 'No' }}
                      onChange={this.changeAdding}
                      label={
                        <JText bold dark>
                          Have you booked?{' '}
                          <JText sm danger>
                            Required
                          </JText>
                        </JText>
                      }
                    />
                  </GridItem>
                  {addBooking === 'yes' && (
                    <GridItem>
                      <GridContainer direction="column">
                        <GridItem>
                          <FilledTextField
                            label="Itinerary name"
                            placeholder="Enter itinerary name"
                            defaultValue={itinerary}
                            onChange={e => {
                              this.setState({
                                itinerary: e.target.value,
                              });
                            }}
                          />
                        </GridItem>

                        <GridItem>
                          <GridContainer alignItems="center">
                            <GridItem xs={6}>
                              <FilledTextField
                                label="Booking number"
                                placeholder="Enter booking number"
                                onChange={e =>
                                  this.setState({ number: e.target.value })
                                }
                                defaultValue={number}
                              />
                            </GridItem>
                            <GridItem xs={6}>
                              <FilledTextField
                                type="number"
                                label="Passenger count"
                                placeholder="Enter passenger count"
                                onChange={e =>
                                  this.setState({
                                    passengerCount: e.target.value,
                                  })
                                }
                                defaultValue={passengerCount}
                              />
                            </GridItem>
                          </GridContainer>
                        </GridItem>

                        <GridItem>
                          <FilledTextField
                            label="Booking with"
                            placeholder="Enter booking with"
                            onChange={e =>
                              this.setState({ bookingBy: e.target.value })
                            }
                            defaultValue={bookingBy}
                          />
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                  )}
                </GridContainer>
              </GridItem>
            </>
          </GridContainer>
        </GridItem>
      </>
    );
  };

  selectReturnType = () => {
    // set return flight to be reversed origin and destination
    this.setState(({ flights: f }) => {
      const flight = first(f);

      const origin = get(flight, 'from', {});
      const destination = get(flight, 'to', {});

      const newFlights = [
        flight,
        {
          from: destination,
          to: origin,
        },
      ];

      return {
        tripType: 'return',
        flights: newFlights,
      };
    });
  };

  renderSelectFlightType = () => {
    const { tripType } = this.state;

    return (
      <>
        <GridItem>
          <GridContainer direction="column">
            <GridItem>
              <JText sm uppercase gray bold>
                {LOGIC_HELPERS.ifElse(
                  tripType,
                  'Flight information',
                  'Select flight type',
                )}
              </JText>
            </GridItem>
            <GridItem>
              <GridContainer alignItems="center" wrap="nowrap">
                <GridItem>
                  <JButton
                    bg="gray"
                    disabled={tripType === 'return'}
                    block
                    onClick={this.selectReturnType}
                  >
                    <GridContainer alignItems="center" wrap="nowrap">
                      <GridItem>
                        <Radio
                          checked={tripType === 'return'}
                          value="return"
                          name="tripType"
                          color="primary"
                        />
                      </GridItem>
                      <GridItem>Return</GridItem>
                    </GridContainer>
                  </JButton>
                </GridItem>

                <GridItem>
                  <JButton
                    bg="gray"
                    disabled={tripType === 'oneway'}
                    block
                    onClick={() => {
                      this.setState(({ flights: f }) => ({
                        tripType: 'oneway',
                        flights: f.slice(0, 1),
                      }));
                    }}
                  >
                    <GridContainer alignItems="center" wrap="nowrap">
                      <GridItem>
                        <Radio
                          checked={tripType === 'oneway'}
                          value="oneway"
                          name="tripType"
                          color="primary"
                        />
                      </GridItem>
                      <GridItem>One way</GridItem>
                    </GridContainer>
                  </JButton>
                </GridItem>

                <GridItem>
                  <JButton
                    bg="gray"
                    disabled={tripType === 'multi'}
                    block
                    onClick={() => {
                      this.setState(({ flights: f }) => ({
                        tripType: 'multi',
                        flights: f.slice(0, 1),
                      }));
                    }}
                  >
                    <GridContainer alignItems="center" wrap="nowrap">
                      <GridItem>
                        <Radio
                          checked={tripType === 'multi'}
                          value="multi"
                          name="tripType"
                          color="primary"
                        />
                      </GridItem>
                      <GridItem>Multi-city</GridItem>
                    </GridContainer>
                  </JButton>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>

        {tripType && <Hr half />}
      </>
    );
  };

  renderReturnFlight = () => {
    const { tripType, from, to, outboundDayId, returnDayId } = this.state;

    if (!tripType) return null;

    return (
      <GridContainer direction="column">
        {tripType !== 'multi' && (
          <>
            <GridItem>
              <GridContainer alignItems="center">
                <GridItem xs>
                  <GridContainer direction="column">
                    <GridItem>
                      <IATASearchField
                        name="temp.fromValue"
                        label="From"
                        placeholder="Enter departing airport"
                        component={FilledVTextField}
                        value={from.airportName}
                        cityName={from.cityName}
                        iataCode={from.iataCode}
                        timeZoneId={from.timeZoneId}
                        onChange={a => {
                          this.setState({ from: a });
                          this.validateAndChangeTime(0, {
                            from: a,
                          });
                          this.validateAndChangeTime(1, {
                            to: a,
                          });
                        }}
                      />
                    </GridItem>
                    <GridItem>
                      <IATASearchField
                        name="temp.toValue"
                        label="To"
                        placeholder="Enter arriving airport"
                        component={FilledVTextField}
                        value={to.airportName}
                        cityName={to.cityName}
                        iataCode={to.iataCode}
                        timeZoneId={to.timeZoneId}
                        onChange={a => {
                          this.setState({ to: a });
                          this.validateAndChangeTime(0, {
                            to: a,
                          });
                          this.validateAndChangeTime(1, {
                            from: a,
                          });
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </GridItem>

                {from.iataCode && to.iataCode && (
                  <GridItem>
                    <JButton
                      onClick={() => {
                        this.setState({ from: to, to: from });
                        this.switchAirports(0, from, to)();
                      }}
                    >
                      <Icon
                        rotate90
                        icon="lnr-tab"
                        size="normal"
                        color="blue"
                      />
                    </JButton>
                  </GridItem>
                )}
              </GridContainer>
            </GridItem>

            <GridItem>
              <GridContainer alignItems="center">
                <GridItem
                  xs={LOGIC_HELPERS.ifElse(tripType === 'return', 6, 12)}
                >
                  <DateSelect
                    value={outboundDayId}
                    label="Depart date"
                    placeholder="Enter departing date"
                    onChange={(dayId, i) => {
                      this.setState({ outboundDayId: dayId });
                      this.validateAndChangeTime(0, {
                        departDayId: dayId,
                        departDayIndex: i,
                      });
                    }}
                  />
                </GridItem>
                {tripType === 'return' && (
                  <GridItem xs={6}>
                    <DateSelect
                      offsetId={outboundDayId}
                      value={returnDayId}
                      label="Return date"
                      placeholder="Enter returning date"
                      onChange={(dayId, i) => {
                        this.setState({ returnDayId: dayId });
                        this.validateAndChangeTime(1, {
                          departDayId: dayId,
                          departDayIndex: i,
                        });
                      }}
                    />
                  </GridItem>
                )}
              </GridContainer>
            </GridItem>
          </>
        )}

        {(tripType === 'multi' ||
          (from.iataCode &&
            to.iataCode &&
            outboundDayId &&
            (tripType !== 'return' || returnDayId))) &&
          this.renderFlightForm()}
      </GridContainer>
    );
  };

  render = () => {
    const { classes, smDown } = this.props;

    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          <div
            className={classnames(
              LOGIC_HELPERS.ifElse(
                smDown,
                classes.formGridSm,
                classes.formGrid,
              ),
            )}
          >
            <GridContainer direction="column">
              {this.renderSelectFlightType()}

              {this.renderReturnFlight()}
            </GridContainer>
          </div>
        </GridItem>

        {this.renderFormButtons()}
      </GridContainer>
    );
  };
}

Step1.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  smDown: PropTypes.bool,

  // parent props
  // eslint-disable-next-line react/no-unused-prop-types
  defaultValues: PropTypes.object,
  dayIds: PropTypes.array,
  onUnmount: PropTypes.func,
  onClose: PropTypes.func,
  templateId: PropTypes.number,
  timelineId: PropTypes.number,
  portalId: PropTypes.number,

  // resaga props
};

Step1.defaultProps = {
  dayIds: [],
  defaultValues: {
    from: {},
    to: {},
    flights: [{}, {}],
    tripType: 'return',
    createFlightCount: 0,
  },
};

export default compose(
  withStyles(styles, { name: 'Step1' }),
  withSMDown,
  resaga(TEMPLATE_ID_CONFIG),
  resaga(CONFIG),
)(Step1);
