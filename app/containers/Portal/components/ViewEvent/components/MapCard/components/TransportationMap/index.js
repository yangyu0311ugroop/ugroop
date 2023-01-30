import { THE_BIG_DOT, URL_HELPERS } from 'appConstants';
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
import { GOOGLE_API_HELPERS } from 'smartComponents/Google/components/GoogleMap/helpers';
import withFindRoute from 'smartComponents/Google/hoc/withFindRoute';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export class TransportationMap extends PureComponent {
  state = {};

  componentDidMount = () => {
    const { event } = this.props;

    this.findDirections(
      EVENT_VIEW_HELPERS.placeIdStart(event),
      EVENT_VIEW_HELPERS.placeIdEnd(event),
      EVENT_VIEW_HELPERS.travelMode(event),
    );
  };

  findDirections = (placeIdStart, placeIdEnd, travelMode) => {
    const { findRoute } = this.props;

    if (!placeIdStart || !placeIdEnd) return null;

    return findRoute(
      {
        origin: { placeId: placeIdStart },
        destination: { placeId: placeIdEnd },
        travelMode,
      },
      this.findDirectionsCb,
    );
  };

  findDirectionsCb = (direction, status) => {
    if (status !== 'OK') {
      // TODO: what if can't find direction? fetch 2 places manually then draw polyline
      return null;
    }

    const { legs } = GOOGLE_API_HELPERS.normaliseData(direction);

    const { distance, duration } = GOOGLE_API_HELPERS.normaliseLegs(legs);

    return this.setState({ distance, duration, direction });
  };

  render = () => {
    const { classes, event, renderEmpty, mapOnly } = this.props;
    const { distance, duration, direction } = this.state;

    const startName = EVENT_VIEW_HELPERS.transportationStartName(event);
    const placeIdStart = EVENT_VIEW_HELPERS.placeIdStart(event);
    const startPlaceName = EVENT_VIEW_HELPERS.transportationStartPlaceName(
      event,
    );
    const endName = EVENT_VIEW_HELPERS.transportationEndName(event);
    const placeIdEnd = EVENT_VIEW_HELPERS.placeIdEnd(event);
    const endPlaceName = EVENT_VIEW_HELPERS.transportationEndPlaceName(event);

    const locationHref = EVENT_VIEW_HELPERS.locationHref(event);

    const renderMap = direction && (
      <GridItem>
        <DirectionsMap direction={direction} mapOnly={mapOnly} />
      </GridItem>
    );

    if (mapOnly) return renderMap || null;

    return (
      <GridItem>
        <GridContainer card dense direction="column" spacing={0}>
          {renderMap}
          <GridItem>
            <GridContainer direction="column" padding>
              {!startName && !endName && LOGIC_HELPERS.ifFunction(renderEmpty)}

              {startName && (
                <GridItem>
                  <GridContainer alignItems="baseline" wrap="nowrap">
                    <GridItem className={classes.leftIcon}>
                      <JText gray>A</JText>
                    </GridItem>
                    <GridItem xs>
                      <GridContainer direction="column" spacing={0}>
                        <GridItem>
                          <JText lg black nowrap={false}>
                            {startPlaceName || startName}
                            {'  '}
                            <JText
                              noUnderlined
                              component="a"
                              href={URL_HELPERS.googlePlace(
                                startName,
                                placeIdStart,
                              )}
                              target="_blank"
                              title="View on Google Maps"
                            >
                              <Icon icon="lnr-map2" size="small" paddingLeft />
                            </JText>
                          </JText>
                        </GridItem>
                        {LOGIC_HELPERS.ifElse(
                          [startPlaceName, startName],
                          <GridItem>
                            <JText gray nowrap={false}>
                              {startName}
                            </JText>
                          </GridItem>,
                        )}
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                </GridItem>
              )}

              {distance && (
                <GridItem>
                  <JText sm gray>
                    <GridContainer alignItems="center" wrap="nowrap">
                      <GridItem className={classes.leftIcon} />
                      <GridItem>{distance}</GridItem>
                      {duration && (
                        <>
                          <GridItem>{THE_BIG_DOT}</GridItem>
                          <GridItem>ETA {duration}</GridItem>
                        </>
                      )}
                    </GridContainer>
                  </JText>
                </GridItem>
              )}

              {endName && (
                <GridItem>
                  <GridContainer alignItems="baseline" wrap="nowrap">
                    <GridItem className={classes.leftIcon}>
                      <JText gray>B</JText>
                    </GridItem>
                    <GridItem xs>
                      <GridContainer direction="column" spacing={0}>
                        <GridItem>
                          <JText lg black nowrap={false}>
                            {endPlaceName || endName}{' '}
                            <JText
                              noUnderlined
                              component="a"
                              href={URL_HELPERS.googlePlace(
                                endName,
                                placeIdEnd,
                              )}
                              target="_blank"
                              title="View on Google Maps"
                            >
                              <Icon icon="lnr-map2" size="small" paddingLeft />
                            </JText>
                          </JText>
                        </GridItem>
                        {LOGIC_HELPERS.ifElse(
                          [endPlaceName, endName],
                          <GridItem>
                            <JText gray nowrap={false}>
                              {endName}
                            </JText>
                          </GridItem>,
                        )}
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                </GridItem>
              )}

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

TransportationMap.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  findRoute: PropTypes.func.isRequired,

  // parent props
  event: PropTypes.object,
  renderEmpty: PropTypes.func,
  mapOnly: PropTypes.bool,

  // resaga props
};

TransportationMap.defaultProps = {
  event: {},
};

export default compose(
  withStyles(styles, { name: 'TransportationMap' }),
  withFindRoute,
  resaga(CONFIG),
)(TransportationMap);
