import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core';
import { Location } from 'ugcomponents/Inputs';
import EditableTextForm from 'smartComponents/Editables/TextForm';
import EventPatchData from 'smartComponents/Event/components/EventPatchData';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { isEmptyString } from 'utils/stringAdditions';
import GoogleMaps from 'utils/hoc/withGoogleMaps';
import P from 'viewComponents/Typography';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import styles from './styles';

export class EventLocation extends PureComponent {
  getTextFieldProps = () => ({
    fullWidth: true,
    margin: 'none',
    placeholder: 'Search for Location',
    InputProps: { margin: 'none' },
    autoComplete: 'off',
    autoFocus: true,
  });

  getLocationProps = () => ({
    textFieldProps: this.getTextFieldProps(),
    noGridItem: true,
    editingWithViewLink: true,
  });

  handleViewMap = ev => {
    ev.stopPropagation();
  };

  renderAction = () => (
    <GoogleMaps placeId={this.props.placeId}>
      {props => (
        <Button
          iconButton
          icon="map"
          size="extraSmall"
          color="white"
          dense
          href={props.url}
          target="_blank"
          title="View Map"
          onClick={this.handleViewMap}
          variant={VARIANTS.BORDERLESS}
        />
      )}
    </GoogleMaps>
  );

  renderField = (props = {}) => {
    const { name, placeId, icon, timeZoneId, handleSelect } = this.props;

    return (
      <Location
        {...this.props.inputLocationProps.field}
        noGridItem
        textFieldProps={this.getTextFieldProps()}
        onSelect={handleSelect}
        editingWithViewLink
        location={name}
        placeId={placeId}
        icon={icon}
        timeZoneId={timeZoneId}
        {...props}
      />
    );
  };

  renderEditable = () => {
    const {
      name,
      placeId,
      icon,
      timeZoneId,
      id,
      dataId,
      readOnly,
      label,
      handleSelect,
      inputLocationProps,
      handleSubmit,
      handleOnClear,
    } = this.props;

    const editableLabel = LOGIC_HELPERS.ifElse(
      isEmptyString(label),
      inputLocationProps.editable.label,
      label,
    );
    const onSelect = handleSelect;
    const onClear = handleOnClear;

    return (
      <EditableTextForm
        value={name}
        renderValue={this.renderValue}
        {...inputLocationProps.editable}
        onSubmit={handleSubmit}
        TextComponent={Location}
        readOnly={readOnly}
        editableSibling={this.renderField({
          editingWithViewLink: false,
        })}
        TextProps={{
          ...this.getLocationProps(),
          ...inputLocationProps.editableTextProps,
          locationLabel: null,
          placeId,
          location: name,
          icon,
          timeZoneId,
          onSelect,
        }}
        label={editableLabel}
        onClear={onClear}
      >
        <EventPatchData id={id} dataId={dataId} subtype />
        {this.renderTimeData()}
      </EditableTextForm>
    );
  };

  renderTimeData = () => {
    const { id, dataId, EventTime } = this.props;
    return (
      <EventTime
        id={id}
        dataId={dataId}
        variant={EVENT_CONSTANTS.VARIANTS.data}
      />
    );
  };

  renderLocationLabel = () => {
    const { label: customLabel, inputLocationProps } = this.props;
    const label = LOGIC_HELPERS.ifElse(
      isEmptyString(customLabel),
      inputLocationProps.editable.label,
      customLabel,
    );

    return (
      !!label && (
        <GridItem>
          <P dense weight="bold">
            {label}
          </P>
        </GridItem>
      )
    );
  };

  renderLink = location => map => (
    <a className={this.props.linkClassName} href={map.url} target="_blank">
      {location}
    </a>
  );

  renderLabel = () => {
    const {
      name,
      placeId,
      labelSibling,
      labelDirection,
      showLabel,
    } = this.props;

    const pickup =
      name || labelSibling ? (
        <GridItem>
          <GridContainer direction={labelDirection} spacing={0}>
            {showLabel && this.renderLocationLabel()}
            <GridItem>
              <P dense>
                <GoogleMaps placeId={placeId}>
                  {this.renderLink(name)}
                </GoogleMaps>
              </P>
            </GridItem>
            {LOGIC_HELPERS.ifElse(
              labelSibling,
              <GridItem>{labelSibling}</GridItem>,
              null,
            )}
          </GridContainer>
        </GridItem>
      ) : null;
    return pickup;
  };

  renderValue = value => (
    <GridContainer>
      <GridItem xs={11} className={this.props.classes.value}>
        {value}
      </GridItem>
    </GridContainer>
  );

  renderIcon = () => {
    const {
      name,
      placeId,
      labelSibling,
      labelDirection,
      showLabel,
      icon,
      classes,
    } = this.props;

    const iconLocation = this.renderField({
      editingWithViewLink: false,
      placeId,
      icon,
    });
    const pickup =
      name || labelSibling ? (
        <GridItem>
          <GridContainer direction={labelDirection} spacing={0}>
            {showLabel && this.renderLocationLabel()}
            <GridItem className={classes.iconLocation}>{iconLocation}</GridItem>
            {LOGIC_HELPERS.ifElse(
              labelSibling,
              <GridItem>{labelSibling}</GridItem>,
              null,
            )}
          </GridContainer>
        </GridItem>
      ) : null;
    return pickup;
  };

  render = () => {
    const { variant } = this.props;

    return (
      <ForEachEventVariant
        variant={variant}
        renderDefault={this.renderEditable}
        renderField={this.renderField}
        renderLabel={this.renderLabel}
        renderIcon={this.renderIcon}
      />
    );
  };
}

EventLocation.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  // parent props
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  id: PropTypes.number,
  dataId: PropTypes.number,
  templateId: PropTypes.number,
  label: PropTypes.node,
  labelSibling: PropTypes.node,
  linkClassName: PropTypes.string,
  labelDirection: PropTypes.string,
  showLabel: PropTypes.bool,
  inputLocationProps: PropTypes.object,
  handleSelect: PropTypes.func,
  handleOnClear: PropTypes.func,
  handleSubmit: PropTypes.func,
  EventTime: PropTypes.func,
  PatchData: PropTypes.func,

  placeId: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.string,
  timeZoneId: PropTypes.string,
};

EventLocation.defaultProps = {
  variant: '',
  placeId: '',
  name: '',
  id: null,
  dataId: null,
  templateId: null,
  readOnly: false,
  icon: '',
  label: '',
  timeZoneId: null,
  labelSibling: null,
  linkClassName: '',
  labelDirection: 'column',
  showLabel: true,
  inputLocationProps: {},
};

export default withStyles(styles)(EventLocation);
