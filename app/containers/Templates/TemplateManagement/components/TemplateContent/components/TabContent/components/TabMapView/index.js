import { GOOGLE_MAPS_URL } from 'appConstants';
import H5 from 'components/H5';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Map from './components/Map';
import { CONFIG, DAY_ID_CONFIG, PLACE_ID_CONFIG } from './config';
import styles from './styles';

export class TabMapView extends React.PureComponent {
  getMapURL = () => GOOGLE_MAPS_URL;

  getLocationsWithoutGeocode = locations => {
    const { geocodes } = this.props;
    return locations.reduce((acc, [placeId, location]) => {
      if (!geocodes.find(({ placeId: pId }) => placeId === pId))
        return [...acc, { placeId, location }];
      return acc;
    }, []);
  };

  getConsecutiveLocations = (res, value, index, arr) => {
    if (arr.length === 1) {
      res.push([value]);
      return res;
    }

    if (arr.length - 1 > index) {
      res.push([value, arr[index + 1]]);
    }

    return res;
  };

  renderLoadingElement = () => {
    const { classes } = this.props;
    return <div className={classes.loadingElement} />;
  };

  renderContainerElement = () => {
    const { classes } = this.props;
    return <div className={classes.containerElement} />;
  };

  renderMapElement = () => {
    const { classes } = this.props;
    return <div className={classes.mapElement} />;
  };

  renderNoContent = () => (
    <div>
      <H5>No Location Available</H5>
    </div>
  );

  render = () => {
    const { locations } = this.props;
    const locationsObj = this.getLocationsWithoutGeocode(locations);
    const consecutiveLocations = locationsObj.reduce(
      this.getConsecutiveLocations,
      [],
    );

    if (!locations.length) return this.renderNoContent();

    return (
      <div style={{ height: '480px', width: '100%' }}>
        <Map
          loadingElement={this.renderLoadingElement()}
          containerElement={this.renderContainerElement()}
          mapElement={this.renderMapElement()}
          googleMapURL={this.getMapURL()}
          placeIds={consecutiveLocations}
        />
      </div>
    );
  };
}

TabMapView.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  templateId: PropTypes.number, // eslint-disable-line
  tabId: PropTypes.number, // eslint-disable-line

  // resaga value
  locations: PropTypes.array,
  geocodes: PropTypes.array,
};

TabMapView.defaultProps = {
  locations: [],
  geocodes: [],
};

export default compose(
  withStyles(styles, { name: 'TabMapView' }),
  resaga(DAY_ID_CONFIG),
  resaga(PLACE_ID_CONFIG),
  resaga(CONFIG),
)(TabMapView);
