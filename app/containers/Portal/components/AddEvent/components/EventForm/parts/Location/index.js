import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { FilledTextField } from 'components/Inputs/TextField/components/FilledInputs';
import { withStyles } from 'components/material-ui';
import TimeZone from 'containers/Portal/components/AddEvent/components/EventForm/parts/TimeZone';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import endInputs from 'smartComponents/Event/components/Event/parts/Event/EndTime/inputs';
import startInputs from 'smartComponents/Event/components/Event/parts/Event/StartTime/inputs';
import JLocation from 'smartComponents/Inputs/JLocation';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { Data } from 'ugcomponents/Inputs';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export const defaultValue = props => {
  const { data, node, position } = props;

  if (!data || !node) return {};

  if (EVENT_VIEW_HELPERS.isTransportation(data)) {
    if (position === 'end') {
      return {
        placeId: EVENT_VIEW_HELPERS.placeIdEnd(data),
        name: EVENT_VIEW_HELPERS.transportationEndPlaceName(data),
        address: EVENT_VIEW_HELPERS.transportationEndName(data),
        timeZoneId: EVENT_VIEW_HELPERS.endTimeZoneId(node, ''),
        timeZoneName: EVENT_VIEW_HELPERS.endTimeZoneName(node),
        timeZoneOffset: EVENT_VIEW_HELPERS.endTimeZoneOffset(node),
      };
    }

    return {
      placeId: EVENT_VIEW_HELPERS.placeIdStart(data),
      name: EVENT_VIEW_HELPERS.transportationStartPlaceName(data),
      address: EVENT_VIEW_HELPERS.transportationStartName(data),
      timeZoneId: EVENT_VIEW_HELPERS.startTimeZoneId(node, ''),
      timeZoneName: EVENT_VIEW_HELPERS.startTimeZoneName(node),
      timeZoneOffset: EVENT_VIEW_HELPERS.startTimeZoneOffset(node),
    };
  }

  return {
    placeId: EVENT_VIEW_HELPERS.locationPlaceId(data),
    name: EVENT_VIEW_HELPERS.locationPlaceName(data),
    address: EVENT_VIEW_HELPERS.locationName(data),
    number: EVENT_VIEW_HELPERS.supplierPhoneNumber(data),
    website: EVENT_VIEW_HELPERS.url(data),
    timeZoneId: EVENT_VIEW_HELPERS.endTimeZoneId(node, ''),
    timeZoneName: EVENT_VIEW_HELPERS.endTimeZoneName(node),
    timeZoneOffset: EVENT_VIEW_HELPERS.endTimeZoneOffset(node),
  };
};

export class Location extends PureComponent {
  state = {
    ...defaultValue(this.props),
  };

  clearData = () => {
    this.setState({
      name: '',
      placeId: '',
      address: '',
      number: '',
      website: '',
    });
  };

  handleSelect = params => {
    const { onSelect } = this.props;
    const { place, timezone, suggestion } = params;

    LOGIC_HELPERS.ifFunction(onSelect, [params]);

    if (place) {
      const {
        formatted_address: address,
        place_id: placeId,
        international_phone_number: intlNumber,
        formatted_phone_number: number,
        website,
      } = place;

      this.setState({
        name: suggestion.name,
        placeId,
        address,
        number: intlNumber || number,
        website,
      });
    }

    if (timezone) {
      const { timeZoneId, dstOffset, rawOffset, timeZoneName } = timezone;

      this.setState({
        timeZoneId,
        timeZoneName,
        timeZoneOffset: rawOffset + dstOffset,
      });
    }
  };

