import classNames from 'classnames';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import GoogleMap from 'smartComponents/Google/components/GoogleMap';
import { GOOGLE_API_HELPERS } from 'smartComponents/Google/components/GoogleMap/helpers';
import { ROUTE_HELPERS } from 'smartComponents/Node/types/Route/helpers';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export class DirectionsMap extends PureComponent {
  state = {
    mapKey: Date.now(),
  };

  componentDidMount = () => {
    this.retried = 0;

    this.updateMap();
  };

  updateMap = () => {
    const { mapsReady, maps } = this.state;

    // retry until map ready
    if (!maps || !mapsReady) {
      if (this.retried % 3 === 0) {
        // try remount every 3 seconds
        // in first load GoogleMap won't call on idle callback
        this.setState({
          mapKey: Date.now(),
        });
      }

      if (this.retried < 10) {
        this.retried += 1;

        setTimeout(this.updateMap, 1000);
      }
      return null;
    }

    // maps ready, reset counter
    this.retried = 0;

    return this.handleUpdateMap();
  };

  handleUpdateMap = () => {
    const { start, end, direction, geocode } = this.props;

    if (direction) {
      return this.handleUpdateDirections();
    }

    if (start && end) {
      return this.handleUpdateMarkers();
    }

    if (geocode) {
      return this.handleUpdateSinglePlace();
    }

    return null;
  };

  handleUpdateSinglePlace = () => {
    const { geocode, viewport } = this.props;

    this.addMarker('geoStart', geocode);

    if (viewport) this.mapFitBounds(viewport);
  };

  handleUpdateMarkers = () => {
    const { start, end } = this.props;
    const { maps } = this.state;

    this.addMarker('geoStart', start);
    this.addMarker('geoEnd', end);

    const path = [start, end];
    ROUTE_HELPERS.generatePolylines(path, this.state);

    const customBounds = new maps.LatLngBounds();

    customBounds.extend(start);
    customBounds.extend(end);

    this.mapFitBounds(customBounds);
  };

  handleUpdateDirections = () => {
    const { direction } = this.props;
    const { map, maps } = this.state;

    const { bounds, legs } = GOOGLE_API_HELPERS.normaliseData(direction);

    const polylines = ROUTE_HELPERS.normalisePolylines(direction, {
      googleMaps: maps,
    });

    const { startMarker, endMarker } = GOOGLE_API_HELPERS.normaliseLegs(legs);

    this.addMarker('geoStart', startMarker);
    this.addMarker('geoEnd', endMarker);

    ROUTE_HELPERS.polylinesSetMap(polylines, map);

    this.mapFitBounds(bounds);
  };

  addMarker = (key, geocode) => {
    const { map, maps } = this.state;

    if (!maps) return null;

    // add new marker
    return new maps.Marker({
      clickable: false,
      position: geocode,
      label: LOGIC_HELPERS.ifElse(key === 'geoStart', 'A', 'B'),
      map,
    });
  };

  mapFitBounds = bounds => {
    const { map, blockBoundsChanged } = this.state;

    if (!map || !bounds || blockBoundsChanged) return null;

    return this.setState({ blockBoundsChanged: true }, () => {
      if (bounds.toJSON) {
        map.fitBounds(bounds.toJSON());
      } else {
        map.fitBounds(bounds);
      }

      setTimeout(() => this.setState({ blockBoundsChanged: false }), 1000);
    });
  };

  handleRef = ({ map, maps }) => {
    this.setState({ map, maps });

    map.addListener('idle', () => {
      const { mapsReady } = this.state;

      if (!mapsReady) {
        this.setState({ mapsReady: true });
      }
    });
  };

  render = () => {
    const { classes, mapOnly } = this.props;
    const { mapKey } = this.state;

    return (
      <GoogleMap
        key={mapKey}
        className={classNames(
          classes.map,
          LOGIC_HELPERS.ifElse(mapOnly, classes.mapOnly),
        )}
        onGoogleApiLoaded={this.handleRef}
      />
    );
  };
}

DirectionsMap.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  start: PropTypes.object,
  end: PropTypes.object,
  direction: PropTypes.object,
  geocode: PropTypes.object,
  viewport: PropTypes.object,
  mapOnly: PropTypes.bool,

  // resaga props
};

DirectionsMap.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'DirectionsMap' }),
  resaga(CONFIG),
)(DirectionsMap);
