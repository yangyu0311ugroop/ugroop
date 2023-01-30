import { withStyles } from '@material-ui/core';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { H5 } from 'viewComponents/Typography';
import { CREATE_NODE, NODE_API } from 'apis/constants';
import { NOT_FOUND, TEXT } from 'appConstants';
import classnames from 'classnames';
import Dialog from 'components/Dialog';
import UGDialogContent from 'components/Dialog/UGDialogContent';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import Formsy from 'formsy-react';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import GoogleMap from 'smartComponents/Google/components/GoogleMap';
import Marker from 'smartComponents/Node/components/Marker';
import Location from 'smartComponents/Node/parts/Location';
import SelectRoute from 'smartComponents/Node/types/Route/components/SelectRoute';
import { ROUTE_HELPERS } from 'smartComponents/Node/types/Route/helpers';
import Icon from 'ugcomponents/Icon';
import SimpleRTE from 'ugcomponents/Inputs/SimpleRTE';
import ValidationTextField from 'ugcomponents/Inputs/ValidationTextField';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { ROUTE } from 'utils/modelConstants';
import Button from 'viewComponents/Button';
import { CONFIG, DAY_IDS_CONFIG } from './config';
import styles from './styles';

export class AddRoute extends PureComponent {
  state = {
    origin: this.props.origin,
    destination: this.props.destination,
    markers: [],
    polylines: [],
    routeFound: false,
    routeNotFound: false,
  };

  componentWillMount = () => {
    const { classes } = this.props;

    this.PaperProps = {
      classes: { root: classes.paperRoot },
    };
  };

  componentDidMount = () => {
    const { ids, origin, destination } = this.props;

    if (ids.indexOf(origin) !== -1) {
      this.setState({ origin });

      if (ids.indexOf(destination) !== -1) {
        this.setState({ destination });
      }
    } else if (ids.indexOf(destination) !== -1) {
      this.setState({ origin: destination });
    }
  };

  changeRouteData = () => {
    const { ids, origin, destination } = this.props;

    return ROUTE_HELPERS.normaliseStops({ ids, origin, destination });
  };

  handleCloseDialog = () => PORTAL_HELPERS.close(this.props);

  confirmCancel = () => {
    const { origin, destination } = this.state;

    if (!origin && !destination) {
      return this.handleCloseDialog();
    }

    return PORTAL_HELPERS.confirmCancelAddRoute(
      {
        onConfirm: this.handleCloseDialog,
      },
      this.props,
    );
  };

  handleValidSubmit = ({ content, description, travelMode }) => {
    const { id, parentId } = this.props;
    const { origin, destination } = this.state;

    const node = {
      content,
      parentNodeId: parentId,
      customData: {
        description,
        origin,
        destination,
        travelMode,
      },
      type: ROUTE,
    };

    if (id) {
      return NODE_API_HELPERS.updateNode(
        {
          nodeId: id,
          node,
          onSuccess: this.handleCloseDialog,
          onError: this.handleCloseDialog,
        },
        this.props,
      );
    }

    return this.props.resaga.dispatchTo(NODE_API, CREATE_NODE, {
      payload: {
        node,
        keyPath: `${parentId}.routes`,
      },
      onSuccess: this.handleCloseDialog,
    });
  };

  handleRouteNotFound = ({ origin, destination }, status) => {
    this.setState({
      routeFound: false,
      routeNotFound: status,
      origin,
      destination,
    });
  };

  handleRef = ({ map }) => {
    this.setState({ map });

    map.addListener('idle', () => {
      const { mapsReady } = this.state;

      if (!mapsReady) {
        this.setState({ mapsReady: true });
      }
    });
    map.addListener('bounds_changed', () => {
      const { mapsReady } = this.state;

      if (!mapsReady) {
        this.setState({ mapsReady: true });
      }
    });
  };

  fitBounds = bounds => {
    const { map, bounds: stateBounds } = this.state;

    if (!map) return null;

    return map.fitBounds(bounds || stateBounds, {
      left: 432,
      top: 16,
      bottom: 80,
      right: 16,
    });
  };

  handleChangeRoute = ({
    polylines,
    bounds,
    markers,
    summary,
    origin,
    destination,
  }) => {
    const { map, polylines: currentPolylines } = this.state;

    // remove current polylines from map
    ROUTE_HELPERS.polylinesSetMap(currentPolylines, null);

    this.fitBounds(bounds);
    ROUTE_HELPERS.polylinesSetMap(polylines, map);
    this.setState({
      markers,
      polylines,
      summary,
      origin,
      destination,
      routeFound: true,
      routeNotFound: false,
    });
  };

  renderSaveCancelButton = () => {
    const { id } = this.props;
    const { routeFound } = this.state;

    return (
      <GridContainer alignItems="center" justify="flex-end">
        <GridItem>
          <Button size="xs" color="gray" onClick={this.confirmCancel}>
            Discard
          </Button>
        </GridItem>
        <GridItem>
          <Button
            color="primary"
            size="xs"
            type="submit"
            disabled={!routeFound}
          >
            {LOGIC_HELPERS.ifElse(id, 'Save Route', 'Add route')}
          </Button>
        </GridItem>
      </GridContainer>
    );
  };

