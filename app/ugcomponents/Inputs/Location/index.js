import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { URL_HELPERS } from 'appConstants';
import classNames from 'classnames';
import GridItem from 'components/GridItem';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { PlaceDetail, PlacesSuggest } from 'ugcomponents/Google';
import DataField from 'ugcomponents/Inputs/DataField';
import ValidationTextField from 'ugcomponents/Inputs/ValidationTextField';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { DEFAULT_ENTER_DELAY } from 'viewComponents/Tooltip';
import styles from './styles';

export class Location extends PureComponent {
  static makeInitialState = (name, icon, placeId, timeZoneId) => ({
    name: name || '',
    url: '',
    icon: icon || '',
    placeId: placeId || '',
    timeZoneId: timeZoneId || '',
    tooltip: false,
    mouseOver: false,
    openSuggest: false,
    onMouseEnter: false,
    isClicked: false,
  });

  state = Location.makeInitialState();

  componentWillMount = () => {
    this.handleChangedLocationProps();
  };

  componentDidUpdate = prevProps => {
    if (
      prevProps.placeId !== this.props.placeId ||
      prevProps.location !== this.props.location
    ) {
      this.handleChangedLocationProps();
    }
  };

  getInputProps = () => {
    const {
      classes,
      inline,
      inputClassName,
      locationLabel,
      placeholder: p,
    } = this.props;
    const placeholder = LOGIC_HELPERS.ifElse(locationLabel, '', p);

    if (!this.inputProps) {
      this.inputProps = {
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        className: classNames(inputClassName, inline && classes.inline),
        autoFocus: inline,
        placeholder,
      };
    }
    return this.inputProps;
  };

  handleChangedLocationProps = () => {
    const { icon, placeId, timeZoneId, location } = this.props;
    this.setState({
      icon,
      placeId,
      timeZoneId,
      name: location,
    });
  };

  handleSelectSuggest = data => {
    const { onSelect } = this.props;
    const { place_id: placeId, description: name, icon } = data;
    LOGIC_HELPERS.ifFunction(onSelect, [data]);
    this.setState({ placeId, name, icon });
  };

  handlePlaceDetailHover = () => this.setState({ tooltip: true });

  openTooltip = () => this.setState({ tooltip: true });

  closeTooltip = () => this.setState({ tooltip: false });

  handleMouseEnter = () => this.setState({ mouseOver: true });

  handleMouseLeave = () => this.setState({ mouseOver: false });

  closeTooltipAndMouseover = () =>
    this.setState({ mouseOver: false, tooltip: false });

  handleLocationChange = value => {
    const { handleChange, locationKey, textFieldProps } = this.props;

    this.setState({
      name: '',
      url: '',
      icon: '',
      placeId: '',
      timeZoneId: '',
    });

    // reset cache on location changed
    if (handleChange) {
      handleChange((textFieldProps && textFieldProps.name) || locationKey)(
        value,
      );
      handleChange('name')('');
      handleChange('url')('');
      handleChange('icon')('');
      handleChange('placeId')('');
      handleChange('timeZoneId')('');
      handleChange('countryShort')('');
      handleChange('countryLong')('');
      handleChange('longtitude')(0);
      handleChange('latitude')(0);
    }
  };

  handleChange = key => value => {
    const { handleChange } = this.props;
    if (key === 'name') return;
    if (handleChange) handleChange(key)(value);
    this.setState({ [key]: value && value.toString() });
  };

  handleFocus = () => this.setState({ openSuggest: true });

  handleBlur = () => {
    setTimeout(() => this.setState({ openSuggest: false }), 200);
  };

  renderLocationTooltip = () => {
    const { placeId } = this.state;
    return (
      <PlaceDetail
        placeId={placeId}
        onMouseEnter={this.handlePlaceDetailHover}
        onClose={this.closeTooltipAndMouseover}
        handleChange={this.handleChange}
      />
    );
  };

  renderPlaceDetail = props => {
    const { placeId } = this.state;
    return (
      !!placeId && (
        <PlaceDetail
          placeId={placeId}
          onClose={this.closeTooltipAndMouseover}
          handleChange={this.handleChange}
          {...props}
        />
      )
    );
  };

  renderInputs = () => {
    const {
      classes,
      location,
      locationKey,
      locationLabel,
      textFieldProps,
      icon: iconProp,
      placeId: placeIdProp,
      timeZoneId: timeZoneIdProp,
      iconInputs,
      placeIdInputs,
      timeZoneIdInputs,
      gridClassName,
    } = this.props;
    const { icon, placeId, timeZoneId } = this.state;

    return (
      <React.Fragment>
        <PlacesSuggest
          key={location}
          absolute={false}
          onChange={this.handleLocationChange}
          onSelectSuggest={this.handleSelectSuggest}
          openSuggest={this.state.openSuggest}
        >
          <ValidationTextField
            name={locationKey}
            type="text"
            label={locationLabel}
            value={location}
            className={classNames(
              classes.inputLocationLabel,
              LOGIC_HELPERS.ifElse(iconProp, classes.iconPadding),
              gridClassName,
            )}
            inputProps={this.getInputProps()}
            {...textFieldProps}
          />
        </PlacesSuggest>
        {iconInputs && (
          <DataField {...iconInputs} value={iconProp} currentValue={icon} />
        )}
        {placeIdInputs && (
          <DataField
            {...placeIdInputs}
            value={placeIdProp}
            currentValue={placeId}
          />
        )}
        {timeZoneIdInputs && (
          <DataField
            {...timeZoneIdInputs}
            value={timeZoneIdProp}
            currentValue={timeZoneId}
          />
        )}
      </React.Fragment>
    );
  };

