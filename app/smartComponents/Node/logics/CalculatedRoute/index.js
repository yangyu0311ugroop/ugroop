import { NOT_FOUND, WAYPOINTS_LIMIT, ZERO_RESULTS } from 'appConstants';
import { isEqual } from 'lodash';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import withDirection from 'smartComponents/Google/hoc/withDirection';
import { ROUTE_CACHE } from 'smartComponents/Node/logics/CalculatedRoute/helpers';
import { ROUTE_HELPERS } from 'smartComponents/Node/types/Route/helpers';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG, PLACE_IDS_CONFIG } from './config';

export class CalculatedRoute extends PureComponent {
  state = {};

  componentDidMount = () => {
    this.updateCalculatedRoute(this.props);
  };

  componentWillReceiveProps = nextProps => {
    const { placeIds, reload } = this.props;

    if (!isEqual(placeIds, nextProps.placeIds)) {
      this.updateCalculatedRoute(nextProps);
    }
    if (nextProps.reload && nextProps.reload !== reload) {
      ROUTE_CACHE.delete(nextProps.id);
      this.updateCalculatedRoute(nextProps);
    }
  };

  updateCalculatedRoute = props => {
    const { onSuccess } = this.props;
    const {
      id,
      routeError,
      placeIds,
      routeIds,
      origin,
      destination,
      currentPlaceIds,
      trimmedIds,
    } = props;

    if (!placeIds.length) return null;

    if (!isEqual(placeIds, currentPlaceIds)) {
      // console.log('### 1. placeIds changed');
      return this.findRoute(props);
    }

    const currentRoutes = ROUTE_CACHE.get(id);

    if (!currentRoutes && !routeError) {
      // console.log('### 2. placeIds NOT changed but currentRoutes NOT exist');
      return this.findRoute(props);
    }

    if (currentRoutes && !ROUTE_CACHE.isValid(currentRoutes.raw)) {
      // console.log('### ERR: invalid currentRoutes, refetch', fetchedRoutes);
      ROUTE_CACHE.set(id, undefined);
      return this.findRoute(props);
    }

    // console.log('### 3. nothing changed, use cache result');
    return LOGIC_HELPERS.ifFunction(onSuccess, [
      {
        ...currentRoutes,
        routeIds,
        placeIds,
        trimmedIds,
        origin,
        destination,
      },
    ]);
  };

  findRoute = props => {
    const {
      placeIds,
      routeIds,
      trimmedIds,
      id,
      findRoute,
      origin,
      destination,
    } = props;

    ROUTE_CACHE.set(id, {
      raw: [],
      brokenIds: [],
      routeIds,
      placeIds,
      trimmedIds,
      origin,
      destination,
    });
    // console.log('1. findRoute init value', id, fetchedRoutes);

    this.count = 0;
    this.setState({ error: false });

    this.total = ROUTE_HELPERS.findRoutes(findRoute, {
      payload: {
        id,
        placeIds,
        routeIds,
      },
      onSuccess: this.findRouteSuccess,
      onError: this.findRouteError,
    });
  };

  findRouteSuccess = (index, direction, request = {}) => {
    const { onSuccess, onError } = this.props;
    const { error } = this.state;
    const { id, placeIds } = request;

    const raw = ROUTE_CACHE.get(`${id}.raw`);

    if (!ROUTE_CACHE.isValid(raw)) {
      // console.log('2. findRouteSuccess reset raw', id, fetchedRoutes);
      ROUTE_CACHE.set(`${id}.raw`, []);
    }
    ROUTE_CACHE.set(`${id}.raw.${index}`, direction);
    // console.log('3. findRouteSuccess set raw index', id, fetchedRoutes);

    this.count += 1;
    // console.log('OK this.count', this.count, '/', this.total);
    if (this.count === this.total) {
      this.props.resaga.setValue({ placeIds });

      if (!error) {
        LOGIC_HELPERS.ifFunction(onSuccess, [ROUTE_CACHE.get(id)]);
      } else {
        LOGIC_HELPERS.ifFunction(onError, [ROUTE_CACHE.get(id)]);
      }
    }
  };

  findRouteError = (status, request, result) => {
    const { onError } = this.props;
    const { id, index, routeIds } = request;

    this.setState({ error: true });

    this.count += 1;
    // console.log('ERR this.count', this.count, '/', this.total);

    if (status === NOT_FOUND) {
      const { geocoded_waypoints: waypoints } = result;

      const ids = waypoints.reduce((accu, { geocoder_status: s }, idx) => {
        if (s === ZERO_RESULTS) {
          const brokenIndex = index * WAYPOINTS_LIMIT + idx;
          const brokenId = routeIds[brokenIndex];

          if (accu.indexOf(brokenId) !== -1) {
            return accu;
          }

          return accu.concat(routeIds[brokenIndex]);
        }

        return accu;
      }, []);

      ROUTE_CACHE.merge(`${id}.brokenIds`, ids);
    }

    if (this.count === this.total) {
      LOGIC_HELPERS.ifFunction(onError, [ROUTE_CACHE.get(id), status]);
    }
  };

  render = () => null;
}

CalculatedRoute.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  // findRoute: PropTypes.func.isRequired,

  // parent props
  id: PropTypes.any,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  reload: PropTypes.number,

  // resaga props
  placeIds: PropTypes.array,
};

CalculatedRoute.defaultProps = {
  placeIds: [],
};

export default compose(
  withDirection,
  resaga(CONFIG),
  resaga(PLACE_IDS_CONFIG),
)(CalculatedRoute);