  routeIds = () => {
    const { ids, origin, destination } = this.props;

    const originIndex = ids.indexOf(origin);
    const destinationIndex = ids.indexOf(destination);

    return ids.slice(originIndex, destinationIndex + 1);
  };

  renderMarker = ({ id, lat, lng }) => {
    const { ids } = this.props;
    const { origin, destination } = this.state;

    return (
      <Marker
        key={id}
        id={id}
        index={ids.indexOf(id)}
        lat={lat}
        lng={lng}
        origin={origin === id}
        destination={destination === id}
        interactive
        showDetail
        geocode
      />
    );
  };

  renderRouteNotFound = () => {
    const { origin, destination, routeNotFound } = this.state;

    if (routeNotFound === NOT_FOUND) {
      return (
        <GridContainer card direction="column">
          <GridItem>
            <i>
              At least one of the locations specified in the route
              {"'"}s origin, destination, or waypoints could not be geocoded. It
              could be an issue from Google APIs server. Please try it again
              later, or select another route.
            </i>
          </GridItem>
        </GridContainer>
      );
    }

    return (
      <GridContainer card direction="column">
        <GridItem>
          <i>
            Sorry, we cannot find a way from {`"`}
            <Location id={origin} variant={TEXT} />
            {`"`} to {`"`}
            <Location id={destination} variant={TEXT} />
            {`"`}
          </i>
        </GridItem>
      </GridContainer>
    );
  };

  renderResults = () => {
    const { classes, id, content, description } = this.props;
    const { origin, destination, routeNotFound, summary } = this.state;

    if (routeNotFound === 'ZERO_RESULTS') {
      return (
        <GridItem>
          <GridContainer card direction="column" spacing={0}>
            <GridItem>
              <H5 className={classes.noRoute}>
                Unable to find a route with the selected locations
              </H5>
            </GridItem>
            <GridItem>
              <H5>
                Add or select a valid location in a day to create a route or set
                the route with the locations available
              </H5>
            </GridItem>
          </GridContainer>
        </GridItem>
      );
    }

    if (routeNotFound !== 'ZERO_RESULTS' && origin && destination) {
      return (
        <GridItem>
          <Formsy onValidSubmit={this.handleValidSubmit}>
            <GridContainer card direction="column" spacing={0}>
              <GridItem>
                <GridContainer
                  direction="column"
                  key={`${origin}.${destination}`}
                >
                  <GridItem>
                    <ValidationTextField
                      fullWidth
                      name="content"
                      label="Route title"
                      value={content || `via ${summary}`}
                      autoFocus
                      useTypography={false}
                      placeholder="Set route title"
                    />
                  </GridItem>
                  <GridItem>
                    <SimpleRTE
                      id={id}
                      name="description"
                      placeholder="Say something about this route"
                      lines={2}
                      value={description}
                    />
                  </GridItem>
                  <GridItem>{this.renderSaveCancelButton()}</GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </Formsy>
        </GridItem>
      );
    }

    return null;
  };

  render = () => {
    const { classes, id, parentId, ids: allDayIds } = this.props;
    const { routeNotFound, markers, mapsReady } = this.state;

    return (
      <Dialog
        open
        onClose={this.confirmCancel}
        fullWidth
        maxWidth="lg"
        PaperProps={this.PaperProps}
      >
        <UGDialogContent className={classnames(classes.dialogContent)}>
          <GridContainer wrap="nowrap">
            <GridItem className={classes.left}>
              <GridContainer
                direction="column"
                className={classes.maxHeight}
                wrap="nowrap"
              >
                {mapsReady && (
                  <GridItem>
                    <SelectRoute
                      id={id}
                      parentId={parentId}
                      ids={allDayIds}
                      onChange={this.handleChangeRoute}
                      onError={this.handleRouteNotFound}
                      {...this.changeRouteData()}
                    />
                  </GridItem>
                )}
                {this.renderResults()}
                {routeNotFound && this.renderRouteNotFound()}
              </GridContainer>
            </GridItem>
          </GridContainer>
        </UGDialogContent>

        <GoogleMap className={classes.card} onGoogleApiLoaded={this.handleRef}>
          {markers.map(this.renderMarker)}
        </GoogleMap>

        <div className={classes.closeDialog}>
          <Button
            size="xs"
            color="gray"
            onClick={this.confirmCancel}
            className={classes.closeDialogButton}
          >
            <Icon icon="lnr-cross2" size="normal" />
          </Button>
        </div>
      </Dialog>
    );
  };
}

AddRoute.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number, // route id
  templateId: PropTypes.number, // template id
  parentId: PropTypes.number, // tab id

  // resaga props
  ids: PropTypes.array,
  origin: PropTypes.number,
  destination: PropTypes.number,
  content: PropTypes.string,
  description: PropTypes.string,

  // customisable props
};

AddRoute.defaultProps = {
  ids: [],
  content: '',
  description: '',
};

export default compose(
  withStyles(styles, { name: 'AddRoute' }),
  resaga(DAY_IDS_CONFIG),
  resaga(CONFIG),
)(AddRoute);