  renderViewModeIcon = (classes, name, icon) =>
    this.props.showIcon &&
    icon && (
      <span className={classes.locationIcon}>
        <img src={icon} alt={name} width="20" height="20" />
      </span>
    );

  renderViewModeLink = (classes, name, href) => {
    const { locationClassName, editable, link, labelClassName } = this.props;
    const { placeId } = this.state;

    const children = (
      <span key={href} className={labelClassName}>
        {name}
      </span>
    );
    const className = classNames(classes.locationText, classes.locationTextA);

    return (
      <div className={classNames(classes.locationText, locationClassName)}>
        {' '}
        {!editable && link ? (
          <a
            className={className}
            href={URL_HELPERS.googlePlace(name)}
            target="_blank"
          >
            {children}
          </a>
        ) : (
          children
        )}
        <div className={classes.placeDetailContainer}>
          <PlaceDetail placeId={placeId} handleChange={this.handleChange} />
        </div>
      </div>
    );
  };

  renderViewMode = () => {
    const {
      classes,
      withWrap,
      editable,
      showTooltip,
      showViewMode,
    } = this.props;
    const { placeId, name, icon, url, tooltip, mouseOver } = this.state;
    const href = url || name;

    if (!showViewMode) return null;

    let renderViewModeLink = this.renderViewModeLink(classes, name, href);

    if (showTooltip && !editable) {
      renderViewModeLink = (
        <Tooltip
          interactive
          key={href}
          open={tooltip || mouseOver}
          onOpen={this.openTooltip}
          onClose={this.closeTooltip}
          enterDelay={DEFAULT_ENTER_DELAY}
          leaveDelay={100}
          placement="bottom-start"
          title={this.renderLocationTooltip()}
          classes={{ tooltip: classes.tooltip, popper: classes.popper }}
        >
          {renderViewModeLink}
        </Tooltip>
      );
    }

    // TODO: Render loading if place details still being fetched
    return (
      !!name && (
        <div
          key={placeId}
          className={classNames(classes.location, {
            [classes.withWrap]: withWrap,
          })}
        >
          {!editable && this.renderViewModeIcon(classes, name, icon)}
          {renderViewModeLink}
        </div>
      )
    );
  };

  renderEditMode = () => {
    const { onLoadingChange } = this.props;

    return (
      <React.Fragment>
        {this.renderInputs()}
        {this.renderPlaceDetail({ onLoadingChange })}
      </React.Fragment>
    );
  };

  renderInputsWithView = () => {
    const { onLoadingChange } = this.props;

    return (
      <React.Fragment>
        {this.renderInputs()}
        {this.renderViewMode()}
        {/* HACK: Show hidden place detail so api gets called without displaying card */}
        {this.renderPlaceDetail({ hide: true, onLoadingChange })}
      </React.Fragment>
    );
  };

  render = () => {
    const { editing, editingWithViewLink, noGridItem } = this.props;

    let content = null;
    if (editingWithViewLink) {
      content = this.renderInputsWithView();
    } else if (editing) {
      content = this.renderEditMode();
    } else {
      content = this.renderViewMode();
    }

    if (noGridItem) {
      return content;
    }

    return (
      <GridItem>
        <div>{content}</div>
      </GridItem>
    );
  };
}

Location.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  handleChange: PropTypes.func,
  editing: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  editingWithViewLink: PropTypes.bool,
  noViewLinkIcon: PropTypes.bool,
  location: PropTypes.string,
  locationKey: PropTypes.string,
  locationLabel: PropTypes.node,
  icon: PropTypes.string,
  placeId: PropTypes.string,
  timeZoneId: PropTypes.string,
  placeholder: PropTypes.string,
  textFieldProps: PropTypes.object, // pass in this to override default ValidationTextField props
  iconInputs: PropTypes.object,
  placeIdInputs: PropTypes.object,
  timeZoneIdInputs: PropTypes.object,
  onSelect: PropTypes.func,
  withWrap: PropTypes.bool,
  noGridItem: PropTypes.bool,
  showIcon: PropTypes.bool,
  showTooltip: PropTypes.bool,
  showViewMode: PropTypes.bool,
  inline: PropTypes.bool,
  editable: PropTypes.bool,
  inputClassName: PropTypes.string,
  gridClassName: PropTypes.string,
  locationClassName: PropTypes.string,
  onLoadingChange: PropTypes.func,
  link: PropTypes.bool,
  labelClassName: PropTypes.string,
};

Location.defaultProps = {
  editing: 0,
  editingWithViewLink: false,
  noViewLinkIcon: false,
  location: '',
  locationKey: 'editLocation',
  locationLabel: 'Location',
  placeholder: 'Enter Location',
  icon: '',
  placeId: '',
  timeZoneId: '',
  textFieldProps: {},
  withWrap: false,
  noGridItem: false,
  showIcon: true,
  showTooltip: true,
  link: true,
  showViewMode: true,
};

export default compose(withStyles(styles, { name: 'Location' }))(Location);
