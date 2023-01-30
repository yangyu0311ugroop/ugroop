import { withStyles } from '@material-ui/core/styles';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { LINK, LOCATION, SECONDARY } from 'appConstants';
import classnames from 'classnames';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import NodeProp from 'smartComponents/Node/components/NodeProp';
import Form from 'ugcomponents/Form';
import Icon from 'ugcomponents/Icon';
import LocationInput from 'ugcomponents/Inputs/Location';
import { CONFIG } from './config';
import styles from './styles';

export class Location extends PureComponent {
  state = {
    loading: false,
  };

  isEqual = ({ location: newLocation, placeId: newPlaceId }) => {
    const { location, placeId } = this.props;

    if (!location && !newLocation && !placeId && !newPlaceId) return true;

    return location === newLocation && placeId === newPlaceId;
  };

  makeNode = ({ location, icon, placeId, timeZoneId }, { type }) => ({
    customData: location
      ? { location, icon, placeId, timeZoneId }
      : {
          location: null,
          icon: null,
          placeId: null,
          timeZoneId: null,
        },
    type,
  });

  handleLoadingChange = loading => {
    this.setState({ loading });
  };

  handleSave = () => {
    const { id } = this.props;
    NODE_API_HELPERS.getTreeAndTimes({ id }, this.props);
  };

  renderView = ({ value }) => {
    const {
      icon,
      placeId,
      editable,
      showIcon,
      showTooltip,
      timeZoneId,
      locationClassName,
      link,
      labelClassName,
    } = this.props;

    return (
      value && (
        <Form>
          <LocationInput
            location={value}
            icon={icon}
            placeId={placeId}
            timeZoneId={timeZoneId}
            editable={editable}
            showIcon={showIcon}
            showTooltip={showTooltip}
            locationClassName={locationClassName}
            labelClassName={labelClassName}
            link={link}
          />
        </Form>
      )
    );
  };

  renderEdit = ({ value, className, gridClassName }) => {
    const { icon, placeId, timeZoneId, placeholder } = this.props;

    return (
      <LocationInput
        inline
        icon={icon}
        placeId={placeId}
        timeZoneId={timeZoneId}
        location={value}
        editingWithViewLink
        locationKey="location"
        locationLabel=""
        placeholder={placeholder}
        alignItems="stretch"
        placeIdInputs={{ name: 'placeId' }}
        iconInputs={{ name: 'icon' }}
        timeZoneIdInputs={{ name: 'timeZoneId' }}
        onLoadingChange={this.handleLoadingChange}
        inputClassName={classnames(className, gridClassName)}
      />
    );
  };

  renderLink = () => {
    const { location, classes } = this.props;
    return (
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${location}`}
        target="_blank"
        className={classes.linkButton}
      >
        View in Google Maps <Icon icon="lnr-launch" size="xsmall" paddingLeft />
      </a>
    );
  };

  render = () => {
    const { classes, id, editable, variant, noContent, ...props } = this.props;
    const { loading } = this.state;

    if (variant === LINK) {
      return this.renderLink();
    }

    return (
      <NodeProp
        id={id}
        valueKey={LOCATION}
        component={GridItem}
        showEmpty={editable}
        editable={editable}
        noContent={noContent}
        isCustomData
        variant={variant}
        className={classes.secondary}
        renderView={this.renderView}
        renderEdit={this.renderEdit}
        makeNode={this.makeNode}
        isEqual={this.isEqual}
        editGridClassName={classes.editGridClassName}
        onSave={this.handleSave}
        clearContent={this.clearContent}
        loading={loading}
        {...props}
      />
    );
  };
}

Location.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  variant: PropTypes.string,
  locationClassName: PropTypes.string,
  editable: PropTypes.bool,
  showIcon: PropTypes.bool,
  showTooltip: PropTypes.bool,
  link: PropTypes.bool,
  labelClassName: PropTypes.string,
  noContent: PropTypes.node,
  placeholder: PropTypes.string,

  // resaga props
  location: PropTypes.string,
  placeId: PropTypes.string,
  icon: PropTypes.string,
  timeZoneId: PropTypes.string,

  // customisable props
};

Location.defaultProps = {
  id: 0,
  editable: false,
  location: '',
  timeZoneId: null,
  variant: SECONDARY,
  noContent: 'Add a location',
  placeholder: 'Add a location',
};

export default compose(
  withStyles(styles, { name: 'Location' }),
  resaga(CONFIG),
)(Location);
