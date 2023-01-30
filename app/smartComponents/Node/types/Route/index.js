import {
  CARD,
  CONTENT,
  DEFAULT,
  MAP_VIEW,
  ROUTE_CARD,
  ROUTE_CONTENT,
  ROUTE_DETAILS,
  SELECT_ROUTE,
} from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import GoogleMap from 'smartComponents/Google/components/GoogleMap';
import Marker from 'smartComponents/Node/components/Marker';
import NodeProp from 'smartComponents/Node/components/NodeProp';
import CalculatedRoute from 'smartComponents/Node/logics/CalculatedRoute';
import { ROUTE_HELPERS } from 'smartComponents/Node/types/Route/helpers';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import upsertHelpers from 'utils/helpers/upsertStore';
import Button from 'viewComponents/Button';
import RouteCard from './components/RouteCard';
import RouteContent from './components/RouteContent';
import RouteDetails from './components/RouteDetails';
import SelectRoute from './components/SelectRoute';
import { CONFIG, PLACE_IDS_CONFIG } from './config';
import styles from './styles';

export class Route extends PureComponent {
  state = { polylines: [], markers: [], summary: '', distance: 0 };

  componentDidUpdate = prevProps => {
    const { clickId, clickZoom } = this.props;

    if (clickId !== prevProps.clickId || clickZoom !== prevProps.clickZoom) {
      this.handleZoom();
    }
  };

  handleZoom = () => {
    const { clickId, markerIds, clickZoom } = this.props;

    if (clickId && markerIds) {
      if (clickZoom) {
        // zoom in
        return this.zoomInNearestLocations();
      }

      // zoom out
      return this.fitBound();
    }

    return false;
  };

  handleClick = () => {
    const { clickId, markerIds, clickZoom } = this.props;

    if (clickId && markerIds && markerIds.indexOf(clickId) === -1) {
      return this.zoomInNearestLocations();
    }

    if (clickId && markerIds && clickZoom) {
      return this.zoomIn();
    }

    return false;
  };

  markerIdsWithClickId = (accu, dayId) => {
    const { clickId, markerIds } = this.props;

    if (dayId === clickId) {
      return accu.concat(dayId);
    }

    if (markerIds.indexOf(dayId) !== -1) {
      return accu.concat(dayId);
    }

    return accu;
  };

  zoomInNearestLocations = () => {
    const { clickId, markerIds, dayIds } = this.props;
    const { maps, markers } = this.state;

    if (markers.length < 2) {
      return null;
    }

    const customBounds = new maps.LatLngBounds();

    const markerIdsWithClickId = dayIds.reduce(this.markerIdsWithClickId, []);

    const clickIndex = markerIdsWithClickId.indexOf(clickId);
    const offset = LOGIC_HELPERS.ifElse(
      markerIds.indexOf(clickId) === -1,
      1,
      0,
    );

    if (clickIndex === 0) {
      this.extendBound(customBounds, markerIdsWithClickId[clickIndex + offset]);
      this.extendBound(
        customBounds,
        markerIdsWithClickId[clickIndex + 1 + offset],
      );
    } else if (clickIndex === markerIdsWithClickId.length - 1) {
      this.extendBound(customBounds, markerIdsWithClickId[clickIndex - offset]);
      this.extendBound(
        customBounds,
        markerIdsWithClickId[clickIndex - 1 - offset],
      );
    } else {
      // previous point
      this.extendBound(customBounds, markerIdsWithClickId[clickIndex - 1]);

      // selected point, if location is set
      if (markerIds.indexOf(clickId) !== -1) {
        this.extendBound(customBounds, clickId);
      }

      // next point
      this.extendBound(customBounds, markerIdsWithClickId[clickIndex + 1]);
    }

    return this.fitBound(customBounds);
  };

  extendBound = (bounds, markerId) => {
    const { markerIds } = this.props;
    const { markers } = this.state;

    const index = markerIds.indexOf(markerId);

    if (!markers[index]) return null;

    const { lat, lng } = markers[index];
    return bounds.extend({ lat, lng });
  };

  zoomIn = () => {
    const { clickId, markerIds } = this.props;
    const { markers } = this.state;

    if (clickId && markerIds) {
      const index = markerIds.indexOf(clickId);
      const marker = markers[index];

      if (marker) {
        this.fitCustomBounds(marker, index);
      }
    }
  };

  padding = () => {
    const { size } = this.props;

    if (size === 'md') {
      return { left: 60, right: 60, top: 60, bottom: 60 };
    }

    return { left: 8, top: 8, bottom: 16, right: 8 };
  };

  fitBound = customBounds => {
    const { bounds, map } = this.state;

    if (!bounds && !customBounds) return null;

    this.setState(
      { boundsChanged: !!customBounds, blockBoundsChanged: true },
      () => {
        map.fitBounds(customBounds || bounds, this.padding());

        setTimeout(() => this.setState({ blockBoundsChanged: false }), 1000);
      },
    );

    return false;
  };

  handleReCentre = () => {
    this.props.resaga.setValue({ clickZoom: false });
    this.fitBound();
  };

