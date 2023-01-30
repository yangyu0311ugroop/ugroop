/**
 * Created by stephenkarpinskyj on 10/9/18.
 */
import { DRIVING, BICYCLING } from 'appConstants';
import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { withStyles } from '@material-ui/core';
import GridContainer from 'components/GridContainer';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import GridItem from 'components/GridItem';
import { Location as LocationField } from 'ugcomponents/Inputs';
import { EditableTextForm } from 'smartComponents/Editables';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import EventPatchData from 'smartComponents/Event/components/EventPatchData';
import EventStartTime from 'smartComponents/Event/components/Event/parts/Event/StartTime';
import get from 'lodash/get';
import { EVENT_UTILS } from 'utils/events';
import GoogleMaps from 'utils/hoc/withGoogleMaps';
import { CONFIG, CONFIG_2 } from './config';

const styles = {
  value: {
    flex: 'inherit',
  },
  popper: {
    zIndex: 1600,
    width: '40%',
  },
  noLocation: {
    cursor: 'default',
  },
  viewMapsBtn: {
    color: '#427fed',
  },
};

export class Location extends React.PureComponent {
  updateTimes = () => {
    const { templateId, id } = this.props;
    NODE_API_HELPERS.getTimes({ id: templateId, ids: [id] }, this.props);
  };

  handleSubmit = ({ onSuccess, ...rest }) => {
    const obj = {
      onSuccess: () => {
        this.updateTimes();
        if (onSuccess) onSuccess();
      },
      ...rest,
    };

    TEMPLATE_API_HELPERS.patchEvent(obj, this.props, false);
  };

  onSelect = reduxKey => data => {
    const placeId = get(data, 'place_id', '');
    const address = get(data, 'description', '');
    this.props.resaga.setValue({
      [reduxKey]: {
        placeId,
        address,
      },
    });
  };

  handleOnClear = () => {
    this.onSelect('formPlaceId')(null);
  };

  handleViewMap = ev => {
    ev.stopPropagation();
  };

  getName = (value, index) => JSON.parse(value[index]).name;

  getPlaceId = (value, index) => JSON.parse(value[index]).placeId;

  renderLocation = (props = {}) => {
    const {
      value,
      placeholder,
      inputs,
      icon,
      placeId,
      timeZoneId,
    } = this.props;
    const { label, ...restInputs } = inputs;
    return (
      <LocationField
        location={value}
        placeholder={placeholder}
        label={label}
        locationLabel="Add a location"
        icon={icon}
        placeId={placeId}
        timeZoneId={timeZoneId}
        onSelect={this.onSelect('formPlaceId')}
        {...restInputs}
        {...props}
      />
    );
  };

  renderLabelValue = () => {
    const { noViewLinkIcon } = this.props;
    return this.renderLocation({ noViewLinkIcon });
  };

  renderField = () => {
    const { fieldInputs } = this.props;
    return this.renderLocation(fieldInputs);
  };

  renderStartTimeData = () => {
    const { id, dataId } = this.props;
    return (
      <EventStartTime
        id={id}
        dataId={dataId}
        variant={EVENT_CONSTANTS.VARIANTS.data}
      />
    );
  };

  renderEditableValue = value => {
    const { readOnly, classes } = this.props;
    return readOnly ? null : (
      <GridContainer>
        <GridItem xs={11} className={classes.value}>
          {value}
        </GridItem>
      </GridContainer>
    );
  };

  renderNoLocation = () => {
    const { classes } = this.props;
    return (
      <Button
        dense
        className={classes.noLocation}
        size="small"
        color="alert"
        variant={VARIANTS.BORDERLESS}
      >
        No Location Available
      </Button>
    );
  };

  renderSingleLocation = () => {
    const { placeId, classes } = this.props;

    if (!placeId) {
      return this.renderNoLocation();
    }

    return (
      <GoogleMaps placeId={placeId}>
        {props => (
          <Button
            dense
            size="small"
            color="base"
            href={props.url}
            target="_blank"
            onClick={this.handleViewMap}
            variant={VARIANTS.BORDERLESS}
            className={classes.viewMapsBtn}
          >
            View in Google Maps
          </Button>
        )}
      </GoogleMaps>
    );
  };

  renderMenuItem = (locationName, placeId) => (
    <GoogleMaps placeId={placeId}>
      {props => (
        <Button
          size="extraSmall"
          color="base"
          dense
          href={props.url}
          target="_blank"
          onClick={this.handleViewMap}
          variant={VARIANTS.BORDERLESS}
        >
          {locationName}
        </Button>
      )}
    </GoogleMaps>
  );