  renderData = () => {
    const { data, position } = this.props;
    const {
      placeId,
      name,
      address,
      number,
      website,
      timeZoneId,
      timeZoneName,
      timeZoneOffset,
    } = this.state;

    if (EVENT_VIEW_HELPERS.isTransportation(data)) {
      if (position === 'start') {
        return (
          <>
            <Data
              currentValue={placeId}
              name={EVENT_STORE_HELPERS.pathToEventInputName(
                EVENT_PATHS.transportationDetailStartPlaceId,
              )}
            />
            <Data
              currentValue={name}
              name={EVENT_STORE_HELPERS.pathToEventInputName(
                EVENT_PATHS.transportationDetailStartPlaceName,
              )}
            />

            <Data currentValue={timeZoneId} {...startInputs.timeZoneId} />
            <Data currentValue={timeZoneName} {...startInputs.timeZoneName} />
            <Data
              currentValue={timeZoneOffset}
              {...startInputs.timeZoneOffset}
            />

            <Data
              currentValue={address}
              name={EVENT_STORE_HELPERS.pathToTempInputName(
                EVENT_PATHS.transportationDetailStartName,
              )}
            />
          </>
        );
      }

      return (
        <>
          <Data
            currentValue={placeId}
            name={EVENT_STORE_HELPERS.pathToEventInputName(
              EVENT_PATHS.transportationDetailEndPlaceId,
            )}
          />
          <Data
            currentValue={name}
            name={EVENT_STORE_HELPERS.pathToEventInputName(
              EVENT_PATHS.transportationDetailEndPlaceName,
            )}
          />
          <Data currentValue={timeZoneId} {...endInputs.timeZoneId} />
          <Data currentValue={timeZoneName} {...endInputs.timeZoneName} />
          <Data currentValue={timeZoneOffset} {...endInputs.timeZoneOffset} />

          <Data
            currentValue={address}
            name={EVENT_STORE_HELPERS.pathToTempInputName(
              EVENT_PATHS.transportationDetailEndName,
            )}
          />
        </>
      );
    }

    return (
      <>
        <Data
          currentValue={placeId}
          name={EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.placeId)}
        />
        <Data
          currentValue={name}
          name={EVENT_STORE_HELPERS.pathToEventInputName(
            EVENT_PATHS.locationPlaceName,
          )}
        />

        <Data currentValue={timeZoneId} {...startInputs.timeZoneId} />
        <Data currentValue={timeZoneName} {...startInputs.timeZoneName} />
        <Data currentValue={timeZoneOffset} {...startInputs.timeZoneOffset} />
        <Data currentValue={timeZoneId} {...endInputs.timeZoneId} />
        <Data currentValue={timeZoneName} {...endInputs.timeZoneName} />
        <Data currentValue={timeZoneOffset} {...endInputs.timeZoneOffset} />

        <Data
          currentValue={address}
          name={EVENT_STORE_HELPERS.pathToTempInputName(
            EVENT_PATHS.locationName,
          )}
        />
        <Data
          currentValue={number}
          name={EVENT_STORE_HELPERS.pathToTempInputName(
            EVENT_PATHS.supplierPhone,
          )}
        />
        <Data
          currentValue={website}
          name={EVENT_STORE_HELPERS.pathToTempInputName(EVENT_PATHS.url)}
        />
      </>
    );
  };

  changeName = name => this.setState({ name });

  render = () => {
    const {
      classes,
      label,
      placeholder,
      showTimeZone,
      autoFocus,
      useFormattedAddress,
      value,
    } = this.props;
    const { placeId, timeZoneName, timeZoneOffset } = this.state;

    return (
      <>
        {this.renderData()}

        <GridContainer direction="column" spacing={0}>
          <GridItem>
            <JLocation
              label={label}
              placeholder={placeholder}
              autoComplete="off"
              allowInput
              onSelect={this.handleSelect}
              onChange={this.changeName}
              textComponent={FilledTextField}
              autoFocus={autoFocus}
              useFormattedAddress={useFormattedAddress}
              defaultValue={value}
              valueSelected={!!placeId}
              clearData={this.clearData}
            />
          </GridItem>

          {showTimeZone && (
            <TimeZone
              timeZoneName={timeZoneName}
              timeZoneOffset={timeZoneOffset}
              component={GridItem}
              className={classes.paddingLeft}
            />
          )}
        </GridContainer>
      </>
    );
  };
}

Location.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  autoFocus: PropTypes.bool,
  showTimeZone: PropTypes.bool,
  useFormattedAddress: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  position: PropTypes.string,
  onSelect: PropTypes.func,
  data: PropTypes.object,
  value: PropTypes.string,

  // resaga props
};

Location.defaultProps = {
  label: 'Event name',
  placeholder: 'Enter a place or address',
};

export default compose(
  withStyles(styles, { name: 'Location' }),
  resaga(CONFIG),
)(Location);