  handleRef = ({ map, maps }) => {
    this.setState({ map, maps });

    map.addListener('idle', () => {
      const { mapsReady } = this.state;

      if (!mapsReady) {
        this.setState({ mapsReady: true });
      }
    });

    map.addListener('bounds_changed', () => {
      const { mapsReady, blockBoundsChanged } = this.state;

      if (mapsReady && !blockBoundsChanged) {
        this.setState({ boundsChanged: true });
      }
    });
  };

  fitCustomBounds = (marker, index) => {
    const { maps, markers } = this.state;
    const { lat, lng } = marker;

    const customBounds = new maps.LatLngBounds();
    customBounds.extend({ lat, lng });

    if (index > 0 && index <= markers.length - 1) {
      const prevPoint = markers[index - 1];
      customBounds.extend({
        lat: prevPoint.lat,
        lng: prevPoint.lng,
      });
    }
    if (index >= 0 && index < markers.length - 1) {
      const nextPoint = markers[index + 1];
      customBounds.extend({
        lat: nextPoint.lat,
        lng: nextPoint.lng,
      });
    }

    this.fitBound(customBounds);
  };

  handleSelectRoute = () => {
    const { id, onClick } = this.props;

    LOGIC_HELPERS.ifFunction(onClick, [id]);
  };

  handleSeeRouteDetail = () => {
    const { id, onClick, onShowDetail } = this.props;

    LOGIC_HELPERS.ifFunction(onClick, [id]);
    LOGIC_HELPERS.ifFunction(onShowDetail, [id]);
  };

  handleRouteFound = result => {
    const { dayIds } = this.props;
    const { maps } = this.state;

    if (!maps) return null;

    const data = ROUTE_HELPERS.normaliseResult(result, {
      googleMaps: maps,
      ids: dayIds,
    });
    const { distance, nodes, markerIds, routeIds } = data;

    this.props.resaga.setValue({
      nodes: upsertHelpers.deepMerge(nodes),
      distance,
      markerIds,
      routeIds,
    });

    return this.handleChangeRoute(data);
  };

  handleChangeRoute = ({ polylines, bounds, markers, summary }) => {
    const { map, polylines: currentPolylines } = this.state;

    if (!map || !markers || !markers.length) return null;

    // remove current polylines from map
    ROUTE_HELPERS.polylinesSetMap(currentPolylines, null);

    ROUTE_HELPERS.polylinesSetMap(polylines, map);
    return this.setState(
      { markers, polylines, summary, bounds },
      this.fitBound,
    );
  };

  openChangeRoute = () => {
    const { id, parentId, templateId } = this.props;

    PORTAL_HELPERS.openAddRoute({ id, templateId, parentId }, this.props);
  };

  renderMarker = marker => {
    const { origin, destination, variant, clickZoom } = this.props;
    const { id, lat, lng } = marker;

    if (variant !== MAP_VIEW && origin !== id && destination !== id) {
      return null;
    }

    return (
      <Marker
        key={id}
        id={id}
        lat={lat}
        lng={lng}
        interactive={variant === MAP_VIEW}
        size={LOGIC_HELPERS.ifElse(!clickZoom, 'xs')}
        showDetail
        geocode={variant === MAP_VIEW}
      />
    );
  };

  renderMapView = () => {
    const {
      classes,
      className,
      id,
      parentId,
      simple,
      size,
      originIndex,
      destinationIndex,
    } = this.props;

    const { mapsReady, boundsChanged, markers } = this.state;
    const validRoute = originIndex !== -1 && destinationIndex !== -1;

    return (
      <>
        {mapsReady && validRoute && (
          <CalculatedRoute
            id={id}
            parentId={parentId}
            onSuccess={this.handleRouteFound}
          />
        )}

        {boundsChanged && (
          <Button
            size="xs"
            color="black"
            onClick={this.handleReCentre}
            className={classnames(
              classes.reCentreButton,
              classes[`${size}ReCentre`],
            )}
          >
            <GridContainer alignItems="center">
              <GridItem>
                <Icon icon="lnr-location" size="xsmall" bold />
              </GridItem>
              {size === 'md' && <GridItem>Re-centre</GridItem>}
            </GridContainer>
          </Button>
        )}

        <GoogleMap
          silver={false}
          simple={simple}
          className={classnames(classes.routes, className)}
          onGoogleApiLoaded={this.handleRef}
        >
          {validRoute && markers.map(this.renderMarker)}
        </GoogleMap>

        {!validRoute && (
          <div className={classes.warningDiv}>
            <GridContainer
              alignItems="center"
              justify="center"
              className={classes.warning}
            >
              <GridItem>
                <Icon icon="lnr-warning" size="xsmall" bold />
              </GridItem>
              <GridItem>
                {LOGIC_HELPERS.ifElse(
                  originIndex === -1,
                  'Origin',
                  'Destination',
                )}{' '}
                not found
              </GridItem>
            </GridContainer>
          </div>
        )}
      </>
    );
  };