  renderDirectionLinkButton = (startName, endName, travelMode) => {
    const start = encodeURI(startName);
    const end = encodeURI(endName);
    const { classes } = this.props;
    return (
      <Button
        size="extraSmall"
        color="base"
        dense
        href={`https://www.google.com/maps/dir/?api=1&origin=${start}&destination=${end}&travelmode=${travelMode}`}
        target="_blank"
        onClick={this.handleViewMap}
        variant={VARIANTS.BORDERLESS}
        className={classes.viewMapsBtn}
      >
        View in Google Maps
      </Button>
    );
  };

  renderCyclingDirection = () => {
    const { values } = this.props;
    const cyclingStartName = this.getName(values, 0);
    const cyclingEndName = this.getName(values, 1);
    const cyclingStartPlaceId = this.getPlaceId(values, 0);
    const cyclingEndPlaceId = this.getPlaceId(values, 1);

    if (!cyclingStartName && !cyclingEndName) {
      return this.renderNoLocation();
    }

    if (
      (cyclingStartName && !cyclingEndName) ||
      (!cyclingStartName && cyclingEndName)
    ) {
      return this.renderMenuItem(
        'View in Google Maps',
        cyclingStartPlaceId || cyclingEndPlaceId,
      );
    }

    return this.renderDirectionLinkButton(
      cyclingStartName,
      cyclingEndName,
      BICYCLING,
    );
  };

  renderDirectionLink = () => {
    const {
      startName,
      endName,
      startPlaceId,
      endPlaceId,
      isCycling,
    } = this.props;
    if (isCycling) {
      return this.renderCyclingDirection();
    }

    if (!startName && !endName) {
      return this.renderNoLocation();
    }

    if ((startName && !endName) || (!startName && endName)) {
      return this.renderMenuItem(
        'View in Google Maps',
        startPlaceId || endPlaceId,
      );
    }
    return this.renderDirectionLinkButton(startName, endName, DRIVING);
  };

  renderEditable = () => {
    const {
      id,
      dataId,
      value,
      inputs,
      editablePlaceholder,
      editableInputs,
      readOnly,
      icon,
      placeId,
      timeZoneId,
    } = this.props;
    if (EVENT_UTILS.participantCannotExecuteEvent(value)) {
      return null;
    }
    const onSelect = this.onSelect('formPlaceId');
    const { name, label, ...restInputs } = inputs;
    const onClear = this.handleOnClear;
    return (
      (!readOnly || value) && (
        <GridItem>
          <EditableTextForm
            value={value}
            name={name}
            label={label}
            renderValue={this.renderEditableValue}
            placeholder={editablePlaceholder}
            onSubmit={this.handleSubmit}
            editableSibling={this.renderLocation()}
            TextComponent={LocationField}
            readOnly={readOnly}
            onClear={onClear}
            TextProps={{
              location: value,
              locationLabel: null,
              icon,
              placeId,
              timeZoneId,
              ...restInputs,
              ...editableInputs,
              onSelect,
            }}
          >
            <EventPatchData id={id} dataId={dataId} subtype />
            {this.renderStartTimeData()}
          </EditableTextForm>
        </GridItem>
      )
    );
  };

  render = () => {
    const { variant } = this.props;
    return (
      <ForEachEventVariant
        variant={variant}
        renderDefault={this.renderEditable}
        renderField={this.renderField}
        renderLabelValue={this.renderLabelValue}
        renderSingleLocation={this.renderSingleLocation}
        renderLocationPopper={this.renderDirectionLink}
      />
    );
  };
}

Location.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  // parent
  id: PropTypes.number,
  dataId: PropTypes.number,
  templateId: PropTypes.number,
  variant: PropTypes.string,
  valuePath: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  iconPath: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  placeIdPath: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  timeZoneIdPath: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  placeholder: PropTypes.string,
  inputs: PropTypes.object,
  fieldInputs: PropTypes.object,
  editableInputs: PropTypes.object,
  editablePlaceholder: PropTypes.string,
  readOnly: PropTypes.bool,
  noViewLinkIcon: PropTypes.bool,
  isCycling: PropTypes.bool,

  // resaga value
  value: PropTypes.string,
  icon: PropTypes.string,
  placeId: PropTypes.string,
  timeZoneId: PropTypes.string,
  startPlaceId: PropTypes.string,
  endPlaceId: PropTypes.string,
  startName: PropTypes.string,
  endName: PropTypes.string,
  values: PropTypes.array,
};

Location.defaultProps = {
  id: null,
  dataId: null,
  templateId: null,
  variant: null,
  valuePath: null,
  iconPath: null,
  placeIdPath: null,
  timeZoneIdPath: null,
  placeholder: null,
  inputs: {},
  fieldInputs: {},
  editableInputs: {},
  editablePlaceholder: null,
  readOnly: false,
  noViewLinkIcon: false,

  value: '',
  icon: '',
  placeId: '',
  timeZoneId: '',
};

export default compose(
  withStyles(styles),
  resaga(CONFIG),
  resaga(CONFIG_2),
)(Location);
