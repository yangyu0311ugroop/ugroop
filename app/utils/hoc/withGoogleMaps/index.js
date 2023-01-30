import React from 'react';
import PropTypes from 'prop-types';
import googleMapLoader from 'react-google-maps-loader';

export class GoogleMaps extends React.PureComponent {
  static propTypes = {
    // HOC
    googleMaps: PropTypes.object.isRequired,

    // parent
    placeId: PropTypes.string,
    children: PropTypes.func.isRequired,
  };

  static defaultProps = {
    placeId: undefined,
  };

  state = {
    loading: false,
    name: '',
    url: '',
  };

  componentDidMount = () => {
    // first load
    if (this.props.placeId) {
      this.fetchPlaceDetail(this.props.placeId);
    }
  };

  componentWillReceiveProps = nextProps => {
    // placeId changed
    if (!nextProps.placeId) {
      this.setState({ name: '', url: '' });
    } else if (nextProps.placeId !== this.props.placeId) {
      this.fetchPlaceDetail(nextProps.placeId);
    }
  };

  initService = () => {
    const { googleMaps } = this.props;

    this.service = new googleMaps.places.PlacesService(
      document.createElement('div'),
    );
  };

  fetchPlaceDetail = placeId => {
    this.setState({ loading: true });

    if (!this.service) this.initService();

    // call Google Places API
    // this one returns a Google-style callback (place, status) on success
    // not sure how to make it through resaga
    this.service.getDetails({ placeId }, this.fetchDetailSuccess);
  };

  fetchDetailSuccess = (place, status) => {
    const { googleMaps } = this.props;

    this.setState({ loading: false });

    if (status === googleMaps.places.PlacesServiceStatus.OK) {
      const { name, url } = place;
      this.setState({
        name,
        url,
      });
    }
  };

  render = () => {
    const prop = { ...this.state };
    return this.props.children(prop);
  };
}

GoogleMaps.displayName = 'GoogleMaps';

export default googleMapLoader(GoogleMaps, {
  libraries: ['places'],
  key: process.env.GOOGLE_MAPS_API_KEY,
});
