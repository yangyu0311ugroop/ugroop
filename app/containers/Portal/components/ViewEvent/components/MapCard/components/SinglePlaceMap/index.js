import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Hr from 'components/Hr';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import DirectionsMap from 'containers/Portal/components/ViewEvent/components/MapCard/components/DirectionsMap';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import withFindDetail from 'smartComponents/Google/hoc/withFindDetail';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { ROUTE_HELPERS } from 'smartComponents/Node/types/Route/helpers';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export class SinglePlaceMap extends PureComponent {
  state = {};

  componentDidMount = () => {
    const { event } = this.props;

    this.findDetail(EVENT_VIEW_HELPERS.placeId(event));
  };

  findDetail = placeId => {
    const { findDetail } = this.props;

    if (!placeId) return null;

    return findDetail({ placeId }, this.findDetailCb);
  };

  findDetailCb = (place, status) => {
    const geocode = ROUTE_HELPERS.normalisePlaceGeocode(place);
    const viewport = ROUTE_HELPERS.normalisePlaceViewport(place);

    if (!geocode || status !== 'OK') {
      return null;
    }

    return this.setState({ geocode, viewport });
  };

  render = () => {
    const { event, mapOnly } = this.props;
    const { geocode, viewport } = this.state;

    const placeId = EVENT_VIEW_HELPERS.placeId(event);
    const locationName = EVENT_VIEW_HELPERS.locationName(event);
    const locationPlaceName = EVENT_VIEW_HELPERS.locationPlaceName(event);
    const locationHref = EVENT_VIEW_HELPERS.locationHref(event);

    const renderMap = geocode && (
      <GridItem>
        <DirectionsMap
          geocode={geocode}
          viewport={viewport}
          mapOnly={mapOnly}
        />
      </GridItem>
    );

    if (mapOnly) return renderMap || null;

    return (
      <GridItem>
        <GridContainer card dense direction="column" spacing={0}>
          {renderMap}
          {(locationName || locationPlaceName) && (
            <GridItem>
              <GridContainer direction="column" padding spacing={0}>
                {LOGIC_HELPERS.ifElse(
                  locationPlaceName,
                  <GridItem>
                    <JText lg black={locationPlaceName} nowrap={false}>
                      {locationPlaceName}
                    </JText>
                  </GridItem>,
                )}
                {LOGIC_HELPERS.ifElse(
                  locationName,
                  <GridItem>
                    <JText
                      nowrap={false}
                      black={!locationPlaceName}
                      gray={locationPlaceName}
                    >
                      {locationName}
                    </JText>
                  </GridItem>,
                )}

                {LOGIC_HELPERS.ifElse(
                  placeId,
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
                        View place on Google Maps
                      </JText>
                    </GridItem>
                  </>,
                )}
              </GridContainer>
            </GridItem>
          )}
        </GridContainer>
      </GridItem>
    );
  };
}

SinglePlaceMap.propTypes = {
  // hoc props
  // classes: PropTypes.object.isRequired,
  findDetail: PropTypes.func.isRequired,

  // parent props
  event: PropTypes.object,
  mapOnly: PropTypes.bool,

  // resaga props
};

SinglePlaceMap.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'SinglePlaceMap' }),
  withFindDetail,
  resaga(CONFIG),
)(SinglePlaceMap);
