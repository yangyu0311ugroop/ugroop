import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Directions from 'smartComponents/Google/Maps/Directions';
import { GOOGLE_API_KEYS } from 'appConstants';
import get from 'lodash/get';

import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

import { CONFIG } from './config';

export class Map extends Component {
  state = {
    hasDirection: true,
  };

  componentWillUnmount = () => {
    this.props.resaga.setValue({
      distance: null,
      pickup: null,
      dropoff: null,
    });
  };

  getContainerHeight = () => {
    const { hasDirection } = this.state;

    return LOGIC_HELPERS.ifElse(hasDirection, 240, 0);
  };

  getGoogleMapsURL = () => GOOGLE_API_KEYS.GOOGLE_MAPS_URL || '';

  handleDirectionChange = reduxKey => result => {
    const distance = get(result, 'routes[0].legs[0].distance.value', null);

    if (distance > 0) {
      this.setState({
        hasDirection: true,
      });
      this.props.resaga.setValue({
        [reduxKey]: distance,
      });
    } else {
      this.setState({
        hasDirection: false,
      });
      this.props.resaga.setValue({
        [reduxKey]: 0,
      });
    }
  };

  handleField = () => {
    const { formPickup, formDropoff, travelMode } = this.props;
    const pickPlaceId = get(formPickup, 'placeId', null);
    const dropOffPlaceId = get(formDropoff, 'placeId', null);

    if (!pickPlaceId || !dropOffPlaceId) {
      return null;
    }

    if (pickPlaceId === dropOffPlaceId) {
      return null;
    }

    return (
      <GridContainer>
        <GridItem xs={12}>
          <Directions
            googleMapURL={this.getGoogleMapsURL()}
            loadingElement={
              <div style={{ height: this.getContainerHeight() }} />
            }
            containerElement={
              <div style={{ height: this.getContainerHeight() }} />
            }
            mapElement={<div style={{ height: this.getContainerHeight() }} />}
            to={formDropoff}
            from={formPickup}
            onFetchDrectionSuccess={this.handleDirectionChange('distance')}
            travelMode={travelMode}
          />
        </GridItem>
      </GridContainer>
    );
  };

  handleEditable = () => {
    const { eventPickup, eventDropoff, travelMode, setter } = this.props;

    const dropoffPlaceId = get(eventDropoff, 'placeId', null);
    const pickupPlaceId = get(eventPickup, 'placeId', null);

    if (!dropoffPlaceId || !pickupPlaceId) {
      return null;
    }

    if (dropoffPlaceId === pickupPlaceId) {
      return null;
    }

    return (
      <React.Fragment>
        <GridItem xs={12}>
          <Directions
            setter={setter}
            googleMapURL={this.getGoogleMapsURL()}
            loadingElement={
              <div style={{ height: this.getContainerHeight() }} />
            }
            containerElement={
              <div style={{ height: this.getContainerHeight() }} />
            }
            mapElement={<div style={{ height: this.getContainerHeight() }} />}
            to={eventDropoff}
            from={eventPickup}
            onFetchDrectionSuccess={this.handleDirectionChange('eventDistance')}
            travelMode={travelMode}
          />
        </GridItem>
      </React.Fragment>
    );
  };

  render = () => {
    const { variant } = this.props;

    return (
      <ForEachEventVariant
        variant={variant}
        renderField={this.handleField}
        renderDefault={this.handleEditable}
      />
    );
  };
}

Map.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,
  travelMode: PropTypes.string,
  setter: PropTypes.bool,

  // resaga props
  formPickup: PropTypes.object,
  formDropoff: PropTypes.object,
  eventPickup: PropTypes.object,
  eventDropoff: PropTypes.object,
};

Map.defaultProps = {
  variant: '',
  formPickup: {},
  formDropoff: {},
  eventPickup: {},
  eventDropoff: {},
  setter: false,
};

export default compose(resaga(CONFIG))(Map);
