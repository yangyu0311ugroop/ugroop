import { URL_HELPERS } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Hr from 'components/Hr';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import Queue from 'js-queue';
import first from 'lodash/first';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import withFindDetail from 'smartComponents/Google/hoc/withFindDetail';
import withPlacesAutocomplete from 'smartComponents/Google/hoc/withPlacesAutocomplete';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { ROUTE_HELPERS } from 'smartComponents/Node/types/Route/helpers';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import DirectionsMap from '../DirectionsMap';
import { CONFIG } from './config';
import styles from './styles';

export class FlightMap extends PureComponent {
  state = {
    fetchedPlaceData: {},
  };

  componentWillMount = () => {
    this.queue = new Queue();
    this.queue.autoRun = false;
  };

  componentDidMount = () => {
    const { event } = this.props;

    this.enqueue(this.findPlace(EVENT_VIEW_HELPERS.airportStart(event)));
    this.enqueue(this.findPlace(EVENT_VIEW_HELPERS.airportEnd(event)));
  };

  componentWillUnmount = () => {
    this.queue.clear();
  };

  enqueue = func => {
    if (typeof func !== 'function') return null;

    this.queue.add(func);
    return this.queue.next();
  };

  next = () => {
    this.queue.stop = false;
    if (this.queue.contents.length) {
      this.queue.next();
    }
  };

  findPlace = input => () => {
    const { findPlaces } = this.props;

    this.queue.stop = true;

    return findPlaces({ input }, this.findPlaceCb(input));
  };

  findPlaceCb = input => (results, status) => {
    if (status === 'OK') {
      const placeId = get(first(results), 'place_id');
      this.enqueue(this.findDetail(placeId, input));
    }

    setTimeout(this.next, 200);
  };

  findDetail = (placeId, input) => () => {
    const { findDetail } = this.props;

    return findDetail({ placeId }, this.findDetailCb(input));
  };

  findDetailCb = input => (place, status) => {
    const geocode = ROUTE_HELPERS.normalisePlaceGeocode(place);

    if (!geocode || status !== 'OK') {
      return this.next();
    }

    return this.setState(
      ({ fetchedPlaceData }) => ({
        fetchedPlaceData: {
          ...fetchedPlaceData,
          [input]: geocode,
        },
      }),
      this.next,
    );
  };

  render = () => {
    const { classes, event, renderEmpty, mapOnly } = this.props;
    const { fetchedPlaceData } = this.state;

    const locationStart = EVENT_VIEW_HELPERS.airportStart(event);
    const locationEnd = EVENT_VIEW_HELPERS.airportEnd(event);

    const start = fetchedPlaceData[locationStart];
    const end = fetchedPlaceData[locationEnd];

    if (!start || !end) return LOGIC_HELPERS.ifFunction(renderEmpty);

    const distance = ROUTE_HELPERS.haversineDistance(start, end);
    const locationHref = EVENT_VIEW_HELPERS.locationHref(event);

    const renderMap = (
      <GridItem>
        <DirectionsMap start={start} end={end} mapOnly={mapOnly} />
      </GridItem>
    );

    if (mapOnly) return renderMap;

    return (
      <GridItem>
        <GridContainer card dense direction="column" spacing={0}>
          {renderMap}
          <GridItem>
            <GridContainer direction="column" padding>
              <GridItem>
                <GridContainer alignItems="baseline" wrap="nowrap">
                  <GridItem className={classes.leftIcon}>
                    <JText gray>A</JText>
                  </GridItem>
                  <GridItem xs>
                    <JText lg black nowrap={false}>
                      {locationStart}
                      {'  '}
                      <JText
                        noUnderlined
                        component="a"
                        href={URL_HELPERS.googlePlace(locationStart)}
                        target="_blank"
                        title="View on Google Maps"
                      >
                        <Icon icon="lnr-map2" size="small" paddingLeft />
                      </JText>
                    </JText>
                  </GridItem>
                </GridContainer>
              </GridItem>

              {distance && (
                <GridItem>
                  <JText sm gray>
                    <GridContainer alignItems="center" wrap="nowrap">
                      <GridItem className={classes.leftIcon} />
                      <GridItem>Approx {Math.round(distance)} km</GridItem>
                    </GridContainer>
                  </JText>
                </GridItem>
              )}

              <GridItem>
                <GridContainer alignItems="baseline" wrap="nowrap">
                  <GridItem className={classes.leftIcon}>
                    <JText gray>B</JText>
                  </GridItem>
                  <GridItem xs>
                    <JText lg black nowrap={false}>
                      {locationEnd}
                      {'  '}
                      <JText
                        noUnderlined
                        component="a"
                        href={URL_HELPERS.googlePlace(locationEnd)}
                        target="_blank"
                        title="View on Google Maps"
                      >
                        <Icon icon="lnr-map2" size="small" paddingLeft />
                      </JText>
                    </JText>
                  </GridItem>
                </GridContainer>
              </GridItem>

              {LOGIC_HELPERS.ifElse(
                locationHref,
                <>
                  <Hr half />

                  <GridItem>
                    <JText
                      link
                      noUnderlined
                      component="a"
                      href={locationHref}
                      target="_blank"
                      title="View directions on Google Maps"
                    >
                      View directions on Google Maps
                    </JText>
                  </GridItem>
                </>,
              )}
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };
}

FlightMap.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  findPlaces: PropTypes.func.isRequired,
  findDetail: PropTypes.func.isRequired,

  // parent props
  event: PropTypes.object.isRequired,
  renderEmpty: PropTypes.func,
  mapOnly: PropTypes.bool,

  // resaga props
};

FlightMap.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'FlightMap' }),
  withPlacesAutocomplete,
  withFindDetail,
  resaga(CONFIG),
)(FlightMap);
