import { SELECTED, SELECTING } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import googleMapLoader from 'react-google-maps-loader';
import { compose } from 'redux';
import resaga from 'resaga';
import CircleMarker from 'smartComponents/Node/components/Marker/components/CircleMarker';
import CalculatedRoute from 'smartComponents/Node/logics/CalculatedRoute';
import Location from 'smartComponents/Node/parts/Location';
import RouteContent from 'smartComponents/Node/types/Route/components/RouteContent';
import { ROUTE_HELPERS } from 'smartComponents/Node/types/Route/helpers';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { STRING_HELPERS } from 'utils/stringAdditions';
import Button from 'viewComponents/Button';
import { CONFIG } from './config';
import styles from './styles';

export class SelectRoute extends PureComponent {
  state = {
    origin: this.props.origin,
    destination: this.props.destination,
    destinationHover: this.props.destination,
    status: LOGIC_HELPERS.ifElse(
      [this.props.origin, this.props.destination],
      SELECTED,
      SELECTING,
    ),
  };

  resetSelect = () => {
    this.setState({
      origin: undefined,
      destination: undefined,
      destinationHover: undefined,
      status: SELECTING,
    });
  };

  routeSelected = props => {
    const { origin, destination } = props;

    const selectedRouteId = `${origin}_${destination}`;

    this.setState({
      status: SELECTED,
      selectedRouteId,
      ...props,
    });
  };

  routeSelecting = () => {
    const { origin, destination } = this.state;

    this.setState({
      status: SELECTING,
      currentOrigin: origin,
      currentDestination: destination,
    });
  };

  finishEditStops = () => {
    this.setState({
      status: SELECTED,
    });
  };

  cancelEditStops = () => {
    const { currentOrigin, currentDestination } = this.state;

    this.setState({
      status: SELECTED,
      origin: currentOrigin,
      destination: currentDestination,
      currentOrigin: null,
      currentDestination: null,
    });
  };

  handleClick = (id, index) => () => {
    const { ids } = this.props;
    const { origin, destination } = this.state;

    // nothing select yet
    if (!origin) {
      return this.setState({ origin: id, destinationHover: id });
    }

    // unselect origin
    if (origin === id) {
      return this.resetSelect();
    }

    // unselect destination
    if (destination === id) {
      return this.setState({ destination: undefined });
    }

    const originIndex = ids.indexOf(origin);

    // origin is after clicked item
    if (originIndex > index) {
      return this.routeSelected({
        origin: id,
        destination: origin,
        destinationHover: origin,
      });
    }

    // set destination
    return this.routeSelected({
      origin,
      destination: id,
      destinationHover: id,
    });
  };

  handleMouseEnter = id => () => {
    this.setState({ destinationHover: id });
  };

  isInRange = index => {
    const { ids } = this.props;
    const { origin, destination, destinationHover } = this.state;

    const stop = destination || destinationHover;

    if (!origin || !stop) return false;

    const originIndex = ids.indexOf(origin);
    const destinationIndex = ids.indexOf(stop);

    if (originIndex < destinationIndex) {
      return originIndex <= index && index <= destinationIndex;
    }

    return destinationIndex <= index && index <= originIndex;
  };

  selectedWaypoints = () => {
    const { ids } = this.props;
    const { origin, destination } = this.state;

    const originIndex = ids.indexOf(origin);
    const destinationIndex = ids.indexOf(destination);

    // excluding origin
    return ids.slice(originIndex + 1, destinationIndex);
  };

  routeIds = () => {
    const { ids } = this.props;
    const { origin, destination } = this.state;

    return ROUTE_HELPERS.routeIds({ ids, origin, destination });
  };

  handleRouteFound = result => {
    const { googleMaps, onChange, ids } = this.props;

    const data = ROUTE_HELPERS.normaliseResult(result, { googleMaps, ids });

    this.setState({ distance: data.distance });

    LOGIC_HELPERS.ifFunction(onChange, [data]);
  };

  handleRouteNotFound = (...params) => {
    const { onError } = this.props;

    LOGIC_HELPERS.ifFunction(onError, params);
  };

  renderSubtitle = id => {
    const { classes } = this.props;
    const { origin, destination, destinationHover } = this.state;

    if (origin === id) {
      return <div className={classes.subtitleGrid}>clear selection</div>;
    }

    if (destination === id) {
      return <div className={classes.subtitleGrid}>unset destination</div>;
    }

    if (destinationHover === id) {
      return (
        <div className={classes.subtitleGrid}>
          {LOGIC_HELPERS.ifElse(
            origin,
            'set destination',
            'click to set origin',
          )}
        </div>
      );
    }

    return null;
  };

