import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { UID_HELPERS } from 'utils/helpers/uid';
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker,
} from 'react-google-maps';
import { GEOCODE_API, GET_LAT_LONG } from 'apis/constants';
import Direction from './components/Direction';
import { CONFIG } from './config';
import styles from './styles';

export class Map extends PureComponent { // eslint-disable-line
  componentDidMount = () => {
    const { placeIds } = this.props;
    if (placeIds[0].length === 1) {
      this.fetchGeocode(placeIds);
    }
  };

  fetchGeocode = placeIds => {
    this.props.resaga.dispatchTo(GEOCODE_API, GET_LAT_LONG, {
      payload: { location: placeIds[0][0].location },
    });
  };

  render = () => {
    const { placeIds } = this.props;

    if (placeIds[0].length === 1) {
      const { singleDayGeocode } = this.props;
      if (!singleDayGeocode.lat || !singleDayGeocode.lng) {
        return null;
      }

      return (
        <GoogleMap
          defaultZoom={8}
          defaultCenter={{
            lat: singleDayGeocode.lat,
            lng: singleDayGeocode.lng,
          }}
        >
          <Marker
            position={{ lat: singleDayGeocode.lat, lng: singleDayGeocode.lng }}
          />
        </GoogleMap>
      );
    }

    return (
      <GoogleMap defaultZoom={7}>
        {placeIds.map(id => {
          if (!id[0].placeId || !id[1].placeId) {
            return null;
          }

          return (
            <div key={UID_HELPERS.generateUID()}>
              <Direction
                key={UID_HELPERS.generateUID()}
                fromPlaceId={id[0].placeId}
                toPlaceId={id[1].placeId}
              />
            </div>
          );
        })}
      </GoogleMap>
    );
  };
}

Map.propTypes = {
  // hoc
  resaga: PropTypes.object,

  // parent
  placeIds: PropTypes.array,

  // resaga
  singleDayGeocode: PropTypes.object,
};

Map.defaultProps = {
  singleDayGeocode: {},
};

export default compose(
  withScriptjs,
  withGoogleMap,
  withStyles(styles, { name: 'Map' }),
  resaga(CONFIG),
)(Map);
