import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { DirectionsRenderer } from 'react-google-maps';
import styles from './styles';

export class Direction extends PureComponent {
  state = {
    directions: null,
  };

  componentDidMount = () => {
    const DirectionsService = new window.google.maps.DirectionsService();
    DirectionsService.route(
      {
        origin: { placeId: this.props.fromPlaceId },
        destination: { placeId: this.props.toPlaceId },
        travelMode: window.google.maps.TravelMode.WALKING,
      },
      this.getDirections,
    );
  };

  getDirections = (result, status) => { // eslint-disable-line
    if (status === window.google.maps.DirectionsStatus.OK) {
      this.setState({
        directions: result,
      });
    } else {
      return '';
    }
  };

  render = () => {
    if (!this.state.directions) return null;
    return (
      <DirectionsRenderer
        directions={this.state.directions}
        options={{ markerOptions: { icon: '' } }}
      />
    );
  };
}

Direction.propTypes = {
  // parent props
  fromPlaceId: PropTypes.string,
  toPlaceId: PropTypes.string,
};

export default compose(withStyles(styles, { name: 'Direction' }))(Direction);
