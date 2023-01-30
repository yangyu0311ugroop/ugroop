import { withStyles } from '@material-ui/core/styles';
import { GOOGLE_TRAVEL_MODES } from 'appConstants';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import {
  DirectionsRenderer,
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import get from 'lodash/get';

import { CONFIG } from './config';
import styles from './styles';

export class Directions extends PureComponent {
  state = {
    directions: null,
  };

  componentDidMount = () => {
    this.fetchDirections();
  };

  componentDidUpdate = prevProps => {
    const { from: currFrom, to: currTo } = this.props;
    const { from: prevFrom, to: prevTo } = prevProps;

    const currFromPlaceId = get(currFrom, 'placeId', 0);
    const currToPlaceId = get(currTo, 'placeId', 0);

    const prevFromPlaceId = get(prevFrom, 'placeId', 0);
    const prevToPlaceId = get(prevTo, 'placeId', 0);

    if (
      currFromPlaceId !== prevFromPlaceId ||
      currToPlaceId !== prevToPlaceId
    ) {
      this.fetchDirections();
    }
  };

  getTravelMode = () => {
    const { travelMode } = this.props;

    switch (travelMode) {
      case GOOGLE_TRAVEL_MODES.CYCLING:
        return window.google.maps.TravelMode.BICYCLING;

      default:
        return window.google.maps.TravelMode.DRIVING;
    }
  };

  getDirections = (result, status) => {
    // eslint-disable-line
    const { onFetchDrectionSuccess } = this.props;
    if (status === window.google.maps.DirectionsStatus.OK) {
      this.setState({
        directions: result,
      });
    }
    LOGIC_HELPERS.ifFunction(onFetchDrectionSuccess, [result]);
  };

  fetchDirections = () => {
    if (this.props.from && this.props.to) {
      const travelMode = this.getTravelMode();
      const DirectionsService = new window.google.maps.DirectionsService();
      DirectionsService.route(
        {
          origin: { placeId: this.props.from.placeId },
          destination: { placeId: this.props.to.placeId },
          travelMode,
        },
        this.getDirections,
      );
    }
  };

  render = () => {
    const { setter } = this.props;
    if (this.state.directions === null) return null;
    if (setter) return null;
    return (
      <DirectionsRenderer
        directions={this.state.directions}
        options={{ markerOptions: { icon: '' } }}
      />
    );
  };
}

Directions.propTypes = {
  // hoc props

  // parent props
  from: PropTypes.object,
  to: PropTypes.object,
  onFetchDrectionSuccess: PropTypes.func,
  travelMode: PropTypes.string,
  setter: PropTypes.bool,

  // resaga props
};

Directions.defaultProps = {
  to: null,
  from: null,
  setter: false,
};

export default compose(
  withScriptjs,
  withGoogleMap,
  withStyles(styles, { name: 'Directions' }),
  resaga(CONFIG),
)(Directions);