  renderItem = (id, index) => {
    const { classes, ids } = this.props;
    const { origin, destination, destinationHover, status } = this.state;

    const isInRange = this.isInRange(index);
    const itemIndex = ids.indexOf(id);
    const originIndex = ids.indexOf(origin);
    const destinationIndex = ids.indexOf(destination || destinationHover);
    const selecting = status === SELECTING;
    const borderClassName = LOGIC_HELPERS.ifElse(
      originIndex < destinationIndex,
      classes.borderTop,
      classes.borderBottom,
    );

    return (
      <GridItem
        key={id}
        className={classnames(
          classes.item,
          LOGIC_HELPERS.ifElse(isInRange, classes.inRange, classes.hover),
          LOGIC_HELPERS.ifElse(!isInRange, classes.itemPadding),
          LOGIC_HELPERS.ifElse(origin === id, classes.origin),
          LOGIC_HELPERS.ifElse(destination === id, classes.destination),
          LOGIC_HELPERS.ifElse(
            [origin, !destination, destinationHover === id],
            classes.destination,
          ),
          LOGIC_HELPERS.ifElse(origin === id, borderClassName),
          LOGIC_HELPERS.ifElse(
            (destination || destinationHover) === id,
            borderClassName,
          ),
        )}
        onClick={LOGIC_HELPERS.ifElse(
          selecting,
          this.handleClick(id, index),
          undefined,
          true,
        )}
        onMouseEnter={LOGIC_HELPERS.ifElse(
          selecting,
          this.handleMouseEnter(id, index),
        )}
      >
        <GridContainer alignItems="center" wrap="nowrap">
          <GridItem>
            <CircleMarker
              index={itemIndex}
              origin={origin === id}
              destination={
                origin !== id && (destination || destinationHover) === id
              }
              line={isInRange}
              size="sm"
            />
          </GridItem>

          <GridItem className={classes.grow}>
            <Location
              id={id}
              showTooltip={false}
              showIcon={false}
              link={false}
            />
          </GridItem>
          {this.renderSubtitle(id)}
        </GridContainer>
      </GridItem>
    );
  };

  renderSelectedItem = id => {
    const { classes } = this.props;
    const { origin, destination } = this.state;

    return (
      <GridItem key={id} className={classnames(classes.item)}>
        <GridContainer alignItems="center">
          <GridItem>
            <CircleMarker
              origin={origin === id}
              destination={destination === id}
              line={false}
              size="sm"
            />
          </GridItem>
          <GridItem>
            <Location
              id={id}
              showTooltip={false}
              showIcon={false}
              link={false}
            />
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderWaypoint = () => {
    const { classes } = this.props;
    const ids = this.selectedWaypoints();

    if (!ids.length) return null;

    return (
      <GridItem className={classnames(classes.item)}>
        <GridContainer alignItems="center">
          <GridItem>
            <CircleMarker size="sm" line />
          </GridItem>
          <GridItem className={classes.location}>
            {ids.length} {STRING_HELPERS.pluralise('stop', ids.length)}
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderSelecting = () => {
    const { classes, ids } = this.props;
    const {
      origin,
      destination,
      currentOrigin,
      currentDestination,
    } = this.state;

    return (
      <>
        <GridItem className={classes.heading}>
          <GridContainer alignItems="center">
            <GridItem xs>Select Route</GridItem>
            <GridItem>
              <GridContainer alignItems="center" spacing={0}>
                {currentOrigin &&
                  currentDestination &&
                  (currentOrigin !== origin ||
                    currentDestination !== destination) && (
                    <GridItem>
                      <Button
                        size="xs"
                        color="gray"
                        onClick={this.cancelEditStops}
                        className={classes.seeDetailButton}
                      >
                        Cancel
                      </Button>
                    </GridItem>
                  )}
                <GridItem>
                  <Button
                    size="xs"
                    color="gray"
                    onClick={this.finishEditStops}
                    className={classes.seeDetailButton}
                    disabled={!(origin && destination)}
                  >
                    Finished
                  </Button>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
        {ids.map(this.renderItem)}
      </>
    );
  };

  renderSelected = () => {
    const { classes, id, ids, parentId } = this.props;
    const { origin, destination, distance, selectedRouteId } = this.state;

    return (
      <>
        <CalculatedRoute
          id={id || selectedRouteId}
          parentId={parentId}
          origin={origin}
          destination={destination}
          onSuccess={this.handleRouteFound}
          onError={this.handleRouteNotFound}
        />
        <GridItem className={classes.heading}>
          <GridContainer alignItems="center">
            <GridItem className={classes.grow}>Details</GridItem>
            <GridItem>
              <Button
                size="xs"
                color="gray"
                onClick={this.routeSelecting}
                className={classes.seeDetailButton}
              >
                Edit Route
              </Button>
            </GridItem>
          </GridContainer>
        </GridItem>
        {this.renderSelectedItem(origin)}
        {this.renderWaypoint()}
        {this.renderSelectedItem(destination)}
        <GridItem className={classnames(classes.item, classes.footer)}>
          <RouteContent
            originIndex={ids.indexOf(origin)}
            destinationIndex={ids.indexOf(destination)}
            distance={distance}
          />
        </GridItem>
      </>
    );
  };

  render = () => {
    const { classes } = this.props;
    const { status } = this.state;

    return (
      <GridContainer
        card
        dense
        className={classes.root}
        direction="column"
        spacing={0}
      >
        {status === SELECTING ? this.renderSelecting() : this.renderSelected()}
      </GridContainer>
    );
  };
}

SelectRoute.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  // resaga: PropTypes.object.isRequired,
  googleMaps: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number, // route id, use when editing a route
  parentId: PropTypes.number, // parentId
  ids: PropTypes.array,
  onChange: PropTypes.func,
  onError: PropTypes.func,
  origin: PropTypes.number,
  destination: PropTypes.number,

  // resaga props
};

SelectRoute.defaultProps = {
  ids: [],
};

const WrappedSelectRoute = googleMapLoader(SelectRoute, {
  libraries: ['places'],
  key: process.env.GOOGLE_MAPS_API_KEY,
});

export default compose(
  withStyles(styles, { name: 'SelectRoute' }),
  resaga(CONFIG),
)(WrappedSelectRoute);