  renderRouteContent = () => {
    const {
      classes,
      id,
      templateId,
      originIndex,
      destinationIndex,
      active,
      index,
      showIndex,
    } = this.props;
    const { distance, summary } = this.state;

    const error = originIndex === -1 || destinationIndex === -1;

    return (
      <div className={classnames(classes.item, active && classes.itemActive)}>
        <div className={classes.routeContent}>
          <GridContainer wrap="nowrap" onClick={this.handleSelectRoute}>
            {showIndex && (
              <GridItem>
                <div className={classes.index}>{index + 1}</div>
              </GridItem>
            )}
            <GridItem className={classes.grow}>
              <GridContainer direction="column" spacing={0}>
                <GridItem>
                  <GridContainer alignItems="center">
                    <GridItem className={classes.grow}>
                      <NodeProp
                        id={id}
                        valueKey={CONTENT}
                        editable={false}
                        isCustomData={false}
                        showEmpty
                        noContent={`via ${summary}`}
                        ellipsis
                        ellipsisClassName={classnames(classes.ellipsisViewDiv)}
                      />
                    </GridItem>
                    {error && (
                      <GridItem>
                        <Button
                          size="xs"
                          color="gray"
                          className={classes.seeDetailButton}
                          onClick={this.openChangeRoute}
                          title={`${LOGIC_HELPERS.ifElse(
                            originIndex === -1,
                            'Origin',
                            'Destination',
                          )} not found. Click to edit route.`}
                        >
                          <Icon
                            icon="lnr-warning"
                            size="xsmall"
                            color="warning"
                            bold
                          />
                        </Button>
                      </GridItem>
                    )}
                  </GridContainer>
                </GridItem>
                <GridItem>
                  <div className={classes.offsetTop}>
                    <GridContainer direction="column" spacing={0}>
                      {!error && (
                        <GridItem>
                          <RouteContent
                            id={id}
                            templateId={templateId}
                            originIndex={originIndex}
                            destinationIndex={destinationIndex}
                            distance={distance}
                            active={active}
                          />
                        </GridItem>
                      )}

                      {active && (
                        <GridItem>
                          <Button
                            size="xs"
                            color="gray"
                            className={classes.seeDetailButton}
                            onClick={this.handleSelectRoute}
                          >
                            Details
                          </Button>
                        </GridItem>
                      )}
                    </GridContainer>
                  </div>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </div>
        <Button
          size="xs"
          color="gray"
          className={classes.nextButton}
          onClick={this.handleSeeRouteDetail}
        >
          <Icon icon="lnr-chevron-right" size="xsmall" bold />
        </Button>
      </div>
    );
  };

  renderCard = () => {
    const { classes } = this.props;

    return (
      <GridContainer
        direction="column"
        className={classnames(classes.root)}
        spacing={0}
      >
        <GridItem className={classes.relative}>{this.renderMapView()}</GridItem>
        <GridItem>{this.renderRouteContent()}</GridItem>
      </GridContainer>
    );
  };

  renderSelectRoute = () => {
    const { classes, ...props } = this.props;

    return <SelectRoute {...props} />;
  };

  renderRouteDetails = () => {
    const { classes, ...props } = this.props;

    return <RouteDetails {...props} />;
  };

  renderRouteCard = () => {
    const { classes, ...props } = this.props;

    return <RouteCard {...props} />;
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [ROUTE_DETAILS]: this.renderRouteDetails,
      [SELECT_ROUTE]: this.renderSelectRoute,
      [ROUTE_CONTENT]: this.renderRouteContent,
      [MAP_VIEW]: this.renderMapView,
      [CARD]: this.renderCard,
      [ROUTE_CARD]: this.renderRouteCard,
      [DEFAULT]: this.renderRouteContent,
    });
  };
}

Route.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,
  id: PropTypes.number, // route id
  parentId: PropTypes.number, // tab id
  templateId: PropTypes.number, // template id
  index: PropTypes.number,
  clickId: PropTypes.number,
  onClick: PropTypes.func,
  onShowDetail: PropTypes.func,
  simple: PropTypes.bool,
  editable: PropTypes.bool,
  active: PropTypes.bool,

  // resaga props
  selectedId: PropTypes.number,
  content: PropTypes.string,
  origin: PropTypes.number,
  originIndex: PropTypes.number,
  destination: PropTypes.number,
  destinationIndex: PropTypes.number,
  createdBy: PropTypes.number,
  travelMode: PropTypes.string,
  waypoints: PropTypes.array,
  routeIds: PropTypes.array,
  placeIds: PropTypes.array,
  dayIds: PropTypes.array,
  markerIds: PropTypes.array,
  markers: PropTypes.array,

  // custom props
  className: PropTypes.string,
  size: PropTypes.string,
  clickZoom: PropTypes.bool,
  showIndex: PropTypes.bool,
};

Route.defaultProps = {
  travelMode: 'DRIVING',
  originIndex: -1,
  destinationIndex: -1,
  waypoints: [],
  routeIds: [],
  placeIds: [],
  dayIds: [],
  markerIds: [],
  markers: [],
};

export default compose(
  withStyles(styles, { name: 'Route' }),
  resaga(CONFIG),
  resaga(PLACE_IDS_CONFIG),
)(Route);
